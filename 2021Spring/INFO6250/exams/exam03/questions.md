# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)

ANS:
If being too specific, JSX components should be reusable as same as JS functions should follow the rule of seperation of concerns.
If too much in one component, break it down. One JSX component, one purpose. Just like JS function, one function only deal with one thing.
```
App.jsx
function App() {
  const [username, setusername] = useState('Yongji')
  const [info, setinfo] = useState(['male','INFO6250'])
  return (
    <div className="App">
      <DisplayName username={username} />
      <DisplayInfo info={info} />
    </div>
  );
}
DisplayName.jsx
export const DisplayName = function({username}){
  return(
    <div>{username}</div>
  )
}
DisplayInfo.jsx
import {renderinfo} from './renderinfo'
export const DisplayInfo = function({info}){
  const information = renderinfo(info)
  return(
    <div>{information}</div>
  )
}
renderinfo.js
export const renderinfo = function(info){
  info.map((key)=>{
    return key
  })
}
```
Those 2 examples of the same best practices in JSX and JS, because it will have other programmer on understanding your code and easily debug or maintain without change a lot.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

ANS: 
SPA is heavliy relied on JS. Because SPA uses JS to render page when data comes in, which means that if a SPA Progressive Enhancement, when users try to use this SPA in an older version browser, SPA will not be able to render well because of no client-side JS. 
In order to dealing with above case, combining a SPA with a MPA will be good way, because MPA is not that relied on JS compared with SPA and have better performance on old version browser using Progressive Enhancement.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.

ANS:
The reason why we need proxy in package.json, because during the development,frontend is running on the localhost port 3000, but backend code is running on the localhost port 4000, which means that when the frontend is trying to talk with backend, frontend will face with CORS issue.

When frontend JavaScript will make a request to the dev server(Port 3000), since Port 3000 does not have `/service`, then Port 3000 will talk with Port 4000 because we had the "proxy" setting in package.json, then Port 4000 will make a call to `/service` and pass the respond to Port 3000, after Port 3000 received, Port 3000 will pass the response to the frontend.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

ANS:
After called `npm run build`, `/build` folder will have everthing from `/public` and `/src` (packaged alll codes into `/build`), then server side and client side are both on the port 4000 now, which means that when JSX makes a call to `/service`, it will get the response from server directly.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.

ANS: 
It stands for that data are only allowed to pass from parent component to child component by using `props` in React.
For example:
```
App.jsx
function App() {
  const [username, setusername] = useState('Yongji')
  return (
    <div className="App">
      <Display username={username}/>
    </div>
  );
}
Display.jsx
export const Display = function({username}){
    return(
        <div>{username}</div>
    )
}
```
Display.jsx(child component) will read the data from the App.jsx(parent component).

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.

ANS: 
We pass the callback function from parent component to child component by using `props` to make child component update the data in parent component.
For example:
```
App.jsx
function App() {
  const [Answer, setAnswer] = useState('')
  return (
    <div className="App">
      <Userinput  setAnswer={setAnswer}/>
      Your Answer is : {Answer}
    </div>
  );
}

Userinput.jsx
export const Userinput = function ({setAnswer}){
    const [loc_string, setString] = useState('')
    function updateAnswer(e){
        console.log(e.target.value)
        setString(e.target.value)
    }
    return (
        <div>
            <input onChange={(e)=>updateAnswer(e)}></input>
            <button onClick={()=>{setAnswer(loc_string)}}>Comfirm</button>
        </div>
    )
}
```
From this above example, we can pass the callback function(setAnswer) from parent to child, so that child component can use this callback to modify the data without knowing what data is.

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

ANS: 
The collection of student records should be Object, the collection of steps to create a pizza should be Array.

