import { useEffect, useState } from "react"
import { getPost } from "./servers"
import {Error} from "./Error";
import { Renderposts } from "./Renderposts";

export const Home = function (){

    const [Post,setPost] = useState({})
    const [LikeArray, setLikeArray] = useState([])
    const [Logged, setLogged] = useState(false)
    const [Display, setDisplay] = useState({})

    const [HomeError,setHomeError] = useState('')

    useEffect(()=>{
        getPost()
        .then(({post,length,like_index,logged})=>{
            setPost(post)
            setLikeArray(like_index)
            setLogged(logged)
            setDisplay(Array(length).fill(false))
        })
        .catch((err)=>{
            setHomeError(err.error)
        })
    },[])

    return (
        <div className ='main_home'>
            <div className='home-title'>
                <div>Home page</div>
            </div>
            <Error ErrorMessage={HomeError}/>
            <hr/>
            <Renderposts post = {Post} like_index={LikeArray} Logged={Logged} Display={Display} setDisplay={setDisplay} setLikeArray = {setLikeArray} setHomeError={setHomeError}/>
        </div>
    )
}