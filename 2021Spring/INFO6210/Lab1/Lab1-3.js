const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbYS:11111@cluster0.frvi4.mongodb.net/Lab1-Part3?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

var list = [
    {SalesPersonsID: 274, LastName: "Jiang",FirstName:"Stephen",TotalOrderCount: 48},
    {SalesPersonsID: 275, LastName: "Blythe",FirstName:"Michael",TotalOrderCount: 450},
    {SalesPersonsID: 276, LastName: "Mitchell",FirstName:"Linda",TotalOrderCount: 418},
    {SalesPersonsID: 277, LastName: "Carson",FirstName:"Jillian",TotalOrderCount: 473},
    {SalesPersonsID: 278, LastName: "Vargas",FirstName:"Garrett",TotalOrderCount: 234},
    {SalesPersonsID: 279, LastName: "Reiter",FirstName:"Tsvi",TotalOrderCount: 429},
    {SalesPersonsID: 280, LastName: "Ansman-Wolfe",FirstName:"Pamela",TotalOrderCount: 95},
];
client.connect(err => {
  const collection = client.db("Lab1")
    collection.collection("Order").insertMany(list,function (err,res){
        if (err) throw err;
        console.log("inserted");
        client.close();
      });   
});