import { Error } from "./Error";


export const DisplayList = ({start,size,facts,error}) =>{
    let loc_start = start
    let loc_end = start+size
    if(loc_end > facts.length){
        loc_end = facts.length
    }
    const formattedFacts = facts.slice(loc_start,loc_end).map(fact => 
            (<li key= {facts.indexOf(fact)} data-index={facts.indexOf(fact)}>Fact No.{facts.indexOf(fact)+1}<br/>{fact}</li>)
    );

    // console.log(error)
    if (!error&&facts.length === 0){
        error  = 'empty-data'
    }
    return (
        <div>
            {facts.length?
            <div>
                <div className="fact_number">Showing Facts: {loc_start+1}-{loc_end}</div>
                <ul className = "facts">{formattedFacts}</ul>
            </div>
            : 
            <Error error={error}/>}
        </div>
    )
}