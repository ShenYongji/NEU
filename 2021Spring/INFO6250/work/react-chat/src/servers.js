export const checkSession = () =>{
    return fetch('/session',{
        method:'GET'
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}


export const login = ({username}) =>{
    return fetch('/session',{
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}

export const logout = () =>{
    return fetch('/session',{
        method:'DELETE'
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}

export const getMessage = () =>{
    return fetch('/message',{
        method:'GET'
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}

export const sendMessages = ({message}) =>{
    return fetch('/message',{
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify({message}),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}

export const getActiveUsers = () =>{
    return fetch('/users',{
        method:'GET'
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
}