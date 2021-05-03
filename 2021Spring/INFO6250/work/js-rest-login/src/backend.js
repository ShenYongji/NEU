import {
    checkLoginStatus,
    performLogin,
    performLogout,
    showLogin,
    closeLogin
} from './login'

import {
    addintolist, 
    updateRate,deletefromlist} from './list'




let application = []


checkLoginStatus()
.then((user) =>{
    application = user
    rendPage()
    //rendPage(application)
    closeLogin();
})
.catch(err =>{
    console.log(err)
    updateloginStatus(errMsgs[err.error] || err.error);
    showLogin();
})

let t
const autoUpdate = () => {
    return fetch('/auto-update', {
      method: 'GET',
    })
    .then( response => {
        if(response.ok) {
          return response.json();
        }
        return response.json().then( err => Promise.reject(err));
      })
    .then((user)=>{
        application = user
        if(order == 1){
            application=ascending()
        }
        if(order == -1){
            application= descending()
        }
        rendPage() 
    })
    .catch(err=>{
        console.log(err)
        updateStatus(errMsgs[err.error] || err.error);
    })
    .then(t = setTimeout( autoUpdate, 5000) );
  };

  

//readfromlist()
login();
logout();
addItem();
adjustRate();
deleteitem();
orderRate();

function updateloginStatus(message) {
    const login_status = document.querySelector('.login-status')
    login_status.innerText = message;
}

const status = document.querySelector(".list_status")

function updateStatus(message) {
    if (message){
        status.innerText = message;
    }
}

const errMsgs = { // translate error codes to human-friendly messages
    'duplicate': 'This item had already existed',
    'network-error': 'There was a problem connecting to the network, try again',
    'invalid-input' : 'There was a proble with your input, only allow English characters',
    'login-required':'Please Log in',
    'missing-value':"value is missing, server error",
    'empty-name':'Please do not have whitespaces or use empty name',
    'login-invalid': 'Please try other name (PS: only English letters)',
    'username-invalid':'Please try other name (PS: only English letters)',
    'item name is empty':'item name is empty'
};

//let update = setTimeout( autoUpdate, 5000) 

function login(){
    const login_button = document.querySelector(".login");

    login_button.addEventListener('click',()=>{
        const username = document.querySelector('.username').value
        performLogin(username)
        .then( (user) => {
            document.querySelector('.username').value = ''
            application = user
            //rendPage()
            autoUpdate()
            closeLogin();
        })
        .catch( err => {
            // fixme - show errors
            console.log(err);
            updateloginStatus(errMsgs[err.error] || err.error);
        })
    })
}

//let update = setTimeout( autoUpdate, 5000) 
function logout(){
    const logout_button = document.querySelector(".logout");
    logout_button.addEventListener('click',()=>{
        performLogout()
        .then( (user) => {
            const list = document.querySelector(".inventory-app .display-panel .item-list");
            list.innerHTML = ''
            clearTimeout(t);
            hideUserPanel()
            showLogin()
        })
        .catch( err => {
            // fixme - show errors
            console.log(err);
            updateloginStatus(errMsgs[err.error] || err.error);
        })
    })
}

function addItem(){
    const add_button = document.querySelector(".inventory-app .input-panel button");
    add_button.addEventListener("click",()=>{
        const input = document.querySelector(".inventory-app .input-panel input");
        const item = input.value
        addintolist(item)
        .then(({itemId,name,rate}) =>{
            status.innerHTML= ''
            input.value = ''
            application.items.push({itemId,name,rate})
            if(order == 1){
                application=ascending()
            }
            if(order == -1){
                application= descending()
            }
            rendPage() 
        })
        .catch(err=>{
            console.log(err)
            updateStatus(errMsgs[err.error] || err.error);
        })
    })
}

