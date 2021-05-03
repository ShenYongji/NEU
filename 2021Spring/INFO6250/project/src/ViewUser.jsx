import { useState } from "react";
import { sessionlogout,getHistory,getLike} from "./servers";
import { ViewHistory} from "./ViewHistory";
import neulogo from "./svg/neulogo.svg";
import { ViewLike } from "./ViewLike";
export const ViewUser = function({Username,setUsername,setUserError}){
    
    const [DisplayHistory,setDisplayHistory] = useState(false)
    const [DisplayLike,setDisplayLike] = useState(false)

    const [History, setHistory] = useState({})
    const [Like, setLike] = useState({})

    function readytoLogout(){
        sessionlogout()
        .then(()=>{
            setUsername('')
            setHistory({})
            setLike({})
            setUserError('')
        })
        .catch((err)=>{
            setUserError(err.error)
        })
    }
    
    function viewHistory(){
        if(!DisplayHistory){
            getHistory()
            .then(({history})=>{
                setHistory(history)
                setDisplayHistory(!DisplayHistory)
                setUserError('')
            })
            .catch((err)=>{
                setUserError(err.error)
            })
        }
        else{
            setDisplayHistory(!DisplayHistory)
            setHistory({})
            setUserError('')
        }
    }

    function viewLike(){
        if(!DisplayLike){
            getLike()
            .then(({like})=>{
                setLike(like)
                setDisplayLike(!DisplayLike)
                setUserError('')
            })
            .catch((err)=>{
                setUserError(err.error)
            })
        }
        else{
            setLike({})
            setDisplayLike(!DisplayLike)
            setUserError('')
        }
    }
    
    return (
        <div className='known'>
            <div className='user-info'>
                <img src={neulogo}  alt='neulogo'/>
                <br />
                <p>Hello, {Username}</p>
            </div>
            <hr />
            <div className='view'>
                <button className='link-button list-item' onClick={()=>{viewHistory()}}>
                    <span>My Post History</span>
                </button>
                <div className={`display${DisplayHistory}`}>
                    <hr />
                    <div className="history">
                        <ViewHistory type={{type:"History"}}  History={History}/>
                    </div>
                    <hr />
                </div>
                <button className='link-button list-item' onClick={()=>{viewLike()}}>
                    <span>My Likes</span>
                </button>
                <div className={`display${DisplayLike}`}>
                    <hr />
                    <div className='like'>
                        <ViewLike Like={Like} setLike={setLike} setUserError={setUserError}/>
                    </div>
                    <hr/>
                </div>
            </div>
            <div className = 'logout' onClick = {()=>{readytoLogout()}}>
                <button className='link-button list-item'>Logout</button>
            </div>
        </div>
    )
}