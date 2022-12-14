import recipeFactory from "../factories/recipes.js";
import {getIngredients, getAppliances, getUstensils, getNames } from "./input-bar.js";
import { ingredientsDataList, appliancesDataList, ustensilsDataList, namesDataList} from "./input-bar.js";
import {inputIngredient, inputAppliances, inputUstensils, listIngredients, listAppliances, listUstensils, srcIng, srcApp, srcUst} from "./tags.js";



const recipeSection = document.getElementById("recipes-list");


export const getRecipes = async() => {
    return await fetch('data/recipes.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.recipes })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}


async function displayRecipes(recipes) {
    
    recipeSection.innerHTML = "";
    
    // function test(arr,el){
    //     return arr.filter(el => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1 );  
    // }  
    
    
    // console.log(test); 

    // ((recipe) => recipe.name.toLowerCase().includes("coco"));

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCard();
        recipeSection.appendChild(recipeCardDOM);
    });
}


function setIngredientsList(){
    ingredientsDataList.forEach((ing) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = ing.charAt(0).toUpperCase() + ing.slice(1);
        listIngredients.appendChild(items);
    })
}

function setApplianceList(){
    appliancesDataList.forEach((app) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = app.charAt(0).toUpperCase() + app.slice(1);
        listAppliances.appendChild(items);
    })
}

function setUstensilsList(){
    ustensilsDataList.forEach((ust) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = ust.charAt(0).toUpperCase() + ust.slice(1);
        listUstensils.appendChild(items);
    })
}

async function init() {
    const recipesData = await getRecipes();

    getIngredients(recipesData);
    getAppliances(recipesData);
    getUstensils(recipesData);
    getNames(recipesData);

    setIngredientsList();
    setApplianceList();
    setUstensilsList();

    displayRecipes(recipesData);
}
    
init();