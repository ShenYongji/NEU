import unknown from "./svg/unknown.svg";
import { sessionlogin } from "./servers";
import { useState } from "react";
export const Login = function({setUsername,setUserError}){
    const [Loading, setLoading] = useState(false)
    const [Usernameinput, setUsernameinput] = useState("")

    const getUserName = function (e){
        setUsernameinput(e.target.value.trim())
    }

    const readytoLogin = function(username){
        setLoading(true)
        sessionlogin({username})
        .then(({username})=>{
            setLoading(false)
            setUsername(username)
            setUserError('')
        })
        .catch((err)=>{
            setLoading(false)
            setUserError(err.error)
        })
    }

    return(
        <div className='unknown'>
            <img src={unknown} alt='unknown'/>
            <div className='input'>
                <input onChange={(e)=>getUserName(e)} disabled={Loading}/>
                <br/>
                <button className = 'link-button' onClick={()=>readytoLogin(Usernameinput.trim())} disabled={Loading||!Usernameinput.trim()}>{Loading?'Loading':'Log in'}</button>
            </div>
        </div>
    )
}