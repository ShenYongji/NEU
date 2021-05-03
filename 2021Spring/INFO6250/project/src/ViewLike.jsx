import { likeRemove } from "./servers"

export const ViewLike = ({Like,setUserError,setLike})=>{


    function render (Like){

        let like_content
        if(Object.keys(Like).length <= 0){
            like_content = <div className="info">No Like Record</div>
        }
        else{
            like_content = Object.keys(Like).map((key)=>{
                return (
                    <li className='home_li' key = {key} data-index={key} >
                    <div className={Like[key].Label}></div>
                    <div>
                        <div><b>Title</b>: {Like[key].Title}</div>
                        <div><b>Author</b>: {Like[key].author}</div>
                        <div><b>Phone</b>: {Like[key].Phone}</div>
                        <div><b>Email</b>: {Like[key].Email}</div>
                        <div><b>Description</b>: {Like[key].Description}</div>
                        <button data-index={key} onClick={(e)=>{removeLike(e)}}> Remove from my favourite </button>
                    </div>
                </li>
                )
            })
        }

        return like_content
    }

    function removeLike(e){
        const index = e.target.dataset.index
        likeRemove({index})
        .then(({like,success})=>{
            if(success){
                setLike(like)
                setUserError('')
            }
        })
        .catch((err)=>{
            setUserError(err.error)
        })
    }
    return(
        <ul>
            {render(Like)}
        </ul>
    )
}