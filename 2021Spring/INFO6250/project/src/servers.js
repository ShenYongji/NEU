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


export const sessionlogin = ({username}) =>{
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

export const sessionlogout = () =>{
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


export const postSubmit = ({Title,Label,Phone,Email,Description}) =>{
  return fetch('/post',{
      method:'POST',
      headers: new Headers({
          'content-type': 'application/json',
        }),
      body: JSON.stringify({Title,Label,Phone,Email,Description}),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getPost = () =>{
  return fetch('/post',{
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

export const getHistory = () =>{
  return fetch('/history',{
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

export const likeSubmit = ({index}) =>{
  return fetch('/like',{
      method:'POST',
      headers: new Headers({
          'content-type': 'application/json',
        }),
      body: JSON.stringify({index}),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const likeRemove = ({index}) =>{
  return fetch('/like',{
      method:'DELETE',
      headers: new Headers({
          'content-type': 'application/json',
        }),
      body: JSON.stringify({index}),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getLike = () =>{
  return fetch('/like',{
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