# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
      Static asset will not change the content from server to user, but dynamic asset will display different contents by different data from user.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
        Absolute file path is the full address to access a file on the same server, it will contain the root element and the complete directort to locate a file (Start with "/").

        Relative file path is based on navigation from the path of the currently loaded file (Start without "/").

        The webserver root/document root is the folder that is stored all files (web pages, css, or some related material) on the host server. The absolute path will start the document root to access a file on the same server, the relative paths will start the path of the currently loaded file.

## Q: What is the difference between server-side and client-side JS?
        Server-side JS is the JavaScript code runs on the server. Users cannot see the actual code because all JS code on the server, users only can see the output that respond from server. Server-side JS provides more security for data.
        Client-side JS is the JavaScript code runs on the users' computer/web browser. client-side JS is visiable to all users, and it takes less time to response, but less security.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
        `var` is a function scoped, `var` can be updated and re-declared.
        `const` is a block scoped, `const` cannot be updated and re-declared.
        `let` is a block scoped, `let` can be updated but cannot be re-declared.

        `var` should not use except for old JS enginer, `let` is usually using in the for loop or the variable may be updated in the furture developing, and the rest of cases should use `const` such as constant variable.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
        1. Using Brute Force prototype assignment
        2. Using Object.create()
        3. Using class in ES6
        4. Constructor Function

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
        - Code
        //Constructor Function
        const Example = function(name){
           this.name =  name
        }
        example.prototype.purr = function(){console.log(`This is purr function in ${this.name}`)}
        const e1 = new example("e1");
        e1.purr()
        - Output
        yongjishen@Yongjis-MacBook-Pro exam01 % node test.js
        This is purr function in e1

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
        - Code
        //Object.create()
        const example2 = {
                hiss: function(){
                console.log(`hiss function in ${this.location}`)
                }       
        }
        const e2 = Object.create(example2)
        e2.location = 'e2'
        e2.hiss()
        - Output
        yongjishen@Yongjis-MacBook-Pro exam01 % node test.js
        hiss function in e2

## Q: Explain what a callback is, and give an example.
        Callback function is a function that passed into another function as an argument to be executed later.
        - Code
        function first(){
            console.log("first")
        }
        function alertcallback(callback){
             callback()
        }
        alertcallback(first);
        - Output
        yongjishen@Yongjis-MacBook-Pro exam01 % node test.js
        first

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `unbound`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
        should name class name as what it is, not what it looks like.
        such as you have a header in red, you should not do <h1 class="redheader">header</h1>, because you may chande this style during future developing, and the naming may not make any sense in the future.

        well name: <h1 class="title"> This is the title of this page</h1>
        .title{
             color: green;   
        }
        poorly name: <p class="red"> red sentence</p>
        .red {
           color: green;
        }
