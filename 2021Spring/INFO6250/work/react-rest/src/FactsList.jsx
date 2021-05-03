import { useState,useEffect } from "react";
import {Fetchcatlist} from "./servers";
import { DisplayList } from "./DisplayList";
import { DisplayButton } from "./DisplayButton";
import logo from './spinner.gif'

export const FactsList = ({setcountFacts,maxLength}) =>{

    const [locFacts,setlocFacts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [startPage, setstartPage] = useState(0)
    const [errorMessage,seterrorMessage] = useState('')

    useEffect( () =>{
        setLoading(true)
        Fetchcatlist()
        .then((facts)=>{
          setLoading(false)
          setlocFacts(facts)
          setcountFacts(facts.length)
        })
        .catch((err)=>{
          setLoading(false)
          seterrorMessage(err.error)
        })
      },[setcountFacts]);

      // const pageCount = parseInt(locFacts.length/maxLength) + (locFacts.length%maxLength?1:0)
      return (
          <div>
            {isLoading ? 
              <div className="loading">
                <div>Loading data...</div>
                <div><img src={logo} alt="loading..." /></div>
              </div>
              : 
              <div>
                <DisplayList size={maxLength} facts = {locFacts} start = {startPage <0? 0:startPage} length = {locFacts.length} error={errorMessage}/>
                <DisplayButton startPage = {startPage <0? 0:startPage} maxLength={maxLength} setstartPage={setstartPage} facts = {locFacts} length = {locFacts.length}/>
              </div>
            }
          </div>
      )

}