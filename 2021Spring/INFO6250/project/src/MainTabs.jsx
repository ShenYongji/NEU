import home from './svg/home.svg';
import add from './svg/add.svg';
import user from './svg/user.svg';
export const MainTabs = function({setCurrentPage}){
    function updatePage(e){
        const pagename = e.currentTarget.className
        setCurrentPage(pagename)
    }
    return (
        <ul className = 'main_tabs'>
            <li className = 'home' onClick={(e)=>updatePage(e)}>
                <img className='footer-home' alt = 'Home' src = {home} />
            </li>
            <li className = 'add' onClick={(e)=>updatePage(e)}>
                <img className='footer-post' alt = 'Add Post' src ={add} />
            </li>
            <li className = 'user' onClick={(e)=>updatePage(e)}>
                <img className='footer-user' alt = 'User' src={user} />
            </li>
        </ul>
    )
}