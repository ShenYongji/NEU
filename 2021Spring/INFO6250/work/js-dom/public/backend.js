"use strict";
(function IIFE() {
    const inventory =[
        {
            name: "apple",
            quantity: 10
        },
        {
            name: "milk",
            quantity: 20
        },
        {
            name: "rice",
            quantity: 11
        },
        {
            name: "beef",
            quantity: 10
        },
    ];


    const list = document.querySelector(".inventory-app .display-panel .item-list");
    const input = document.querySelector(".inventory-app .input-panel input");
    const add_button = document.querySelector(".inventory-app .input-panel button");

    displayInventory(inventory)
    disableButtonIfNoInput();
    addItem();
    deleteItem();
    updateQuantity();


    function displayInventory(inventory){

        let html_data = '';

        for (let i in inventory){
            const name = inventory[i].name
            const quantity = inventory[i].quantity
            //first way to create, let all button are not disable
            html_data += `
            <li>
                <span class="delete" data-index="${i}">X</span>
                <span class="item-name" data-index="${i}">Name: ${name}</span>
                <br>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity: </span>
                <button class="decrease" data-index="${i}"> - </button>
                <span class="item-quantity" data-index="${i}">${quantity}</span>
                <button class="increase" data-index="${i}"> + </button>
            </li>
            `;
        }

        list.innerHTML = html_data;
        // followed by the first way, read all queries if the class name is decrease
        for (let i of document.querySelectorAll(".decrease")){
            const index = i.dataset.index
            const quantity = inventory[index].quantity
            //check the quantity and set disabled if less than or equal 0
            if (quantity <= 0 ){
                i.disabled = true
            }
        }
        add_button.disabled = !input.value;
    }

    function addItem(){
        add_button.addEventListener("click",()=>{
        const new_item = {
            name: input.value,
            quantity: 0,
        };
        inventory.push(new_item);
        //adding animation on new item
        list.innerHTML += `
                <li class="adding">
                    <span class="delete" >X</span>
                    <span class="item-name">Name: ${new_item.name}</span>
                    <br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quantity: </span>
                    <button class="decrease"  disabled> - </button>
                    <span class="item-quantity" >${new_item.quantity}</span>
                    <button class="increase" > + </button>
                </li>`
        // clear the input
        input.value = '';
        // update the HTML
        setTimeout(function(){displayInventory(inventory);},600);
        });
    }

    function disableButtonIfNoInput(){
        input.addEventListener("input", ()=>{
            add_button.disabled = !input.value;
        });
    }

    function updateQuantity(){
        list.addEventListener("click", (e)=>{
            if(!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")){
                return;
            }

            const index = e.target.dataset.index

            //determine if user want to increase the amount or decrease the amount of item
            if(e.target.classList.contains("increase")){
                inventory[index].quantity++
            }

            if (e.target.classList.contains("decrease")){
                if (inventory[index].quantity >0){
                    inventory[index].quantity--
                }
                //no quantity less than 0
                else{
                    inventory[index].quantity = 0
                }
            }

            displayInventory(inventory);
        });
    }

    function deleteItem(){
        list.addEventListener("click", (e)=>{
            if(!e.target.classList.contains("delete")){
                return;
            }
            //adding animation on deleted item
            e.target.parentElement.classList.add("deleted")
            //console.log(e.target.parentElement)
            const index = e.target.dataset.index;
            inventory.splice(index,1);
            setTimeout(function(){displayInventory(inventory);},600);
        });
    }

})();