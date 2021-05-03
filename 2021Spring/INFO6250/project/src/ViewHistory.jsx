export const ViewHistory = ({History})=>{

    let history_content 

    if(Object.keys(History).length <= 0){
        history_content = <div className="info">No History Record</div>
    }
    else{
        history_content = Object.keys(History).map((key)=>{
            return (
                <li className='home_li' key = {key} data-index={key} >
                <div className={History[key].Label}></div>
                <div>
                    <div><b>Title</b>: {History[key].Title}</div>
                    <div><b>Description</b>: {History[key].Description}</div>
                </div>
            </li>
            )
        })
    }

    return(
        <ul>
            {history_content}
        </ul>
    )
}