function adjustRate(){
    const list = document.querySelector(".inventory-app .display-panel .item-list");
    list.addEventListener('click', (e) => {
        if(!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")){
            return;
        }
        let itemId = e.target.dataset.index

        let method
        if(e.target.classList.contains("increase")){
            method = '+'
        }
        if(e.target.classList.contains("decrease")){
            method = '-'
        }
        updateRate({method,itemId})
        .then(({itemId,item})=>{
            const curr_index = returnPos(itemId)
            application.items[curr_index] = item
            if(order == 1){
                application=ascending()
            }
            if(order == -1){
                application= descending()
            }
            rendPage() 
        })
        .catch(err=>{
            console.log(err)
            updateStatus(errMsgs[err.error] || err.error);
        })
    });
}

function deleteitem(){
    const list = document.querySelector(".inventory-app .display-panel .item-list");
    list.addEventListener('click', (e) => {
        if(!e.target.classList.contains("delete")){
            return;
        }
        const itemId = e.target.dataset.index
        //console.log(itemId)
        //console.log(e.target)
        deletefromlist(itemId)
        .then(({itemId})=>{
            //console.log(index)
            //delete application.items[index]
            const curr_index = returnPos(itemId)
            application.items.splice(curr_index,1)
            if(order == 1){
                application=ascending()
            }
            if(order == -1){
                application= descending()
            }
            rendPage() 
        })
        .catch(err=>{
            console.log(err)
            updateStatus(errMsgs[err.error] || err.error);
        })
    });
}

function rendPage() {
    console.log(order)
    const user_panel = document.querySelector('.user')
    user_panel.hidden = false
    const name = document.querySelector('.name')
    name.innerHTML = application.username

    const list = document.querySelector(".inventory-app .display-panel .item-list");
    console.log(application)
    let html_data = '';
        for (let i in application.items){
            const itemId = application.items[i].itemId
            const index = i
            const name = application.items[i].name
            const rate = application.items[i].rate
            if (rate <= 0){
                html_data += `
                <li>
                    <span class="delete" data-index="${itemId}">X</span>
                    <span class="item-name" data-index="${itemId}">Name: ${name}</span>
                    <br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>
                    <button class="decrease" data-index="${itemId}" disabled> - </button>
                    <span class="item-quantity" data-index="${itemId}">${rate}</span>
                    <button class="increase" data-index="${itemId}"> + </button>
                </li>
                `;
            }
            else if (rate >=5){
                html_data += `
                <li>
                    <span class="delete" data-index="${itemId}">X</span>
                    <span class="item-name" data-index="${itemId}">Name: ${name}</span>
                    <br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>
                    <button class="decrease" data-index="${itemId}"> - </button>
                    <span class="item-quantity" data-index="${itemId}">${rate}</span>
                    <button class="increase" data-index="${itemId}" disabled> + </button>
                </li>
                `;
            }
            else{
                html_data += `
                <li>
                    <span class="delete" data-index="${itemId}">X</span>
                    <span class="item-name" data-index="${itemId}">Name: ${name}</span>
                    <br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: </span>
                    <button class="decrease" data-index="${itemId}"> - </button>
                    <span class="item-quantity" data-index="${itemId}">${rate}</span>
                    <button class="increase" data-index="${itemId}"> + </button>
                </li>
                `;
            }
        }
    list.innerHTML = html_data;
    //buttondisable(user.items)
}

let order = 0

function ascending(){
    console.log("ascending")
    let ascending_app =[]
    
    console.log(application.items)
    ascending_app.username = application.username
    //ascending_app.curr_index = application.curr_index
    ascending_app.items = []

    let ascending_list = []
    for (let i of application.items){
        const itemId = i.itemId
        const rate = i.rate
        ascending_list.push([itemId,rate])
    }


    console.log(ascending_list)

    ascending_list.sort(function compare(a,b){
        return a[1]-b[1]
    })

    console.log(ascending_list)

    console.log(application.items)
    for (let index in ascending_list){
        const itemId = ascending_list[index][0]
        const rate = ascending_list[index][1]
        const curr_index = returnPos(itemId)
        console.log(itemId,application.items[curr_index].name,rate)
        ascending_app.items.push({itemId:parseInt(itemId),name: application.items[curr_index].name,rate})
    }
    console.log(ascending_app)
    console.log("__________________________________")
    return ascending_app

}

