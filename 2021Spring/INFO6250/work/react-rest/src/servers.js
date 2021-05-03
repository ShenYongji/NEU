export const  Fetchcatlist = () =>{
    
    return fetch('/catfacts',  {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
        if(response.ok) {
          return response.json();
        }
        return response.json().then( json => Promise.reject(json) );
      })
}