export const DisplayButton = ({startPage,setstartPage,maxLength,facts,length}) =>{
    function pageDown (){
        setstartPage(startPage-maxLength)
      }
      function pageUp(){
        setstartPage(startPage+maxLength)
    }

    const totalPage = parseInt(facts.length/maxLength)+ (facts%maxLength? 0:1)
    
    const currPage = (Number.isInteger(startPage/maxLength)? startPage/maxLength :startPage/maxLength+0.5)+1

    // console.log(startPage,maxLength,currPage)
    return (
        <div className = "display_button">
            {facts.length? 
            <div>
                <button onClick = {pageDown} disabled={!(startPage>0)}>&lt; Previous</button>
                <span className="page_number">{currPage}/{totalPage}</span>
                <button onClick = {pageUp} disabled ={((startPage+maxLength)>=length)}>Next &gt;</button>
            </div> : null
            }
        </div>
    )
}