const express = require('express');
const app = express();
const PORT = 5000;
const catfacts = require('./Catfacts.json')

app.use(express.static('./build'));

// app.get('/api/test',(req,res)=>{
//     res.send('work')
// })

app.get('/catfacts',express.json(),(req,res)=>{
    setTimeout(()=>{
        res.json(catfacts);
    }
    ,5000)
})


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));