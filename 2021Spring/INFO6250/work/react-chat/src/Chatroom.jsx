import { logout } from "./servers"
import { UsersList } from "./UsersList"
import { MsgWindows } from "./MsgWindows";
import { MsgSender} from "./MsgSender";
import { useState } from "react";

export const Chatroom = function ({username,toLog,activedUsersList,messages,setmessages,setwarming,Pollingfunction}){

    const [waitLogout, setwaitLogout] = useState(false)

    const goLogout = function(){
        setwaitLogout(true)
        logout()
        .then(()=>{
            setwaitLogout(false)
            toLog({
                isLogged:false,
                username:{},
            })
            setwarming('')
            clearTimeout(Pollingfunction);
        })
        .catch((err)=>{
            setwaitLogout(false)
            setwarming(err.error)
        })
    }
    return (
        <div> 
            <div className='hello'>Hi, {username}. Welcome to ChatRoom-INFO6250
            <br/>
            <button onClick={goLogout} disabled={waitLogout}>{waitLogout? 'Trying to logout...':'Logout'}</button>
            </div>
            <hr />
            <div className = "display_panel">
                <UsersList activedUsersList={activedUsersList} setwarming={setwarming}/>
                <div className = "chat_area">
                    <MsgWindows messages={messages} setwarming={setwarming}/>
                    <MsgSender username={username} waitLogout={waitLogout} setmessages={setmessages} setwarming={setwarming}/>
                </div>
            </div>
        </div>
    )
}