const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./session');
const posts = require('./posts');
const users = require('./users');
const app = express();
const PORT = 5000;


app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get('/session',(req,res)=>{
    const sid = req.cookies.sid

    if(!sid){
        res.json({username:null})
        return 
    }
    if(!session.isValid(sid)){
        res.json({username:null})
        return 
    }

    const usersession = session.getSession(sid)
    res.json({username:usersession.username})
})

app.post('/session',(req,res)=>{
    const username = req.body.username.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`)
    

    if (!username){
        res.status(400).json({error:'login-invalid'})
        return;
    }

    if(username.toUpperCase().includes('DOG')){
        res.status(400).json({error:'login-invalid-dog'})
        return;
    }

    const sid = session.createSession(username)
    res.cookie("sid",sid)
    const usersession = session.getSession(sid)
    setTimeout(() => {
        res.json({username:usersession.username}); 
    }, 3000);
})

app.delete('/session',(req,res)=>{
    const sid = req.cookies.sid
    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if(!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return 
    }
    session.removeSession(sid);
    res.clearCookie('sid',sid);
    res.json({sid})
})

app.get('/post',(req,res)=>{

    const sid = req.cookies.sid

    let like = {}
    let like_index = []
    let logged = false

    if(sid && session.isValid(sid)){
        like = session.getSession(sid).info.mylike
        like_index = Object.keys(like)
        logged = true
    }

    const post = posts.getposts()

    const length_post = Object.keys(post).length

    res.json({post,length:length_post,like_index,logged})
})

app.post('/post',(req,res)=>{
    const sid = req.cookies.sid
    let {Title,Label,Phone,Email,Description} = req.body

    if(!sid || !session.isValid(sid)){
        res.status(401).json({ error: 'login-required' });
        return;
    }

    if(!Title.trim() || !Label.trim() ||!Phone.trim() || !Email.trim() || !Description.trim()){
        res.status(406).json({ error: 'white-space' });
        return;
    }

    if(!validateEmail(Email.trim())){
        res.status(406).json({error:'email-invalid'})
        return 
    }

    Phone = formatPhoneNumber(Phone.trim())

    if(!validatePhone(Phone)){
        res.status(406).json({error:'phone-invalid'})
        return
    }

    Title= Title.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`)
    Label= Label.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`).replace(/\n/g,'<br>')
    Description = Description.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`).replace(/\n/g,'<br>')


    const usersession = session.getSession(sid)
    const author = usersession.username

    const post_index = posts.updateposts({author,Title,Label,Phone,Email:Email.trim(),Description})

    users.updateUserHistory({post_index,author,Title,Label,Phone,Email:Email.trim(),Description})

    setTimeout(() => {
        res.json({success:true})
    }, 3000);
})


app.get("/history",(req,res)=>{
    const sid = req.cookies.sid

    if(!sid || !session.isValid(sid)){
        res.status(401).json({ error: 'login-required' });
        return;
    }

    const usersession = session.getSession(sid)

    const history = usersession.info.mypost
    res.json({history})
})


app.get("/like",(req,res)=>{
    const sid = req.cookies.sid

    if(!sid || !session.isValid(sid)){
        res.status(401).json({ error: 'login-required' });
        return;
    }

    const usersession = session.getSession(sid)

    const like = usersession.info.mylike

    res.json({like})
})


app.post("/like",(req,res)=>{
    const sid = req.cookies.sid
    const post_index = req.body.index

    if(!sid || !session.isValid(sid)){
        res.status(401).json({ error: 'login-required' });
        return;
    }

    const usersession = session.getSession(sid)
    const username = usersession.username

    const {author,Title,Label,Phone,Email,Description}= posts.getposts()[post_index]

    users.updateUserLike({post_index,username,author,Title,Label,Phone,Email,Description})
    const like = usersession.info.mylike
    res.json({like,success:true})
})

app.delete('/like',(req,res)=>{
    const sid = req.cookies.sid
    post_index = req.body.index
    if(!sid || !session.isValid(sid)){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    const usersession = session.getSession(sid)
    const username = usersession.username
    users.removeUserLike({username,post_index})
    const like = usersession.info.mylike
    res.json({like,success:true})

})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phone){
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    return re.test(phone)
}

function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});