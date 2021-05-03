import {useState} from 'react'
import './App.css';
import UserInput from './UserInput'
import MessageBox from './MessageBox'
import rendermessage from './message'

function App() {
  const [guess,setGuess] = useState('')
  const {type,message} = rendermessage(guess)

  return (
    <div className="App">
        <UserInput onSubmit= {(word)=>setGuess(word)}/>
        <MessageBox type = {type} message = {message}/>
    </div>
  );
}

export default App;
