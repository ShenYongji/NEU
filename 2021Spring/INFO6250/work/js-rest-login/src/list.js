export const addintolist = function (item){
    return fetch('/user',{
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify({ item }),
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
}

export const updateRate = function({method,itemId}){
    if (itemId){
        return fetch('/user',{
            method: "PATCH",
            headers: new Headers({
                'content-type': 'application/json',
              }),
            body: JSON.stringify({method,itemId}),
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
    }
}

export const deletefromlist = function(itemId){
    if (itemId){
        return fetch('/user',{
            method: "DELETE",
            headers: new Headers({
                'content-type': 'application/json',
              }),
            body: JSON.stringify({itemId}),
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
    }
}

export const readfromlist = function(){
    return fetch('/list',{
        method:'GET'
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
    .then( setTimeout( readfromlist, 1000) );
}

// export const buttondisable = function(items){
//     for (let i of document.querySelectorAll(".decrease")){
    
//         const index = i.dataset.index
//         const rate = items[index].rate
//         console.log(index,rate)
//         if (rate <= 0 ){
//             i.disabled = true
//         }
//     }
//     for (let i of document.querySelectorAll(".increase")){
//         const index = i.dataset.index
//         const rate = items[index].rate
//         if (rate >= 5 ){
//             i.disabled = true
//         }
//     }
// }