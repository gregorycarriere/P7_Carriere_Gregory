import  recipeFactory from "../factories/recipes.js"

const getRecipes = async() => {
    return await fetch('data/recipes.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.recipes })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

async function displayRecipes(recipes) {
    const recipeSection = document.getElementById("recipes-list");
    console.log("test");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCard();
        recipeSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    const recipesList = await getRecipes();
    displayRecipes(recipesList);
}
    
init();