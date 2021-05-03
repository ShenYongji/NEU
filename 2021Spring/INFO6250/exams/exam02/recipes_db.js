let recipes = { 
    "1": { 
      recipeId: "1",
      recipeAuthor:"Jessica",
      recipeTitle: "Chinese Fried Rice",
      recipeIngredients: "Leftover cold rice,Minced white onion,Diced carrots,sesame oil,Soy sauce,Salt and white pepper",
      recipeInstructions:"Fry the rice by lightly browning in a pan or wok.<br>Stir-fry the onions, garlic, and carrots until tender.<br>Make a large well in the center of the pan with the rice.<br>Pour in the whisked eggs and scramble until small curds form.<br>Soy sauce is optional but adds a savory flavor to the rice.<br>Add green peas at the end to retain color and shape."
    },

    "2": { 
        recipeId: "2",
        recipeAuthor:"SCOTTOSMAN",
        recipeTitle: "Simple White Cake",
        recipeIngredients: `1 cup white sugar <br>1/2 cup butter<br>2 eggs<br>2 teaspoons vanilla extract<br>1.5 cups all-purpose flour<br>1.5 teaspoons baking powder<br>1/2 cup milk`,
        recipeInstructions:`Step 1 <br>Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x9 inch pan or line a muffin pan with paper liners.<br>Step 2<br>In a medium bowl, cream together the sugar and butter. Beat in the eggs, one at a time, then stir in the vanilla. Combine flour and baking powder, add to the creamed mixture and mix well. Finally stir in the milk until batter is smooth. Pour or spoon batter into the prepared pan.<br>Step 3<br>Bake for 30 to 40 minutes in the preheated oven. For cupcakes, bake 20 to 25 minutes. Cake is done when it springs back to the touch.<br>`
    }
}

let curr_recipeId = 2;

function getcurrRecipeId(){
    return curr_recipeId
}

function updatecurrRecipeId(new_recipeId){
    curr_recipeId = new_recipeId
}

function getcurrRecipes(){
    return recipes
}
function updatecurrRecipe(new_recipes){
    recipes = new_recipes
}

const recipes_data = {
    getcurrRecipeId,
    updatecurrRecipeId,
    getcurrRecipes,
    updatecurrRecipe
}

module.exports = recipes_data;