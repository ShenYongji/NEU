export const Dropdown = ({setListSize})=>{
    return (
        <div className="dropdown">
            <label>Facts per page:</label>
            <select onChange={(e)=>{setListSize(e.target.value)}}>
                <option value='5'>5</option>
                <option value='10'>10</option>
            </select>
        </div>
    )    
}

