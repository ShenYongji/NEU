const uuid = require('uuid').v4
const users = require('./users');
const session = {}


const isValid = (sid) => {
    return !!session[sid]
}

const getSession = function (sid){
    const username = session[sid].username
    session[sid].info = users.getUser(username)

    return session[sid]
}


const createSession = function (username){
    const sid = uuid()
    const userlist = users.getUsers()

    if(!userlist[username]){
        users.createUser(username)
    }

    session[sid] ={
        sid,
        username,
        info: userlist[username]
    }

    return sid
}

const removeSession = function(sid){
    delete session[sid]
}

module.exports = {
    isValid,
    createSession,
    removeSession,
    getSession
}