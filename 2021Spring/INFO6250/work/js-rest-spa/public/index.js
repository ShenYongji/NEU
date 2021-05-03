"use strict";

(function iife() {

    const list = document.querySelector(".inventory-app .display-panel .item-list");
    const input = document.querySelector(".inventory-app .input-panel input");
    const add_button = document.querySelector(".inventory-app .input-panel button");
    const status = document.querySelector(".status")
    const status_msg = document.querySelector(".status-msg")
    const ok = document.querySelector(".status-ok")
    
    disableButtonIfNoInput();
    hideDialog();

    let local_inventory = {}; // Application state

    const errMsgs = { // translate error codes to human-friendly messages
    'duplicate': 'This item had already existed',
    'network-error': 'There was a problem connecting to the network, try again',
    'invalid-input' : 'There was a proble with your input, only allow English characters'
    };


    function updateStatus(message) {
        if (message){
            status.showModal()
            status_msg.innerText = message;
        }
    }

    //fectch data from server, and copy to local
    function renderPages(inventory) {
        //copy to local
        local_inventory = inventory
        let html_data = '';
        for (let i in local_inventory){
            const itemId = local_inventory[i].itemId
            const name = local_inventory[i].name
            const quantity = local_inventory[i].quantity
            html_data += `
            <li>
                <span class="delete" data-index="${itemId}">X</span>
                <span class="item-name" data-index="${itemId}">Name: ${name}</span>
                <br>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity: </span>
                <button class="decrease" data-index="${itemId}"> - </button>
                <span class="item-quantity" data-index="${itemId}">${quantity}</span>
                <button class="increase" data-index="${itemId}"> + </button>
            </li>
            `;
        }

        list.innerHTML = html_data;
        //set disable if quantity is 0
        for (let i of document.querySelectorAll(".decrease")){
            const index = i.dataset.index
            const quantity = local_inventory[index].quantity
            if (quantity <= 0 ){
                i.disabled = true
            }
        }
        add_button.disabled = !input.value;
    }

    //add function
    add_button.addEventListener('click', () => {
        //replace < and >, avoid injection attack
        const item = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        //if "/" in string, tell user to remove
        if (item.indexOf("/") !== -1){
            updateStatus("Please remove '/' in the input area")
        }
        //if item is only one whitespace
        if(item===' '){
            updateStatus("Every name must have at least 1 non-whitespace character")
        }
        if(item) {
        fetch(`/inventory/${item}`, {
            method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError)
        .then( inventory=> {
            //perform adding css
            list.innerHTML += `
            <li class="adding">
                <span class="delete">X</span>
                <span class="item-name" >Name:${item}</span>
                <br>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity: </span>
                <button class="decrease" > - </button>
                <span class="item-quantity" >0</span>
                <button class="increase" > + </button>
            </li>
            `
            setTimeout(function(){
                input.value = '';
                renderPages(inventory);
                updateStatus('');},600);
            })
        .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
        });
        }
    });

    //change quantity
    list.addEventListener('click', (e) => {
        if(!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")){
            return;
        }
        let index = e.target.dataset.index

        //send different param based on increasing or decreasing
        if(e.target.classList.contains("increase")){
            index = '+'+index
        }
        if(e.target.classList.contains("decrease")){
            index = '-'+index
        }
        if(index){
            fetch(`inventory/${index}`,{
                method:'PUT'
            })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( convertError)
            .then( inventory=> {
            input.value = '';
            renderPages(inventory);
            updateStatus('');
            })
            .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
            });
        }
    });

    //delete function
    list.addEventListener('click' , (e)=>{
        if(!e.target.classList.contains("delete")){
            return;
        }
        const index = e.target.dataset.index
        if(index){
            fetch(`inventory/${index}`,{
                method:'DELETE'
            })
            .catch(() => Promise.reject( { error: 'network-error' }) )
            .then( convertError)
            .then( inventory=> {
            //perform delete css
            e.target.parentElement.classList.add("deleted")
            setTimeout(function(){
                input.value = '';
                renderPages(inventory);
                updateStatus('');
            },600);
            })
            .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
            });
        }
    });

    function convertError(response) {
    if(response.ok) {
        return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
    }

    
    function disableButtonIfNoInput(){
        input.addEventListener("input", ()=>{
            add_button.disabled = !input.value;
        });
    }

    function hideDialog(){
        ok.addEventListener("click", ()=>{
            input.value = '';
            add_button.disabled = !input.value;
            status.close()
        });
    }
    
  // code that runis on page load
  // (Technically it all runs on page load, but this has an immediate visible effect)
    fetch('/inventory/', {
        method: 'GET',
    })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then( convertError )
    .then( inventory => {
    renderPages(inventory);
    updateStatus('');
    })
    .catch( err => {
    updateStatus(errMsgs[err.error] || err.error);
    });

})();