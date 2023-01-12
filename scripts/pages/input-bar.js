import { displayRecipes, recipeSection } from "./index.js";


export { getIngredients, getAppliances, getUstensils, getNames};



export let ingredientsDataList = [];
export let appliancesDataList = [];
export let ustensilsDataList = [];
export let namesDataList = [];

const searchbar = document.getElementById('searchbar');

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
}

function getAppliances(data) {

    var stockTempA = [];
    data.forEach((recipe) => {
        stockTempA.push(recipe.appliance.toLowerCase());
    })

    appliancesDataList = stockTempA.filter( (ele,pos)=>stockTempA.indexOf(ele) == pos);
}

function getUstensils(data) {

    var stockTempU = [];
    data.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            stockTempU.push(ustensil.toLowerCase());
        })
    })

    ustensilsDataList = stockTempU.filter( (ele,pos)=>stockTempU.indexOf(ele) == pos);
}

function getNames(data) {
    data.forEach((recipe) => {
        namesDataList.push(recipe.name.toLowerCase());
    })
}



function hasIngredient(recipe, tag){
    if (recipe.ingredients.find(object => object.ingredient.includes(tag.toLowerCase()))){
        return true
    }else{
        return false
    }
}

function searchInput(recipes) {
    let searchQuery = searchbar.value.toLowerCase();
    let result = [];
    let matchedRecipes = [];
    
    result = result.concat(recipes.filter(recipe => hasIngredient(recipe, searchQuery)));

    result = result.concat(recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery)));
    
    result = result.concat(recipes.filter(recipe => recipe.appliance.toLowerCase().includes(searchQuery)));

    result = result.concat(recipes.filter(recipe => recipe.ustensils.toString().toLowerCase().includes(searchQuery)));

    let set = new Set(result);
    matchedRecipes = Array.from(set);

    if(result.length == 0){
        const notFound = document.createElement("p");
        notFound.classList.add('notFound');
        notFound.innerText = "Aucune recette ne correspond à votre recherche ...";

        recipeSection.innerHTML = "";
        recipeSection.appendChild(notFound);
    }else{
    
        displayRecipes(matchedRecipes);
    }

    
}



async function init(){
    const recipesData = await getRecipes();

    searchbar.addEventListener('keyup', function(){
        var inputNb = searchbar.value.length;
        
        if(inputNb >= 3){
            
            searchInput(recipesData);
            
        }else{
            displayRecipes(recipesData);
        }
    })
}

init();