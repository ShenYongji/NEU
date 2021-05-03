import {useState} from 'react'

const UserInput = function ({onSubmit}){

    const [tmpGuess, settmpGuess] = useState('')
    const updateText = (e) => {settmpGuess(e.target.value)};

    function onceSubmit(){
        onSubmit(tmpGuess)
        settmpGuess('')
    }
    return (
        <div className = 'input-panel'>
            <input onChange = {updateText} value = {tmpGuess}/>
            <button onClick={()=>onceSubmit()}>Submit
            </button>
        </div>
    )

}

export default UserInput