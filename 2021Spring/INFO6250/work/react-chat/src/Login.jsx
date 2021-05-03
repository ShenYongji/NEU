import { useState } from 'react';
import { login } from './servers';
import { InfoAfterLogin } from "./InfoAfterLogin";
export const Login = ({toLog,setactiveUsersList,getActiveUsers,getMessage,setmessages,setwarming,setPollingfunction})=>{


    const [username,setUsername] = useState('')
    const [waitingLogin, setwaitLogin] = useState(false)


    const updatetext = (e) => {
        setUsername(e.target.value);
    }

    const goLogin = ()=>{
        setwaitLogin(true)
        login({username})
        .then(({userinfo})=>{
            setwaitLogin(false)
            toLog({
                isLogged:true,
                user:userinfo,
            })
            setwarming('')
            InfoAfterLogin({getActiveUsers,setactiveUsersList,setwarming,getMessage,setmessages,setPollingfunction})
        })
        .catch((err)=>{
            setwarming(err.error)
            setwaitLogin(false)
            toLog({
                isLogged:false,
                username:{},
            })
        })
    }



    return(
        <div className = 'login'>
            <div>Please Login to join the chat room</div>
            <label>Username:</label>
            <input onChange={updatetext} value = {username}  disabled={waitingLogin}></input>
            <button onClick={goLogin} disabled={waitingLogin || !(!!username)}>{waitingLogin? 'Trying to login...':'Login'}</button>
        </div>
    )
}