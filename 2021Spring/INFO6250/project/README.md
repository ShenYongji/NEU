# Online Thrift Shop
Author: [Yongji Shen](https://github.com/ShenYongji) 
<br />

## Object

The purpose of this application is to help students to post their person items if they want to sell it or buy from other students.

## Built with

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)

## Getting Started

1. Install NPM packages
```sh
    npm install
```
2. Build static files
```sh
    npm run build
```
3. Deploy this project on `http://localhost:X000/`
```sh
    npm start
    (remember to `node server.js` on other Terminal)
    Application launches on `http://localhost:3000/`
    
    or

    npm run serve
    Application launches on `http://localhost:5000/`
```

## Usage

### 1. View Posts
When project launches on `http://localhost:5000/`, users are able to see a list of posts in the database (could display <b>NO DATA</b> if no posts in the database)
User are able to check the details of each posts, but they have to log in to see the phone and emaill addres for the author of post.
User who already logged in are able to save or remove posts by clicking <b>Add to my favourite</b> or <b>Remove from my favourite</b> 
The selling post will be wrapped as blue, the buying post will be wrapped as red.

### 2. Add Posts
Logged in users are able to add new post to our database, but users have to enter the correct format of information.

For example: 

The correct format of phone number are 1234567890, (123)456-7890,or 123-345-3456

### 3. Login & Logout
Users are able to login and logout here.
Logged in users can view their likes and histories at this page.



## Outside Images/Media
http://www.w3.org/2000/svg

SVG for 'ADD'
<br/>
<img src="./src/svg/add.svg" alt="add" width="50"/>
<br/>
SVG for 'HOME'
<br/>
<img src="./src/svg/home.svg" alt="home" width="50"/>
<br/>
SVG for 'User'
<br/>
<img src="./src/svg/user.svg" alt="user" width="50"/>
<br/>
SVG for 'NEU LOGO'
<br/>
<img src="./src/svg/neulogo.svg" alt="neulogo" width="50"/>
<br/>
SVG for 'Unknown Person'
<br/>
<img src="./src/svg/unknown.svg" alt="unknown" width="50"/>
<br/>