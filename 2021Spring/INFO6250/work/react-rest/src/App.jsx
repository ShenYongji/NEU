import {useState} from 'react'
import {FactsList} from "./FactsList";
import {FactCount} from "./FactCount";
import { Dropdown} from "./Dropdown";
import './App.css'


function App() {

  const [showFacts, setShowFacts] = useState(false)
  const [Size, setSize] = useState("5")
  const [countFacts,setcountFacts] = useState(0)

  return (
    <div className="App">
      <FactCount count = {countFacts}/>
      <Dropdown setListSize={setSize}/>
      <hr />
      {showFacts? 
        <div>
          <FactsList setcountFacts = {setcountFacts} maxLength = {parseInt(Size)}/>
          {/* <button onClick = {()=>{setFacts([]);setShowFacts(false)}}>Reset</button> */}
        </div>
        : 
        <div>
          <button onClick={()=>setShowFacts(true)}>Load Facts</button>
        </div>
      }
    </div>
  );
}

export default App;
