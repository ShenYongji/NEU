const express = require('express');
const CookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const users_data = require("./users")
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(CookieParser());


function CheckUsername(username){
    const data = users_data.getcurrusers()[username]
    return data
}


const sessions = {}

app.get('/user', (req, res) => {
    //console.log("reloading")
    //const username = req.cookies.username
    const sid = req.cookies.sid
    if (!sid){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    const username = sessions[sid]
    //console.log("logged")
    //console.log(users_data.getcurrusers()[username])
    res.status(200).json(users_data.getcurrusers()[username]);
});

app.get('/auto-update',  (req, res) => {
    const sid = req.cookies.sid
    if (!sid){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    const username = sessions[sid]
    if (!username){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return
    }
    // if(!users_data.getcurrusers()[username]){
    //     console.log("NULL")
    // }
    res.json(users_data.getcurrusers()[username])
  });



app.post('/user',express.json(),(req,res)=>{
    //const username = req.cookies.username
    const sid = req.cookies.sid

    const {item} = req.body
    if (!sid){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    const username = sessions[sid]

    if(!item){
        res.status(403).json({ error: 'item name is empty'});
        return;
    }
    if(!item.trim()){
        res.status(403).json({ error: 'item name is empty'});
        return;
    }

    const clean = item.replace(/[^A-Za-z]+/g, '');
    if (clean !== item){
        res.status(403).json({error:'English letter only'})
        return
    }

    let curr = users_data.getcurrusers()
 
    let curr_count = users_data.getcurrindex(curr[username])

    curr[username].items.push({itemId:curr_count,name:item,rate: 0})

    users_data.updatecurrindex(curr[username],curr_count+1)

    //console.log(users_data.getcurrindex(curr[username]))
    users_data.updateusers(curr)
    //users_data.updatecurrindex(curr[username],curr_count+1)

    res.status(200).json({itemId:curr_count,name:item,rate: 0});
})


app.patch('/user',express.json(),(req,res)=>{
    //const username = req.cookies.username
    const sid = req.cookies.sid

    if (!sid){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    const username = sessions[sid]
    const {method,itemId} = req.body
    // const method = itemId.slice(0,1)
    // const id = itemId.slice(1)

    let curr = users_data.getcurrusers()

    //console.log(id)

    let curr_index = -1

    for (let i in curr[username].items){
        if(itemId == curr[username].items[i].itemId){
            // console.log(id)
            // console.log(curr[username].items[i])
            curr_index = i
            break
        }
    }
    // console.log("_________")
    if(curr_index == -1){
        res.status(400).json({ error: 'missing-value' });
        return;
    }

    const rate = curr[username].items[curr_index].rate
    if (method === "+"){
        curr[username].items[curr_index].rate++
    }
    if(method === "-"){
        if (rate >0){
            curr[username].items[curr_index].rate--
        }
        //no quantity less than 0
        else{
            curr[username].items[curr_index].rate = 0
        }
    }
    users_data.updateusers(curr)
    curr = users_data.getcurrusers()
    //console.log( {position, item: curr[username].items[position]})
    res.status(200).json({itemId , item: curr[username].items[curr_index]})
    //res.status(200).json(users_data.getcurrusers()[username]);
})

app.delete('/user',express.json(),(req,res)=>{
    //const username = req.cookies.username
    const sid = req.cookies.sid

    if (!sid){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }

    const username = sessions[sid]
    const {itemId} = req.body

    // console.log("itemId: ")
    // console.log(itemId)

    let curr = users_data.getcurrusers()
    // console.log("Old: ")
    // console.log(curr[username].items)

    let curr_index
    for (let i in curr[username].items){
        if(itemId == curr[username].items[i].itemId){
            curr_index = i
            break
        }
    }

    // console.log(curr_index)

    if(!curr[username].items[curr_index]){
        res.status(400).json({ error: 'missing-value' });
        return;
    }
    curr[username].items.splice(curr_index,1)
    //update backend
    users_data.updateusers(curr)
    // console.log("New: ")
    // console.log(console.log(curr[username].items))
    // console.log("___________________________")
    res.status(200).json({itemId})

})

app.post('/login',express.json(),(req,res)=>{
    console.log("login")
    const {username} = req.body

    if (username.toUpperCase() === 'DOG'){
        res.status(403).json({ error: 'username-invalid'});
        return
    }    
    if (!username.trim()){
        res.status(403).json({error:"empty-name"})
        return
    }
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
    if (clean !== username){
        res.status(403).json({error:'username-invalid'})
        return
    }
    const sid = uuid()
    sessions[sid] = username

    let curr = users_data.getcurrusers()
    if(!curr[username]){
        curr[username] = {
            username,
            curr_count: 0,
            items:[]
          };
        users_data.updateusers(curr)
    }
    res.cookie('sid', sid);
    //console.log(users_data.getcurrusers()[username])

    res.status(200).json(users_data.getcurrusers()[username]);
})

app.post('/logout',(req,res)=>{
    console.log("logout")
    //const username = req.cookies.username
    const sid = req.cookies.sid
    if (!sid){
        console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    const username = sessions[sid]
    //console.log(username)
    res.clearCookie('sid');
    res.json('')
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

