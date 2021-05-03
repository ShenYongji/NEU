export const UsersList = ({activedUsersList}) => {

    const userList = activedUsersList.map((user)=>(
        <li key={user}>{user}</li>
    ))
    return (
        <div className="users_list">
            Current Online Users: {activedUsersList.length}
            {userList}
        </div>
    )


}