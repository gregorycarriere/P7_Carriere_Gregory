import recipeFactory from "../factories/recipes.js";
import {getIngredients, getAppliances, getUstensils, getNames } from "./input-bar.js";
import { ingredientsDataList, appliancesDataList, ustensilsDataList, namesDataList} from "./input-bar.js";




const recipeSection = document.getElementById("recipes-list");




const srcIng = document.getElementById('box-ing');
const srcApp = document.getElementById('box-app');
const srcUst = document.getElementById('box-ust');
const inputIngredient = document.getElementById('input-ing');
const inputAppliances = document.getElementById('input-app');
const inputUstensils = document.getElementById('input-ust');
const boxInput = document.querySelector('.input-box');
const listIngredients = document.getElementById('list-ing');
const listAppliances = document.getElementById('list-app');
const listUstensils = document.getElementById('list-ust');


export const getRecipes = async() => {
    return await fetch('data/recipes.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.recipes })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}


async function displayRecipes(recipes) {
    
    recipeSection.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCard();
        recipeSection.appendChild(recipeCardDOM);
    });
}


srcIng.addEventListener("click", function(){
    listIngredients.style.display = "flex";
    srcIng.style.width = "667px";
    srcIng.style.height = "397px";
    inputIngredient.setAttribute('value','');
    inputIngredient.setAttribute('placeholder','Rechercher un ingrédient');
    inputIngredient.style.width = "auto"
})

srcApp.addEventListener("click", function(){
    listAppliances.style.display = "flex";
    srcApp.style.width = "500px";
    srcApp.style.height = "auto";
    inputAppliances.setAttribute('value','');
    inputAppliances.setAttribute('placeholder','Rechercher un appareil');
    inputAppliances.style.width = "auto"
})

srcUst.addEventListener("click", function(){
    listUstensils.style.display = "flex";
    srcUst.style.width = "620px";
    srcUst.style.height = "auto";
    inputUstensils.setAttribute('value','');
    inputUstensils.setAttribute('placeholder','Rechercher un ustensil');
    inputUstensils.style.width = "auto"
})

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