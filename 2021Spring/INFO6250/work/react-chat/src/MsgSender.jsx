import { useState } from "react"
import { sendMessages } from "./servers";

export const MsgSender = function({waitLogout,username,setmessages,setwarming}){

    const [message, setmessage] = useState('')

    function sendMessage(){
        sendMessages({message})
        .then(({messages})=>{
            setmessages(messages)
            setwarming('')
        })
        .catch((err)=>{
            setwarming(err.error)
        })
        setmessage('')
    }
    

    return (
        <div className = 'msg_sender'>
            <textarea value = {message} onChange={(e)=>setmessage(e.target.value)} disabled={waitLogout} placeholder='Enter your sentence, press send button to send'/>
            <button disabled={waitLogout || !(!!message)} onClick={sendMessage}> Send</button>
        </div>
    )
}