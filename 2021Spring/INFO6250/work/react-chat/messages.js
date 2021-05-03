const message = [
]

const currMsg = function(){
    return message
}

const updateMsg = function ({sender,content}){
    message.push({sender,content})
    return message
}


module.exports = {
    currMsg,
    updateMsg
}