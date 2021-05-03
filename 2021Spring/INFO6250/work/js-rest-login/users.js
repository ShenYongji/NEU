let users = { }

function updatecurrindex(user,new_index){
    user.curr_count = new_index
}

function getcurrindex(user){
    return user.curr_count
}

function getcurrusers(){
  return users
}


function updateusers(new_users){
    users = new_users
}


const users_data = {
    getcurrusers,
    updateusers,
    updatecurrindex,
    getcurrindex
}

module.exports = users_data;