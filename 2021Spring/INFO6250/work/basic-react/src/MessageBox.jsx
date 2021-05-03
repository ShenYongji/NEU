const MessageBox = function({type,message}){
    return (
        <div className = {type}>{message}</div>
    )
}

export default MessageBox;