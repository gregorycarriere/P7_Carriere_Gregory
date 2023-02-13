import recipeFactory from "../factories/recipes.js";
import { tagSelection} from "./tags.js";

import {listIngredients, listAppliances, listUstensils} from "./tags.js";


export { getIngredients, getAppliances, getUstensils, setIngredientsList, setApplianceList, setUstensilsList};


export const recipeSection = document.getElementById("recipes-list");

export let recipesData = [];


var ingredientsDataList = [];
var appliancesDataList = [];
var ustensilsDataList = [];


function getIngredients(data) {

    var stockTempI = [];
    data.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            stockTempI.push(ingredient.ingredient.toLowerCase());
        })
    })

    ingredientsDataList = stockTempI.filter( (ele,pos)=>stockTempI.indexOf(ele) == pos);
    ingredientsDataList.sort();
}

function getAppliances(data) {

    var stockTempA = [];
    data.forEach((recipe) => {
        stockTempA.push(recipe.appliance.toLowerCase());
    })

    appliancesDataList = stockTempA.filter( (ele,pos)=>stockTempA.indexOf(ele) == pos);
    appliancesDataList.sort();
}

function getUstensils(data) {

    var stockTempU = [];
    data.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            stockTempU.push(ustensil.toLowerCase());
        })
    })

    ustensilsDataList = stockTempU.filter( (ele,pos)=>stockTempU.indexOf(ele) == pos);
    ustensilsDataList.sort();
}

function setIngredientsList(){
    listIngredients.innerHTML = "";
    ingredientsDataList.forEach((ing) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = ing.charAt(0).toUpperCase() + ing.slice(1);
        listIngredients.appendChild(items);
    })
}

function setApplianceList(){
    listAppliances.innerHTML = "";
    appliancesDataList.forEach((app) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = app.charAt(0).toUpperCase() + app.slice(1);
        listAppliances.appendChild(items);
    })
}

function setUstensilsList(){
    listUstensils.innerHTML = "";
    ustensilsDataList.forEach((ust) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.textContent = ust.charAt(0).toUpperCase() + ust.slice(1);
        listUstensils.appendChild(items);
    })
}



const getRecipes = async() => {
    return await fetch('data/recipes.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.recipes })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

export function displayRecipes(recipes) {
    
    recipeSection.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCard();
        recipeSection.appendChild(recipeCardDOM);
    });
}


async function start() {
    recipesData = await getRecipes();

    init()
}

function init() {
    

    getIngredients(recipesData);
    getAppliances(recipesData);
    getUstensils(recipesData);

    setIngredientsList();
    setApplianceList();
    setUstensilsList();

    displayRecipes(recipesData);


    tagSelection(recipesData);
    
}

start();