function descending(){
    //console.log("descending")
    let descending_app = []

    //console.log(application.items)
    descending_app.username = application.username
    //descending_app.curr_index = application.curr_index
    descending_app.items = []

    let descending_list = []
    for (let i of application.items){
        const itemId = i.itemId
        const rate = i.rate
        descending_list.push([itemId,rate])
    }

    //console.log(descending_list)

    descending_list.sort(function compare(a,b){
        return b[1]-a[1]
    })
    //console.log(descending_list)

    //console.log(application.items)

    for (let index in descending_list){
        const itemId = descending_list[index][0]
        const rate = descending_list[index][1]
        const curr_index = returnPos(itemId)
        //console.log(itemId,application.items[curr_index].name,rate)
        descending_app.items.push({itemId:parseInt(itemId),name: application.items[curr_index].name,rate})
    }
    //console.log(descending_app)
    //console.log("__________________________________")
    return descending_app
}


function orderRate(){
    const ascending = document.querySelector('.ascending')
    const descending = document.querySelector('.descending')
    //const reset = document.querySelector('.reset')


    ascending.addEventListener('click',()=>{
        order = 1
        //console.log("ascending")
        let ascending_app =[]
        
        //console.log(application.items)
        ascending_app.username = application.username
        //ascending_app.curr_index = application.curr_index
        ascending_app.items = []
    
        let ascending_list = []
        for (let i of application.items){
            const itemId = i.itemId
            const rate = i.rate
            ascending_list.push([itemId,rate])
        }
    
    
        //console.log(ascending_list)
    
        ascending_list.sort(function compare(a,b){
            return a[1]-b[1]
        })
    
        //console.log(ascending_list)
    
        //console.log(application.items)
        for (let index in ascending_list){
            const itemId = ascending_list[index][0]
            const rate = ascending_list[index][1]
            const curr_index = returnPos(itemId)
            //console.log(itemId,application.items[curr_index].name,rate)
            ascending_app.items.push({itemId:parseInt(itemId),name: application.items[curr_index].name,rate})
        }
        //console.log(ascending_app)
        application = ascending_app
        //console.log("__________________________________")
        rendPage()
    })
    descending.addEventListener('click',()=>{
        order = -1
        //console.log("descending")
        let descending_app = []
    
        //console.log(application.items)
        descending_app.username = application.username
        //descending_app.curr_index = application.curr_index
        descending_app.items = []
    
        let descending_list = []
        for (let i of application.items){
            const itemId = i.itemId
            const rate = i.rate
            descending_list.push([itemId,rate])
        }
    
        //console.log(descending_list)
    
        descending_list.sort(function compare(a,b){
            return b[1]-a[1]
        })
        //console.log(descending_list)
    
        //console.log(application.items)
    
        for (let index in descending_list){
            const itemId = descending_list[index][0]
            const rate = descending_list[index][1]
            const curr_index = returnPos(itemId)
            //console.log(itemId,application.items[curr_index].name,rate)
            descending_app.items.push({itemId:parseInt(itemId),name: application.items[curr_index].name,rate})
        }
        //console.log(descending_app)
        application = descending_app
        //console.log("__________________________________")
        rendPage()
    })    
    // reset.addEventListener('click',()=>{
    //     // console.log("reset")

    //     //console.log(application.items)
    //     rendPage()
    // })
    // <button class="ascending">Ascending</button>
    // <button class="descending"> Descending</button>
    // <button class="reset">Reset</button>
}
function returnPos(itemId){
    let curr_index
    for (let i in application.items){
        if(itemId == application.items[i].itemId){
            curr_index = i
            break
        }
    }
    return curr_index
}
function hideUserPanel(){
    const user_panel = document.querySelector('.user')
    user_panel.hidden = true
}
