const users={}


function getUsers(){
    return users
}

function getUser(username){
    return users[username]
}
function createUser(username){
    users[username] = {
        username,
        mypost:{},
        mylike:{}
    }
}

function updateUserHistory({post_index,author,Title,Label,Phone,Email,Description}){
    const username = author
    if(!users[username]){
        createUser(username)
    }
    users[username].mypost[post_index] = {author,Title,Label,Phone,Email,Description}
}

function updateUserLike({post_index,username,author,Title,Label,Phone,Email,Description}){
    if(!users[username]){
        createUser(username)
    }
    users[username].mylike[post_index] = {author,Title,Label,Phone,Email,Description}
}

function removeUserLike({post_index,username}){
    if(!users[username]){
        createUser(username)
    }
    delete users[username].mylike[post_index]
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUserHistory,
    updateUserLike,
    removeUserLike
}