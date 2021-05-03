const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./session');
const messages = require('./messages');
const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get("/api/test",(req,res)=>{
    res.send("work")
})

app.get("/session",(req,res)=>{
    const sid = req.cookies.sid

    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return;
    }

    res.json({userinfo:session.userInfo(sid)});
})

app.post("/session",(req,res)=>{

    const username = req.body.username.trim()

    if (!username){
        res.status(401).json({error:'login-invalid'})
        return;
    }
    if(username.toUpperCase().includes('DOG')){
        res.status(401).json({error:'login-invalid-dog'})
        return;
    }

    if (session.getUser(username) && session.getUser(username).onlineStatus){
        res.status(401).json({error:'already-logged'})
        return;
    }

    const sid = session.createSession(username)

    res.cookie("sid",sid)

    //set login status to true
    session.updateLoginStatus(username);

    setTimeout(() => {
        res.json({userinfo: session.userInfo(sid)}); 
    }, 5000);

})

app.delete('/session',(req,res)=>{
    const sid = req.cookies.sid
    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return;
    }

    const username = session.userInfo(sid).username

    // session.updateLoginStatus(username)
    
    // //console.log(session.userInfo(sid))
    // session.removeSession(sid);
    // res.clearCookie('sid',sid);
    session.updateLoginStatus(username)
    //console.log(session.userInfo(sid))
    session.removeSession(sid);
    res.clearCookie('sid',sid);

    res.json({sid})
})


app.get("/message",(req,res)=>{
    const sid = req.cookies.sid

    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return;
    }
    res.json({messages: messages.currMsg()})
})

app.post("/message",(req,res)=>{
    let message = req.body.message.trim()
    const sid = req.cookies.sid

    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return;
    }
    if(!message){
        res.status(401).json({error:'message-empty'});
        return;
    }

    const username = session.userInfo(sid).username

    const updatedMsg = messages.updateMsg({sender:username, content:message})

    res.json({messages:updatedMsg}) 
})

app.get("/users",(req,res)=>{
    const sid = req.cookies.sid

    if(!sid){
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (!session.isValid(sid)){
        res.status(401).json({error:'login-invalid'});
        return;
    }
    const currSession = session.getSession()
    const userList = []
    Object.keys(currSession).forEach(element => {
        userList.push(currSession[element].username)
    });
    res.json({userList});
})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});