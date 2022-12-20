import  recipeFactory from "../factories/recipes.js"

let ingredientsDataList = [];
let appliancesDataList = [];
let ustensilsDataList = [];
let namesDataList = [];

let recipesBox = [];
const recipeSection = document.getElementById("recipes-list");

const searchbar = document.getElementById('searchbar');


const srcIng = document.getElementById('search-ing');
const ingInput = document.getElementById('input-ing');
const listIng = document.getElementById('list-ing');


const getRecipes = async() => {
    return await fetch('data/recipes.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.recipes })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

function getIngredients(data) {

    var stockTempI = [];
    data.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            stockTempI.push(ingredient.ingredient.toLowerCase());
        })
    })

    ingredientsDataList = stockTempI.filter( (ele,pos)=>stockTempI.indexOf(ele) == pos);

    console.log(ingredientsDataList);
}

function getAppliances(data) {

    var stockTempA = [];
    data.forEach((recipe) => {
        stockTempA.push(recipe.appliance.toLowerCase());
    })

    appliancesDataList = stockTempA.filter( (ele,pos)=>stockTempA.indexOf(ele) == pos);

    console.log(appliancesDataList);
}

function getUstensils(data) {

    var stockTempU = [];
    data.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            stockTempU.push(ustensil.toLowerCase());
        })
    })

    ustensilsDataList = stockTempU.filter( (ele,pos)=>stockTempU.indexOf(ele) == pos);

    console.log(ustensilsDataList);
}

function getNames(data) {
    data.forEach((recipe) => {
        namesDataList.push(recipe.name.toLowerCase());
    })

    console.log(namesDataList);
}

async function displayRecipes(recipes) {
    
    recipeSection.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCard();
        recipeSection.appendChild(recipeCardDOM);
    });
}


// srcIng.addEventListener("click", function(){
//     listIng.style.display = "flex";
    
// })

searchbar.addEventListener('keyup', function(){
    let searchQuery = searchbar.value.toLowerCase();
    console.log(searchQuery);

    if(searchQuery.length >= 3){
        // console.log("test");

        ingredientsDataList.forEach((ingredient) => {
            if(ingredient.includes(searchQuery)){
                console.log(ingredient);
            }
        })
        appliancesDataList.forEach((appliance) => {
            if(appliance.includes(searchQuery)){
                console.log(appliance);
            }
        })
        ustensilsDataList.forEach((ustensil) => {
            if(ustensil.includes(searchQuery)){
                console.log(ustensil);
            }
        })
        namesDataList.forEach((name) => {
            if(name.includes(searchQuery)){
                console.log(name);
            }
        })
    }
})


async function init() {
    const recipesData = await getRecipes();

    getIngredients(recipesData);
    getAppliances(recipesData);
    getUstensils(recipesData);
    getNames(recipesData);


    displayRecipes(recipesData);
}
    
init();