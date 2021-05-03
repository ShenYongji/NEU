import { Login } from "./Login"
import { ViewUser } from "./ViewUser"
import { useEffect, useState } from "react"
import { checkSession } from "./servers";
import {Error} from "./Error";

export const User = function(){
    const [Username, setUsername] = useState('')
    const [UserError, setUserError] = useState('')

    useEffect(()=>{
        checkSession()
        .then(({username})=>{
            if(username){
                setUsername(username)
                setUserError('')
            }
        })
        .catch((err)=>{
            setUserError(err.error)
        })
      },[])
    
    let content
    if(!Username){
        content = <Login setUsername={setUsername} setUserError={setUserError}/>
    }
    else{
        content = <ViewUser Username= {Username} setUsername={setUsername} setUserError={setUserError}/>
    }

    return(
        <div className ='main_user'>
            <div className='user-title'>
                <div>My Profit</div>
            </div>
            <Error ErrorMessage={UserError}/>
            <hr/>
            <div className='user-content'>
                {content}
            </div>
        </div>
    )
}