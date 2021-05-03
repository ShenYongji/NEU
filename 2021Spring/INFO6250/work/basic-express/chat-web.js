const e = require("express");
const { messages } = require("./chat");

const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link href="chat.css" rel="stylesheet" />
          <script src="autoscrolldown.js"></script>
        </head>
        <body onload = "updateScroll()">
          <div id="chat-app">
            <div class="display-panel">
              <div class="user-panel">
                ${chatWeb.getUserList(chat)}
              </div>
              <div class="message-panel">
                ${chatWeb.getMessageList(chat)}
                ${chatWeb.getOutgoing(chat)}
              </div>
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages" >` +
      // Fill in!
      Object.values(chat.messages).map( element => `
      <li>
        <div class="message">
          <span class="sender">${element.sender}: </span>
          <span class="text">${element.text}</span>
        </div>
      </li>
    `).join('') +
    `</ol>`;
  },


  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in!
    return `<form action="/chat" method="POST">
              <input type="text" name="sender" value ="Amit" hidden >
              <label>Message: </label>
              <textarea name="text" placeholder ="Write your message here"></textarea>
              <br>
              <input type="submit" value="Send">
            </form>`
  }
};
module.exports = chatWeb;