For example:
```
const students ={
    "654321":{ id: "654321", name: "Bao", address: "123 Main Street" },
    "123456":{ id: "123456", name: "Foo", address: "123 Main Street" },
}

const steps = [
  { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" },
  { qty: "2/3 cup", ingredient: "bacon", instructions: "sprinkle over pizza"},
  { instructions: "Bake 10 min. or until cheese is melted" }
]
```
The reason of using Object for the collection students:
1. The order of students does not matter.
2. Efficiently search the student information by using sudentID, such as students["654321"] instead of looping all students and find the target, same idea for deleting and adding.
The reason of using Array for the collection of steps to create a pizza:
1. The order of making a pizza does matter, if the order changed, it may affect the tasting of pizza.
2. Normally the steps to create a pizza should be done at most 10 steps, we are able to directly lookup which step I want by using steps[2].

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

ANS: 
Inheritance in JS stands for a Object can directly use the method or property from other Object by prototype.
Object has `__proto__`, it points to its prototype, and that prototype also has own `__proto__`, when a method is called, JS will go throught this until the prototype is null (prototype chain).

For example
```
function Person (name, age) {
    this.name = name
    this.age = age
}
Person.prototype.getName = function(){
    console.log(this.name)
}

function Career (name, age,jobtitle) {
    Person.call(this, name, age)
    this.jobtitle = jobtitle
}

function inheritPrototype(subType,superType) {
    const prototype = Object.create(superType.prototype);
    prototype.constructor = subType;  
    subType.prototype = prototype;   
}
inheritPrototype(Career,Person);

const teacher = new Career('A',25,'teacher');
//property
console.log(teacher.name)
console.log(teacher.age)
//method
teacher.getName()
```
## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.

ANS: 
`!username` includes `username == undefined`.
Using `===` instead of `==`, `==` in JavaScript is only used for comparing two variables, but it ignores the datatype of variable.
```
let username = undefined  
console.log(!username)              //true
console.log(username == undefined)  //true
console.log(username === undefined) //true
username = null
console.log(!username)              //true
console.log(username == undefined)  //true
console.log(username === undefined) //false
username = 'undefined'
console.log(!username)              //false
console.log(username == undefined)  //false
console.log(username === undefined) //false
```
from this example above, `username == undefined` also return true when `username = null`

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?

ANS: 
Decoupling means that two or more codes or files have none or very little knowledge about the other, and a change in one usually doesn't require a change in the other.
In a React app, we usually separate JS code into JS file, and JSX component into JSX file, so that JS codes are connected to JSX files, but without being directly connected.
The advantage of this, because it helps people to read and understand code efficiently. And when people maintain or make some changes in future, they only need to make a change as minimum as possible in one single file or part of code.

## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.
```
App.jsx
import { useState} from 'react';
import './App.css'
function App() {
  const [Color, setColor] = useState("red");
  function changeColor(){
    const ColorArray = ['red','blue','yellow','green']
    ColorArray.splice(ColorArray.indexOf(Color),1)
    const new_color = ColorArray[Math.floor(Math.random()*ColorArray.length)]
    setColor(new_color)
  }
  return (
    <div className="App">
      <button onClick={changeColor}>Change the background Color of following area</button>
      <div className = {Color}>
        {Color}
      </div>
    </div>
  );
}
App.css
.red{
  background-color: red;
  height: 100px;
  width: 100px;
}
.yellow{
  background-color: yellow;
  height: 100px;
  width: 100px;
}
.blue{
  background-color: blue;
  height: 100px;
  width: 100px;
}
.green{
  background-color: green;
  height: 100px;
  width: 100px;
}
```
Instead of modifying the style attribute of the element, I can change the className in React and link a stylesheet with specified className to modify the background color. 
From the example code above, the className will be changed when I click, the background color will be changed as soon as the className is changed due to CSS.

## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding

ANS: 
CASE 1:
```
frontend.jsx
   console.log(input_value)  // A
   sendValue({input_value})
   .then(({input_value})=>{
     console.log(input_value)  //B
   })
```
Before I send the data to the backend, I will try to console.log this input value to check if is valid or not, the log message at A is not valid, such as `null` or `undefined`, it means that there should be an error in my React code. If the log message is valid, then I will check the result at B, if B does not have the correct output, which stands for there should be an error in the service code.

