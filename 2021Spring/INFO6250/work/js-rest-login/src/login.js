function convertError(response) {
  if(response.ok) {
      return response.json();
  }
  return response.json()
  .then( err => Promise.reject(err) );
}


export const checkLoginStatus = function() {
  return fetch('/user', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err));
  })
};


export const performLogin = function( username ) {
  return fetch('/login', {
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
};

export const performLogout = function() {
  return fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin',
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



export const showLogin = function (){
  const login_status = document.querySelector('.login-status')
  login_status.innerHTML = 'Please Log in'
  const login_page = document.querySelector('.loginpage')
  login_page.showModal()
}

export const closeLogin = function (){
  const login_status = document.querySelector('.login-status')
  login_status.innerHTML = ''
  const login_page = document.querySelector('.loginpage')
  login_page.close()
}