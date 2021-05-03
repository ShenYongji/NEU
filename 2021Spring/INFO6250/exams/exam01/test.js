function first(){
    console.log("first")
}

function second(callback){
    callback()
}


// function example(){
//     this.a = function(){console.log("a")}
// }
// function purr(){
//     console.log("purr");
// }
// let e1 = new example();
// console.log(e1.a)
// console.log(e1.purr)
// example.prototype.purr = function(){console.log("purr")};
// console.log(e1.a)
// console.log(e1.purr)

//Constructor Function
const Example = function(location){
    this.location =  location
 }
 Example.prototype.purr = function(){console.log(`This is purr function in ${this.location}`)}
 const e1 = new Example("e1");
 e1.purr()


const example2 = {
     hiss: function(){
         console.log(`hiss function in ${this.location}`)
     }
 }
 const e2 = Object.create(example2)
 e2.location = 'e2'
 e2.hiss()