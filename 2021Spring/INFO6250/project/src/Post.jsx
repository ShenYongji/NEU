import { useState } from "react"
import { postSubmit } from "./servers";

export const Post = function ({setCurrentPage,setAddError}){

    const [Title, setTitle] = useState('')
    const [Label, setLabel] = useState('buying')
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const [Description, setDescription] = useState('')

    const update = (e,type)=>{
        switch (type) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'label':
                setLabel(e.target.value)
                break;
            case 'phone':
                setPhone(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
            default:
                break;
        }
    }

    const [Loading, isLoading] = useState(false)
    function readytoSubmit ({Title,Label,Phone,Email,Description}){
        isLoading(true)
        postSubmit({Title,Label,Phone,Email,Description})
        .then(({success})=>{
            isLoading(false)
            if(success){
                setTitle('')
                setLabel('buying')
                setPhone('')
                setEmail('')
                setDescription('')
                setCurrentPage('home')
                setAddError('')
            }
        })
        .catch((err)=>{
            isLoading(false)
            setAddError(err.error)
        })
    }

    return(
        <div className="post">
            <div className='title'>
                <label>Title: </label>
                <input value = {Title} onChange={(e)=>update(e,'title')}></input>
            </div>
            <div className='label'>
                <label>Buying or Selling: </label>
                <select name="buyingchoose" onChange={(e)=>update(e,'label')} value ={Label}>
                    <option value="buying">Buying</option>
                    <option value="selling">Selling</option>
                </select>
            </div>
            <div className='connect'>
                <div>
                    <label> Phone Number: </label>
                    <br />
                    <input value = {Phone} onChange={(e)=>update(e,'phone')}></input>
                </div>
                <div>                
                    <label> Email Address: </label>
                    <br />
                    <input value = {Email} onChange={(e)=>update(e,'email')}></input>
                </div>
            </div>
            <div className='description'>
                <label>Description: </label>
                <br />
                <textarea value = {Description} onChange={(e)=>update(e,'description')}></textarea>
            </div>

            <button disabled = {(Loading)||(!Title.trim())||(!Label.trim())||(!Phone.trim())||(!Email.trim())||(!Description.trim())} onClick={()=>{readytoSubmit({Title,Label,Phone,Email,Description})}}>{Loading? 'Submitting':'Submit My Post'}</button>
        </div>
    )
}