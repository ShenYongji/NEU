import {addNewRecipe, getPageWithoutLogin,readRecipe} from './RecipesList'
import {userLogin,userLogout} from './user'

const display_list = document.querySelector(".recipe-list")

//let local_recipes 
//let local_username
const errMsgs = { // translate error codes to human-friendly messages
    'network-error': 'There was a problem connecting to the network, try again',
    'invalid-input' : 'There was a proble with your input, only allow English characters',
    'login-required':'Please Log in',
    'missing-id':"Unkown recipe id",
    'missing-name':'Please do not have whitespaces or use empty name',
    'no-dog': 'Not use `dog` as your username',
    'invalid-name':'Please try other name (upper and lower case A-Z, numbers, and underscore)',
    'missing-information':'All textareas are required'
};

function updateloginStatus(message) {
    const login_status = document.querySelector('.login-status')
    login_status.innerText = message;
}

function updateNewRecipeStatus(message) {
    const newrecipe_status = document.querySelector('.newrecipestatus')
    newrecipe_status.innerText = message;
}

function updatedisplayStatus(message) {
    const details_status = document.querySelector('.details-status')
    details_status.innerText = message;
}


function updateStatus(message) {
    const status = document.querySelector(".list-status")
    status.innerText = message;
}

getPageWithoutLogin()
.then(
    ({username,recipes_list}) =>{
        //console.log({username,recipes_list})
        if (!username){
            showLoginButton()
            showLoginDialog()
            UserLoginCancel()
            rendRecipePage(recipes_list)
        }
        else{
            ableAdd()
            newRecipeDialog()
            closeRecipeDialog()
            rendUserPanel(username)
            rendRecipePage(recipes_list)
            UserLogout()
        }
        updateStatus(' ');
})
.catch(err =>{
    console.log(err)
    updateStatus(errMsgs[err.error] || err.error);
});


function showLoginButton(){
    const user_panel = document.querySelector(".user")
    const login_button = document.createElement("BUTTON");
    login_button.innerHTML = "Login";
    login_button.classList.add("Login")
    user_panel.appendChild(login_button)
}

function showLoginDialog(){
    const login_page = document.querySelector(".Login")
    login_page.addEventListener('click' ,(e)=>{
        const login_dialog = document.querySelector('.loginpage')
        login_dialog.showModal()
    })
}

function UserLoginCancel(){
    const login_cancel_button = document.querySelector('.login-cancel')
    login_cancel_button.addEventListener('click',(e)=>{
        const login_dialog = document.querySelector('.loginpage')
        login_dialog.close()
        document.querySelector(".username").value = ''
        updateloginStatus(' ');
    })
}

function closeLoginPage(){
    const login_dialog = document.querySelector('.loginpage')
    login_dialog.close()
}
//submitNewRecipe(local_username)
submitNewRecipe()
UserLogin()
function UserLogin(){
    const login_button = document.querySelector('.login')
    login_button.addEventListener('click',(e)=>{
        const username = document.querySelector(".username").value
        userLogin(username)
        .then(({username,recipes_list})=>{
            document.querySelector(".username").value = ''
            closeLoginPage()
            rendUserPanel(username)
            rendRecipePage(recipes_list)
            ableAdd()
            newRecipeDialog()
            closeRecipeDialog()
            UserLogout()
            updateloginStatus(' ');
        })
        .catch( err =>{
            console.log(err);
            updateloginStatus(errMsgs[err.error] || err.error);
        })
    })
}


function UserLogout(){
    const logout_button = document.querySelector('.Logout')
    logout_button.addEventListener('click',(e)=>{
        userLogout()
        .then( ({recipes_list}) => {
            const user_panel = document.querySelector(".user")
            user_panel.innerHTML = ''
            showLoginButton()
            showLoginDialog()
            UserLoginCancel()
            disableAdd()
            rendRecipePage(recipes_list)
            updateStatus(' ');
        })
        .catch( err => {
            console.log(err);
            updateStatus(errMsgs[err.error] || err.error);
        })
    })
}

function newRecipeDialog(){
    const add = document.querySelector(".addRecipe")
    add.addEventListener("click",(e)=>{
        const input_dialog = document.querySelector(".input_dialog")
        input_dialog.showModal()
    })

}

function closeRecipeDialog(){
    const add_cancel = document.querySelector('.addNew_cancel')
    add_cancel.addEventListener('click',(e)=>{
        const input_dialog = document.querySelector(".input_dialog")
        input_dialog.close()
        document.querySelector('.input_title').value = ''
        document.querySelector('.input_ingredients').value=''
        document.querySelector('.input_instructions').value=''
        updateNewRecipeStatus(' ')
    })
}