CASE 2:
I open the Developer Tool and repeat this step one more time to check the response in the Network to see if the response has the correct input value, if response does contain the right value, which means that there should be an error in my React code after data comes from the backend, otherwise I will check the code in my service side.

## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
```
import { useState } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  setCount(1);
  return (
    <div>{count}</div>
  );
}
```

ANS: 
How many times would the below code render?
This code will render unlimited times, because the count has been keeping to reset to 1 and make the page re-render. When I try this code, the React throws this error to me `Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.`

What is the rendered output for each of those times?
When first time of page loading, output is `<div>0</div>`, then the page will render because of setCount(1), output will become `<div>1</div>`, then the page should keep this output.

What triggered (caused) the render?
setCount(1) is keeping set the count without any limits.
Changed the code as the following, we make this page only render 2 times
First is `<div>0</div>`, then page will render and display `<div>1</div>`, then keep this as final output.
```
export const Demo = function() { 
  const [count, setCount] = useState(0);
    setTimeout(()=>{
        setCount(1)
    },1)
    // setCount(1)
    console.log(count)
  return (
    <div>
        {count}
    </div>
  );
}
```

## Q14: What happens with the below code when rendered and why?
```
import { useState, useEffect } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  
  useEffect( () => { 
    Promise.resolve().then( () => { 
      setCount(count + 1);
    });
  }, [count]);
  return (
    <div>{count}</div>
  );
}
```

ANS:
The page will re-render unlimited times and it will keep re-rendering because useEffect will be called when count is changed.

## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)

ANS:
In the browser-side, `WHATEVER.json(...)` returns a promise which resolves with a JavaScript object that is the result of parsing the body text as JSON if fetch is successful.

In the server-side, `WHATEVER.json(...)` sends a response that is the parameter converted to a JSON string.

## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)

ANS: The urls should be an absolute path, begin with 'http://' or 'https://' in my fetch code if we are trying to request from a different server.
For example 
```
const req = document.querySelector('.req')
req.addEventListener('click',()=>{
  return fetch('https://jsonplaceholder.typicode.com/todos/1',{
    method:'GET'
  })
  .catch(...)
  .then(...)
  ...
```
From this code above, since we are trying to make a request from a different server, we can define the absolute path in our broser-side fetch code.

## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)

ANS:
We can create a service call on my local server, but in that service call, we can fetch the data from a different server with absolute url, just like encapsulation. Then when user make a request, it will still make a service call on my server, but fetch the data from a different server.

```
app.get('/api/data', (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  })
  .then( data => {
    res.json( data );
  });
});
```
## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

```
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```

ANS: 
User request to `'/page/start'`, `'/page/start'` responses, then redirect to `'/page/end'`, then `'/page/end'` responses `Hello World`.

The user will see `Hello World`, page will redirect from `http://localhost:3000/page/start` to `http://localhost:3000/page/end`

## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?

ANS:
We attach the cookie in the request header when we send request to server.
If request does not contain cookie, then server will know this and send 'login request' to the client side if this request is trying get some information about account.
If request contain cookie, then server will take the information from the attached cookie and check with the Session on the server side. if the user is valid, then the server know who is trying to send request and how to make a response based on this request, but if the information does not match any thing in the Session, server will also determine this case, and send 'login request' to the client side.

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?

ANS: 
From the side of programmers, a working code does not mean that the developers do undertande the principle of code, developers may use the online resources and simplely copy and paste to make the code works. Also, instead of focusing on making code to work, programmer should also take care of the meaningful variable name, good coding structure, understandable comments, and SOC. 
If the working code from promgrammers who has those properties, then we can the code is a good code.

From the side of code, the most of programmers are not debug and maintain the code they wrote. If a code makes programmers or testers easy to understand and owns those properties, such as SOC, decoupling, reasonable variable name, good structure, and good comments, we can claim this code is a good code.



