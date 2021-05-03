export const getPageWithoutLogin =  function() {
    return fetch('/initPage', {
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


export const addNewRecipe = function({recipeTitle,recipeIngredients,recipeInstructions}) {
    return fetch('/Recipes',{
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify({recipeTitle,recipeIngredients,recipeInstructions})
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

export const readRecipe = function(recipeId){
    return fetch(`/Recipes/${recipeId}`,{
        method : "GET"
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