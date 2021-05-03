const express = require('express');
const app = express();
const PORT = 3000;

const item_data = require("./items")

app.use(express.static('./public'));

//get db from backend
app.get('/inventory/', (req, res) => {
    const inventory = item_data.getcurrinventory()
    res.json(inventory);
});

//add item to backend
app.post('/inventory/:item',express.json(),(req,res)=>{
    const item = req.params.item.trim()
    //check if valid string
    if(!isValid(item)){
        res.status(400).json({ error: 'invalid-input' });
        return;
    }
    let inventory = item_data.getcurrinventory()
    if(!item ) {
        res.status(400).json({ error: 'missing-name' });
        return;
    }
    //check if duplicated
    for (let i in inventory) {
        if (item === inventory[i].name){
            res.status(409).json({ error: 'duplicate' });
            return;
        }
    }
    //get current index
    const curr_index = item_data.getcurrindex()+1
    inventory[curr_index.toString()] = {
        itemId: curr_index.toString(),
        name:item,
        quantity:0
    }
    //update backend
    item_data.updatecurrindex(curr_index)
    item_data.updateinventory(inventory)
    res.json(item_data.getcurrinventory());
});

//update quantity
app.put('/inventory/:index',express.json(),(req,res)=>{
    const method = req.params.index.slice(0,1)
    const index = req.params.index.slice(1)

    let inventory = item_data.getcurrinventory()
    if(!inventory[index]){
        res.status(400).json({ error: 'missing-name' });
        return;
    }

    const quantity = inventory[index].quantity
    if (method === "+"){
        inventory[index].quantity++
    }
    if(method === "-"){
        if (quantity >0){
            inventory[index].quantity--
        }
        //no quantity less than 0
        else{
            inventory[index].quantity = 0
        }
    }
    //update backend
    item_data.updateinventory(inventory)
    res.json(item_data.getcurrinventory())
});

//delete from backend
app.delete('/inventory/:index',express.json(),(req,res)=>{
    const index = req.params.index
    let inventory = item_data.getcurrinventory()
    if(!inventory[index]){
        res.status(400).json({ error: 'missing-name' });
        return;
    }
    delete inventory[index];
    //update backend
    item_data.updateinventory(inventory)
    res.json(item_data.getcurrinventory())
});

//check if string is only containing English letters
function isValid(input){
    const re = new RegExp(/^[a-z\s]+$/i)
    return re.test(input);
}

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));