function submitNewRecipe(){
    //console.log("calling submitNewRecipe(recipeAuthor)")
    const submit_button = document.querySelector(".addNew_submit")
    submit_button.addEventListener('click',(e)=>{
        const recipeTitle = document.querySelector('.input_title').value
        const recipeIngredients = document.querySelector('.input_ingredients').value
        const recipeInstructions = document.querySelector('.input_instructions').value
        //console.log({recipeTitle,recipeIngredients,recipeInstructions})
        addNewRecipe({recipeTitle,recipeIngredients,recipeInstructions})
        .then(({new_item,recipes_list})=>{
            rendRecipePage(recipes_list)
            updateNewRecipeStatus(' ')
            const input_dialog = document.querySelector(".input_dialog")
            input_dialog.close()
            document.querySelector('.input_title').value = ''
            document.querySelector('.input_ingredients').value=''
            document.querySelector('.input_instructions').value=''
            const demo = document.querySelector(".dialog-demo")
            const demo_details = document.querySelector(".dialog-details")
            demo_details.innerHTML += `
                <p>Title: </p>
                <p>${new_item.recipeTitle}</p>
                <p>Author: </p>
                <p>${new_item.recipeAuthor}</p>
                <p>Ingredients: </p>
                <p>${new_item.recipeIngredients}</p>
                <p>Instructions: </p>
                <p>${new_item.recipeInstructions}</p>`
            demo.showModal()
        })
        .catch(err =>{
            console.log(err)
            updateNewRecipeStatus(errMsgs[err.error] || err.error);
        })
    })
}

readDetails()
backtoHome()

function readDetails(){
    const list = document.querySelector(".recipe-list")
    list.addEventListener('click',(e)=>{
        e.preventDefault()
        if(!e.target.classList.contains("ref-link")){
            return
        }
        const recipeId = e.target.dataset.index
        //console.log(recipeId)
        readRecipe(recipeId)
        .then(({recipeTitle,recipeAuthor,recipeIngredients,recipeInstructions})=>{
            const demo = document.querySelector(".dialog-demo")
            const demo_details = document.querySelector(".dialog-details")
            updatedisplayStatus(' ')
            updateStatus(' ');
            demo_details.innerHTML += `
                <p>Title: </p>
                <p>${recipeTitle}</p>
                <p>Author: </p>
                <p>${recipeAuthor}</p>
                <p>Ingredients: </p>
                <p>${recipeIngredients}</p>
                <p>Instructions: </p>
                <p>${recipeInstructions}</p>`
            demo.showModal()
        })
        .catch(err =>{
            console.log(err)
            updatedisplayStatus(errMsgs[err.error] || err.error);
            updateStatus(errMsgs[err.error] || err.error);
        })
    })
}

function backtoHome(){
    const bth = document.querySelector(".bth-button")
    bth.addEventListener('click',(e)=>{
        e.preventDefault()
        const demo = document.querySelector(".dialog-demo")
        demo.close()
        const demo_details = document.querySelector(".dialog-details")
        demo_details.innerHTML = ''
    })
}

function ableAdd(){
    const input_panel = document.querySelector(".input_panel")
    input_panel.innerHTML = ''
    const input_button = document.createElement("BUTTON");
    input_button.innerHTML = "New Recipe";
    input_button.classList.add("addRecipe")
    input_panel.appendChild(input_button)
}

function disableAdd(){
    const input_panel = document.querySelector(".input_panel")
    input_panel.innerHTML = ''
}

function rendUserPanel(username){
    const user_panel = document.querySelector(".user")
    user_panel.innerHTML = ''
    const logout_button = document.createElement("BUTTON");
    logout_button .innerHTML = "Logout";
    logout_button .classList.add("Logout")
    const Hello_msg = document.createElement("p");
    Hello_msg .innerHTML = `Hello, ${username}`;
    user_panel.appendChild(Hello_msg)
    user_panel.appendChild(logout_button)
}

function rendRecipePage(list){
    //console.log(list)
    let html_data = ''
    for (let item_index in list){
        const recipeAuthor = list[item_index].recipeAuthor
        const recipeId = list[item_index].recipeId
        // const recipeIngredients = list[item_index].recipeIngredients
        // const recipeInstructions = list[item_index].recipeInstructions
        const recipeTitle = list[item_index].recipeTitle
        html_data += `
        <li>
            <div class="item">
                <span class="recipe-title" data-index="${recipeId}"><a class="ref-link" data-index="${recipeId}" href = /Recipes?recipeId=${recipeId}>${recipeTitle}</a></span>
                <br>
                <span class="recipe-author" data-index="${recipeAuthor}">Author: ${recipeAuthor}</span>
            </div>
        </li>
        `;
    }
    display_list.innerHTML = html_data 
}