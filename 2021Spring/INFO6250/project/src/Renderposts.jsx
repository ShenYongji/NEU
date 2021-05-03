import {likeRemove, likeSubmit} from './servers'

export const Renderposts = function ({post,like_index,Logged,Display,setDisplay,setLikeArray,setHomeError}) {
    if(Object.keys(post).length<=0){
        return (
            <div className = "info">
                NO DATA
            </div>
        )
    }

    let display_index = -1

    function addorremove({index}){
        if(!like_index.includes(index)){
            likeSubmit({index})
            .then(()=>{
                setLikeArray([...like_index,index])
                setHomeError('')
            })
            .catch((err)=>{
                setHomeError(err.error)
            })
        }
        else{
            likeRemove({index})
            .then(()=>{
                like_index.splice(like_index.indexOf(index),1)
                setLikeArray([...like_index])
            })
            .catch((err)=>{
                setHomeError(err.error)
            })
        }
    }
    const cleaned_post = Object.keys(post).map((key)=>{
        display_index++
        return (
            <li className='home_li' key = {key} data-index={key} >
                <div className={post[key].Label}></div>
                <div>
                    <div>{post[key].Title}</div>
                    {Logged? 
                        <button data-index={key} onClick={(e)=>{addorremove({index:e.target.dataset.index})}}>
                            {like_index.includes(key)?'Remove from my favourite':'Add to my favourite'}</button>
                            : null
                        }
                    <div data-display = {display_index} onClick={(e)=>{
                        const curr_display_index = e.currentTarget.dataset.display
                        Display[curr_display_index] = !Display[curr_display_index]
                        setDisplay([...Display])
                        e.currentTarget.children[1].className = Display[curr_display_index]?'display':'none'
                        }} >
                        <b>Click to View Details?</b>
                        <div className={Display[display_index]?'display':'none'}>
                            Author: {post[key].author}
                            <br/>
                            Phone: {Logged? post[key].Phone:<b>Please Login to view</b>}
                            <br />
                            Email: {Logged? post[key].Email:<b>Please Login to view</b> }
                            <br />
                            Description: 
                            <br />
                            {post[key].Description}
                        </div>
                    </div>
                </div>
            </li>
        )
    })


    return (
        <ul className='Home_post'>
            {cleaned_post}
        </ul>
    )
}