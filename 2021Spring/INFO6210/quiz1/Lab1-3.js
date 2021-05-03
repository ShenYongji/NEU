const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbYS:11111@cluster0.frvi4.mongodb.net/Lab1-Part3?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

var list = [
    {TerritoryID: 4, TerritoryName: "Southwest",State:"Arizona"},
    {TerritoryID: 4, TerritoryName: "Southwest",State:"California"},
    {TerritoryID: 4, TerritoryName: "Southwest",State:"Guam"},
    {TerritoryID: 4, TerritoryName: "Southwest",State:"New Mexico"},
    {TerritoryID: 4, TerritoryName: "Southwest",State:"Texas"},
];
client.connect(err => {
  const collection = client.db("Quiz1")
    collection.collection("SalesTerritory").insertMany(list,function (err,res){
        if (err) throw err;
        console.log("inserted");
        client.close();
      });   
});