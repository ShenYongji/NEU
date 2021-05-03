export const userLogin =function(username) {
    return fetch('/login',{
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify({ username }),
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
       })
      .then( response => {
        if(response.ok) {
          return response.json();
        }
        return response.json().then( err => Promise.reject(err) );
    })

}

export const userLogout = function() {
    return fetch('/logout', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
    .catch( () => {
      return Promise.reject({ error: 'network-error' });
     })
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
};