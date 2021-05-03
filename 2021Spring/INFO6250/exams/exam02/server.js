const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const recipes_data = require("./recipes_db");
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

const sessions = {}

app.get('/initPage',express.json(),(req,res)=>{
    const sid = req.cookies.sid

    if (!sid || !sessions[sid]){
        res.status(200).json({recipes_list:recipes_data.getcurrRecipes()})
        return
    }

    const username = sessions[sid]

    res.status(200).json({username,recipes_list:recipes_data.getcurrRecipes()})
})

app.get(`/Recipes/:recipeId`,(req,res)=>{
    const recipeId = req.params.recipeId
    let curr_Recipes = recipes_data.getcurrRecipes()

    if(!recipeId || !curr_Recipes[recipeId]){
        res.status(404).json({error:"missing-id"})
        return
    }

    //console.log(curr_Recipes[recipeId])
    res.status(200).json(curr_Recipes[recipeId])
})

app.post('/Recipes',express.json(),(req,res)=>{
    const sid = req.cookies.sid

    if(!sid||!sessions[sid]){
        res.status(401).json({error:"login-required"})
        return
    }

    const recipeAuthor = sessions[sid]

    let {recipeTitle,recipeIngredients,recipeInstructions} = req.body
    if(!recipeTitle.trim()||!recipeIngredients.trim()|| !recipeInstructions.trim()){
        res.status(401).json({error:"missing-information"})
        return
    }

    recipeTitle = recipeTitle.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`)
    recipeIngredients= recipeIngredients.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`).replace(/\n/g,'<br>')
    recipeInstructions = recipeInstructions.trim().replace(/&/g,`&amp;`).replace(/>/g,`&gt;`).replace(/</g,`&lt;`).replace(/\n/g,'<br>')
    let curr_RecipeId = recipes_data.getcurrRecipeId() + 1
    let curr_Recipes= recipes_data.getcurrRecipes()
    curr_Recipes[curr_RecipeId.toString()] = {
        recipeId:curr_RecipeId.toString(),
        recipeTitle,
        recipeAuthor,
        recipeIngredients,
        recipeInstructions
    }
    recipes_data.updatecurrRecipeId(curr_RecipeId)
    recipes_data.updatecurrRecipe(curr_Recipes)
    res.status(200).json({new_item:{recipeId:curr_RecipeId.toString(),recipeTitle,recipeAuthor,recipeIngredients,recipeInstructions},recipes_list:recipes_data.getcurrRecipes()})

})


app.post('/login',express.json(),(req,res)=>{
    const {username} = req.body
    //console.log(username)
    if(!username || !username.trim()){
        res.status(401).json({error:"missing-name"})
        return
    }

    if(!(/^[A-Za-z0-9_]+$/g).test(username)){
        res.status(401).json({error:"invalid-name"})
        return
    }

    if(username.toUpperCase() === 'DOG'){
        res.status(401).json({error:"no-dog"})
        return
    }
    

    const sid = uuid()
    sessions[sid] = username
    res.cookie('sid', sid);

    res.status(200).json({username,recipes_list:recipes_data.getcurrRecipes()})
})

app.post('/logout',express.json(),(req,res)=>{
    const sid = req.cookies.sid
    if (!sid||!sessions[sid]){
        //console.log('please login')
        res.status(401).json({ error: 'login-required'});
        return;
    }
    delete sessions[sid]
    res.clearCookie('sid');
    res.status(200).json({recipes_list:recipes_data.getcurrRecipes()})
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

