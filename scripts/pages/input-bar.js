import { displayRecipes, recipeSection, recipesData} from "./index.js";
import {getIngredients, getAppliances, getUstensils, setIngredientsList, setApplianceList, setUstensilsList} from "./index.js";
import {inputIngredient, inputAppliances, inputUstensils, listIngredients, listAppliances, listUstensils, srcIng, srcApp, srcUst} from "./tags.js";
import { tagSelection, matchedTagsRecipes } from "./tags.js";
import { tagsBox, selectedTags } from "./tags.js";





export var matchedRecipes = [];



const searchbar = document.getElementById('searchbar');


export function searchInput(recipes) {
    let searchQuery = searchbar.value.toLowerCase();
    recipeSection.innerHTML = "";
    matchedRecipes = [];

    recipes.filter((recipe) => {

        if(recipe.ingredients.find(object => object.ingredient.toLowerCase().includes(searchQuery)) || recipe.name.toLowerCase().includes(searchQuery) || recipe.description.toLowerCase().includes(searchQuery)) {
            if(matchedRecipes.includes(recipe) === false){
                matchedRecipes.push(recipe);
            }
        }
    })

    console.log(recipes);
    console.log(matchedRecipes);

    // if(matchedRecipes.length === 0){
    //     researchTags(recipes);
    // }else{
    //     researchTags(matchedRecipes);
    // }
    

    if(matchedRecipes.length === 0 || recipes.length == matchedRecipes.length){
        const notFound = document.createElement("p");
        notFound.classList.add('notFound');
        notFound.innerText = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";

        recipeSection.innerHTML = "";
        recipeSection.appendChild(notFound);
    }else{
        displayRecipes(matchedRecipes);
        getAllList(matchedRecipes);
    }

    return matchedRecipes;
}

export function researchTags(recipes){
    console.log(recipes);
    console.log(selectedTags);
    // if(matchedRecipes.length != 0){
    //     matchedRecipes.splice(0, matchedRecipes.length);
    // }
    if(selectedTags.length > 0 ){
        selectedTags.forEach(tag => {
            recipes.filter(recipe => {
                if((tag.type === "ing" && recipe.ingredients.some(object => object.ingredient.toLowerCase().includes(tag.name.toLowerCase())) ||
                tag.type === "app" && recipe.appliance.toLowerCase() === tag.name.toLowerCase() ||
                tag.type === "ust" && recipe.ustensils.some(ust => ust.toLowerCase() === tag.name.toLowerCase())) && 
                matchedTagsRecipes.includes(recipe) !== true){

                    matchedTagsRecipes.push(recipe);
                    
                }
                
            });
        });
        

        displayRecipes(matchedTagsRecipes);
        getAllList(matchedTagsRecipes);
        
        
    }else{
        matchedTagsRecipes.splice(0,matchedTagsRecipes.length);
        displayRecipes(recipes);
        getAllList(recipes);
    }

    
}



function getAllList(CurrData){
    getIngredients(CurrData);
    getAppliances(CurrData);
    getUstensils(CurrData);

    setIngredientsList();
    setApplianceList();
    setUstensilsList();
}

searchbar.addEventListener('keyup', function(){
    var inputNb = searchbar.value.length;
    
    if(inputNb >= 3){
        searchInput(recipesData);

    }else{
        displayRecipes(recipesData);
        getAllList(recipesData);
    }
});


