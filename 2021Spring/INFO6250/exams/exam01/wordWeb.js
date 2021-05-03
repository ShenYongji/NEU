const e = require("express");
const { word_list } = require("./words");

const wordWeb = {

    wordPage: function(username,validguesscount,guesslist) {
        return `
        <!doctype html>
        <html lang="en">
          <head>
            <title>Guess A Word</title>
            <link href="main.css" rel="stylesheet" />
          </head>
          <body>
            <div id="word-app">
                <div class="user-panel">
                    <span>Hello, ${username}</span>
                    <form action = '/logout' method = 'POST'>
                        <button type="submit">Logout</button>
                    </form>
                </div>
                <hr>
                <div class = "target-list">
                    <span>Please guess a word from the following list</span>
                    <div class="retry-panel">
                        ${wordWeb.retryWord()}
                    </div>
                    ${wordWeb.displaylist(word_list)}
                </div>
                <div class = "gaming-pane">
                    <div class="submit-panel">
                        ${wordWeb.sendGuessWord(validguesscount,guesslist)}
                    </div>
                    <div class="result-panel">
                        ${wordWeb.displayResult(guesslist)}
                    </div>
                </div>
            </div>
          </body>
        </html>
    `;
    },

    displayResult:function(list){
        //display result by different types
        // normal information
        // warming
        // success
        let result = ''
        for (let element of list){
            if (!element.isValid){
                result +=`
                <div class = "warning">
                ${element.guess} is an invalid word
                </div>
                `
            }
            else{
                if(element.isDuplicated){
                    result +=`
                    <div class = "warning">
                        ${element.guess} is a repeated guess
                    </div>
                     `
                }
                else{ 
                    if (!element.correct){
                        result += `
                            <div class = "info">
                                <span>Guess Time(s): ${element.index}; </span>
                                <span>Guess Word: ${element.guess.toUpperCase()}; </span>
                                <span>Matched Letter(s): ${element.samelettercount}</span>
                            </div>
                        `
                    }
                    else{
                        result +=`
                        <div class = "success">
                        <span>Guess Time(s): ${element.index}</span><br>
                        <span>Congratulations!!! Find current word - ${element.guess.toUpperCase()}</span>
                        <form action = '/retry' method = 'POST'>
                            <span> Wanna play again? <input type="submit" value="Play Again"></span>
                        </form>
                        </div>
                        `
                    }
                }
            }
        }

        return `<output>` +result +`</output>`;
    },


    sendGuessWord: function(validguesscount,list){
        
        //Send the guess from user
        //stop while user found the right word
        const validcount = validguesscount;
        const listlength = list.length
        let input = 
        `
        <p> Currently Guessing Time: ${validcount+1}</p>
        <form action = '/guess' method = 'POST'>
            <label>Enter your guessing here: </label>
            <input type = 'text' name='guess' required>
            <input type="submit" value="Send">
        </form>
        `
        if(validcount >0 && list[listlength-1].correct){
            input = `
            <p> Congratulations!!!</p>
            <form action = '/guess' method = 'POST'>
                <label>Enter your guessing here: </label>
                <input type = 'text' name='guess' disabled>
                <input type="submit" value="Send" disabled>
            </form>
            `
        }
        
        return input
    },

    retryWord: function(){
        //retry a game
        return `
        <form action = '/retry' method = 'POST'>
            <span> Wanna retry? <input type="submit" value="Retry"></span>
        </form> `
    },

    displaylist: function(word_list){
        //display the target list
        let list = ''
        for (let word of word_list){
            list += `<li>
            <div class="word">
            <span>${word}</span>
            </div>
            </li>`
        }
        return `<ol class="word_list" >` + list +`</ol>`;
    }
};



module.exports = wordWeb;