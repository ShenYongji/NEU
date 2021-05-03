import { Post } from "./Post"
import {Error} from "./Error";
import { useState } from "react";

export const Add = function ({setCurrentPage}){

    const [AddError, setAddError] = useState('')

    return (
        <div className ='main_add'>
            <div className='add-title'>
                <div>Add Post Here</div>
            </div>
            <Error ErrorMessage={AddError}/>
            <hr/>
            <Post setCurrentPage={setCurrentPage} setAddError={setAddError}/>
        </div>
    )
}