import { useState ,useEffect} from 'react';
import { checkSession ,getActiveUsers,getMessage} from "./servers";
import {  Chatroom} from "./Chatroom";
import { Login } from "./Login";
import { errMsgs } from "./Errormsgs";
import './App.css';
import { InfoAfterLogin } from './InfoAfterLogin';

function App() {

  const [userState, setuserState] = useState({isLogged:false, userinfo: {}})
  const [activedUsersList, setactiveUsersList] = useState([])
  const [messages, setmessages] = useState([])
  const [warming, setwarming] = useState('')
  const [Pollingfunction, setPollingfunction] = useState(()=>{})

  useEffect(()=>{
    checkSession()
    .then(({userinfo})=>{
      setuserState({
        isLogged:true,
        user:userinfo,
      })
      setwarming('')
      InfoAfterLogin({getActiveUsers,setactiveUsersList,setwarming,getMessage,setmessages,setPollingfunction})
    })
    .catch((err)=>{
      setwarming(err.error)
      setuserState({
        isLogged:false,
        username:{},
      })
    })

  },[])

  let content;
  if(userState.isLogged) {
    content = <Chatroom username = {userState.user.username} toLog = {setuserState} activedUsersList = {activedUsersList} messages = {messages} setmessages={setmessages} setwarming={setwarming} setPollingfunction={setPollingfunction} Pollingfunction={Pollingfunction}/>;
  } else {
    content = <Login toLog = {setuserState} setactiveUsersList = {setactiveUsersList} getActiveUsers={getActiveUsers} getMessage={getMessage} setmessages={setmessages} setwarming={setwarming} setPollingfunction={setPollingfunction}/>;
  }

  return (
    <div className="App">
      {content}
      {warming && <div className='error'>{errMsgs[warming]}</div>}
    </div>
  );
}

export default App;
