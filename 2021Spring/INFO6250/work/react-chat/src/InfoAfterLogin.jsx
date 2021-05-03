export const InfoAfterLogin = ({getActiveUsers,setactiveUsersList,setwarming,getMessage,setmessages,setPollingfunction})=>{
    getActiveUsers()
    .then(({userList})=>{
      setactiveUsersList(userList)
    })
    .catch((err)=>{
      console.log(err)
      setwarming(err.error)
      setactiveUsersList([])
    })
    getMessage()
    .then(({messages})=>{
      setmessages(messages)
    })
    .catch((err)=>{
      console.log(err)
      setwarming(err.error)
      setmessages([])
    })


    const p = setTimeout(
        ()=>{InfoAfterLogin({getActiveUsers,setactiveUsersList,setwarming,getMessage,setmessages,setPollingfunction})
        },
        2000)
    
    
    setPollingfunction(p)
}