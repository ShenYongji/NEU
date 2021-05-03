// const students ={
//     "654321":{ id: "654321", name: "Bao", address: "123 Main Street" },
//     "123456":{ id: "123456", name: "Bao", address: "123 Main Street" },
// }



// const key_map = Object.keys(students).map(function(key, index) {

// });

// console.log(key_map)


// const steps = [
//     { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" },
//     { qty: "2/3 cup", ingredient: "bacon", instructions: "sprinkle over pizza"},
//     { instructions: "Bake 10 min. or until cheese is melted" }
// ]

// const steps_key = steps.map((key)=>{
//     return key
// })

// console.log(steps_key)

// console.log(steps[2])




// function Person (name, age) {
//     this.name = name
//     this.age = age
// }
// Person.prototype.getName = function(){
//     console.log(this.name)
// }

// function Career (name, age,jobtitle) {
//     Person.call(this, name, age)
//     this.jobtitle = jobtitle
// }

// function inheritPrototype(subType,superType) {
//     const prototype = Object.create(superType.prototype);  //创建对象
//     prototype.constructor = subType;  
//     subType.prototype = prototype;   
// }
// inheritPrototype(Career,Person);

// Career.prototype.getJob = function(){
//     console.log(this.jobtitle)
// }

// const teacher = new Career('A',25,'teacher');

// console.log(teacher.name)
// console.log(teacher.age)

// teacher.getName()
// teacher.getJob()


let username = undefined
console.log(!username)
console.log(username == undefined)
console.log(username === undefined)
username = null
console.log(!username)
console.log(username == undefined)
console.log(username === undefined)
username = 'undefined'
console.log(!username)
console.log(username == undefined)
console.log(username === undefined)