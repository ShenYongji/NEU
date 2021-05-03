import { useRef,useEffect } from "react";
import { AlwaysScrollToBottom } from "./AlwaysScrollToBottom";
import icon from './icon.png'; 

export const MsgWindows = function ({messages}){


    const messageList = messages.map((message)=>(
        <li key={messages.indexOf(message)}> 
            <div className='message'>
                <div>
                    <img src = {icon}  alt='icon'/>
                </div>
                <div>
                    <span className = "sender">{message.sender}</span>
                    <br />
                    {message.content}
                </div>
            </div>
            <hr/>
        </li>
    ))
    
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    return (
        <div className='msg_windows'>
            <div className='msg_title'>Message Window</div>
            {messages.length?
            <div className="message_list" ref={messagesEndRef}>
                <ul>
                    {messageList}
                </ul> 
                <AlwaysScrollToBottom />
            </div>
            :"Be the First sender in Chatroom"
            }
        </div>
    )
}