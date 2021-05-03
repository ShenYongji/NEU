let inventory = { 
    "1": { 
      itemId: "1",
      name: "Stuffed Mouse",
      quantity: 3,
    },
    "2": { 
      itemId: "2",
      name: "Laser Pointer", 
      quantity: 1,
    },
    "4": { 
      itemId: "4",
      name: "String",
      quantity: 2,
    },
    "5": { 
      itemId: "5",
      name: "Squeaky Toy",
      quantity: 0,
    },
  }

let curr_index = 5 

function getcurrinventory(){
  return inventory
}


function updateinventory(new_inventory){
  inventory = new_inventory
}

function updatecurrindex(new_index){
  curr_index = new_index
}

function getcurrindex(){
  return curr_index
}

const item_data = {
    getcurrinventory,
    updateinventory,
    getcurrindex,
    updatecurrindex
}

module.exports = item_data;
