# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

  The URL should represent the resource intead of action, which stands for the information about resources. URL
  is a noun and HTTP method is the verb.
  Bad Example:
   To get the list of student '/getStudents', this url represents the action of getting student list. 
   Because we use HTTP method to represent the action, the current way to get the list of student should be 
   app.get('/student',(req,res)=>{res.json(studentList)})

## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
 fetch('/username') returns a promise instead of the actual username.
 The code below will print out the username.
 ```
  fetch('/username')
  .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err));
    })
    .then((username)=>{
      console.log(`user is named ${username}`);
    })
``` 
 
## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
 Store state in the DOM stands for that storing current values for all things that can change. The current values in DOM will be used to represent a rendered page. If we alter the display, we will change the way of getting the states. Finally, when the values is getting more complicated, the intercation of state will be getting more complicated as well.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
 Mutiple-page-web application:
  1. Every change requests rendering a new page from the server in the browser.
  2. MPA is slower. Each require will redirect to a new page and roload HTML, CSS and script.

 Single-page-web application 
  1. does not require page reloading during use. It is one web page which loads contents using client-side JavaScript
  2. SPA is faster. HTML,CSS and scripts are only loaded once, only data is transferred from back to front.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
 Progressive Enhancement is taking a non-client-side JS web application and augmenting it with JS, which making websites work on some old browsers. The application will still perform well if no client-side JS or lower version of browsers. The benfit of using Progressive Enhancement is great for the search engines, great for accessibility and various devices and ensure backend is secure, but fairly rare due to extra effort on programming.
 
 SPA is very relied on client-side JS to render pages, which means that if an SPA does not use Progressive Enhancement, users will have a bad experiences while running SPA on old browsers, SPA uses Progressive Enhancement will not have this kind of issue. 

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
 Simailar part: REST service will render page by different requirements from users, which is similar to a dynamic asset.

 Different part: REST service reture JSON or XML rather than a whole HTML page.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
 Should not save any sensitive data in cookie, such as userid, password or SSN. Because cookies can be viewed in the browser.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
 1. keep the structure of function to be organized, easy to read and debug.
 2. If an error is happening, separation of concerns could locate the error faster or reduce mistakes while developing.
 3. fetch() will no longer directly touch any HTML, only get data from DOM and return the JSON from server.
 
## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
 Asynchronous errors will be catched when the callback is called and the operation is complete. Since the operation is complete, `catch(e) {}` will never catch the asynchronous errors.
 

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
 Separation of concerns is both frontend issue and server-side issue. All coding expects separation of concerns, not just web dev.
 ```
    //Frontend without SOC
    list.addEventListener('click', (e) => {
        if(!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")){
            return;
        }
        let index = e.target.dataset.index

        //send different param based on increasing or decreasing
        if(e.target.classList.contains("increase")){
            index = '+'+index
        }
        if(e.target.classList.contains("decrease")){
            index = '-'+index
        }
        if(index){
            fetch(`inventory/${index}`,{
                method:'PUT'
            })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( convertError)
            .then( inventory=> {
              input.value = '';
              renderPages(inventory);
              updateStatus('');
            })
            .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
            });
        }
    });
    ...
    }
```
In order to make this code east to understand and maintance.
Here is a revised version of front-end JS code. Since we are going to handle a lot of cases in one function, and make the structure of this function bigger and hard to read. In order to imporve this, we can create a function called modifyData({method,index}). After changed the structure of code, we can easily read and debug if it occurs any errors..
 ```
    //Frontend 
    list.addEventListener('click', (e) => {
        if(!e.target.classList.contains("increase") && !e.target.classList.contains("decrease")){
            return;
        }
        const index = e.target.dataset.index

        let method
        if(e.target.classList.contains("increase")){
            method = '+'
        }
        if(e.target.classList.contains("decrease")){
            method = '-'
        }
        modifyData({method,index})
        .then( convertError)
        .then( inventory => {
          input.value = '';
          renderPages(inventory);
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
        });
        
    });
    ...
    }

    function modifyData({method,index}){
      if(index && method){
        return fetch(`inventory/`,{
                method:'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringyfy({method,index})
            })
            .catch( 
              () => Promise.reject( { error: 'network-error' }) 
            )
            .then( response => {
            if(response.ok) {
              return response.json();
            }
            return response.json().then( err => Promise.reject(err) );
        })
      }
    }
```
Backend without SOC
```
  app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    if (!username){
      res.status(400).json({ errors });
      return;
    }
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
    if(clean !==username ) {
      res.status(400).json({ errors });
      return;
    }
    const sid = uuid();
    sessions[sid] = {username};
    res.cookie('sid', sid);
    res.status(200).json(sessions[sid]);
  });
```
Below is the server side code with SOC, which create validateUsername() and createSession() to reduce the size of code above.
 ```
  app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    const errors = validateUsername(username);
    if( !errors ) {
      res.status(400).json({ errors });
      return;
    }
    const sid = createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(sessions[sid]);
  });

  const validateUsername = function(username) {
    const errors = [];
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
    if( clean !== username ) {
      return false
    }
    if(!username) {
      return false
    }
    return true;
  };
  const createSession = function(username) {
    const sid = uuid();
    sessions[sid] = {username};
    return sid;
  };
```


