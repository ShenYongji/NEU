const uuid = require('uuid').v4
const session = {}
const user = {}


const isValid = (sid) => {
    return !!session[sid]
}

const userInfo = function(sid){
    return session[sid]
}

const updateLoginStatus = function (username){
    user[username].onlineStatus = !(user[username].onlineStatus)
}

const getSession = function (){
    return session
}

const getUser = function (username) {
    return user[username]
}

const createSession = function (username){
    const sid = uuid()
    if(!user[username]){
        user[username] = {
            username,
            createTime: Date.now(),
            onlineStatus: false
        }
    }

    session[sid] = user[username]

    return sid
}

const removeSession = function(sid){
    delete session[sid]
}



module.exports = {
    isValid,
    userInfo,
    createSession,
    removeSession,
    getSession,
    getUser,
    updateLoginStatus
}