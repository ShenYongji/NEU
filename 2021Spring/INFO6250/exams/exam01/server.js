const express = require('express');
const CookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const app = express();
const PORT = 3000;

const wordWeb = require('./wordWeb');
const word = require('./words');
const { word_list } = require('./words');

app.use(CookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));


const session = {};


app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    //check if user is online or not
    if(!sid||!session[sid]){
        console.log("You are not logged in");
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Word App - Login</title>
                <link href="login.css" rel="stylesheet" />
            </head>
            <body>
                <div class="login">
                Please log in <br> <a href="login.html">Login Now</a>
                </div>
            </body>
            </html>`
        );
        return;
    }
    console.log(sid,session[sid].username,session[sid].game_info);
    //sending the user information 
    //session[sid].username),session[sid].validguesscount,session[sid].guesslist
    res.send(wordWeb.wordPage(session[sid].username,session[sid].validguesscount,session[sid].guesslist));
});

app.post('/guess',(req,res)=>{
    //determine the guess from user
    const sid = req.cookies.sid;
    const {guess} = req.body;
    const sercet = session[sid].game_info.sercet

    //check if guess in the target list
    const word_list_copy = word_list.slice(0)

    for (let i in word_list_copy){
        word_list_copy[i] = word_list_copy[i].toLowerCase()
    }
    //True if guess in the list, False if it is not
    const isValid = word_list_copy.includes(guess.toLowerCase());

    //check if guess in the previous guess list
    const guesschecklist = new Array();
    for (let i in session[sid].guesslist){
        guesschecklist.push(session[sid].guesslist[i].guess.toLowerCase())
    }
    //True if guess in the list, False if it is not
    const isDuplicated = guesschecklist.includes(guess.toLowerCase());

    //increment the valid guess count when guess is valid and not duplicated
    if(isValid&&!isDuplicated){
        session[sid].validguesscount++;
    }

    const matches = compare(sercet,guess)
    const index = session[sid].validguesscount;

    session[sid].guesslist.push({
        index,
        isValid,
        isDuplicated,
        guess,
        correct:matches[0],
        samelettercount:matches[1]
    })

    res.redirect('/');
});

app.post('/login',(req,res)=>{
    //user to loging
    const username = req.body.username.trim();
    const sid = uuidv4();
    res.cookie('sid',sid);
    const guesslist = new Array();
    const game_info = defineSercet(word_list);
    //store the sid, name, and information of game in session[sid]
    session[sid] ={
        username,
        game_info,
        validguesscount:0,
        guesslist
    }
    res.redirect('/');
});


app.post('/logout',(req,res)=>{
    //logout delete user information
    const sid = req.cookies.sid;
    //Delete from server
    delete session[sid];
    //Delete from client
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/retry',(req,res)=>{
    //retry function
    const sid = req.cookies.sid;
    //assign a new secret word
    session[sid].game_info = defineSercet(word_list);
    //initization 
    session[sid].guesslist = new Array();
    session[sid].validguesscount = 0;
    res.redirect('/');
});

function defineSercet(word_list){
    //randomly select a word from target list
    const sercet_index = Math.floor(Math.random()*word_list.length);
    const sercet = word_list[sercet_index];
    return {sercet,sercet_index}
}

function compare(word,guess){

    //compare function 
    let matches = [false,0]
    const letterCount ={}

    //check if guess ==== sercet
    if (word.toLowerCase() === guess.toLowerCase()){
        matches[0]=true
    }

    //check matched letters
    for (let letter of word.toLowerCase()){
        letterCount[letter] = letterCount+1||1;
    }
    for (let letter of guess.toLowerCase()){
        if(letterCount[letter]){
            letterCount[letter] -=1;
            matches[1] +=1;
        }
    }

    return matches;
}


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));