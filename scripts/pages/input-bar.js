import { displayRecipes, recipeSection, recipesData} from "./index.js";
import {getIngredients, getAppliances, getUstensils, setIngredientsList, setApplianceList, setUstensilsList} from "./index.js";
import {inputIngredient, inputAppliances, inputUstensils, listIngredients, listAppliances, listUstensils, srcIng, srcApp, srcUst} from "./tags.js";
import { tagSelection, matchedTagsRecipes } from "./tags.js";
import { tagsBox, selectedTags } from "./tags.js";



const searchbar = document.getElementById('searchbar');


export function searchInput(recipes) {
    let searchQuery = searchbar.value.toLowerCase();
    recipeSection.innerHTML = "";
    let matchedRecipes = [];

    recipes.filter((recipe) => {

        if(recipe.ingredients.find(object => object.ingredient.toLowerCase().includes(searchQuery)) || recipe.name.toLowerCase().includes(searchQuery) || recipe.description.toLowerCase().includes(searchQuery)) {
            if(matchedRecipes.includes(recipe) === false){
                matchedRecipes.push(recipe);
            }
        }
    })

    if(matchedRecipes.length === 0){
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
    
    let matchedTagsRecipes = [];
    
    if(selectedTags.ing.length > 0 || selectedTags.app.length > 0 || selectedTags.ust.length > 0){
        console.log(matchedTagsRecipes);
        for(let i=0; selectedTags.ing.length > i; i++){
            if(matchedTagsRecipes.length <= 0){ 
                recipes.forEach(recipe => {
                    if(recipe.ingredients.some(object => object.ingredient.toLowerCase().includes(selectedTags.ing[i].toLowerCase()))){
                        matchedTagsRecipes.push(recipe);
                    }
                });

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
                
            }else{

                matchedTagsRecipes = matchedTagsRecipes.filter(matched => matched.ingredients.some(object => object.ingredient.toLowerCase().includes(selectedTags.ing[i].toLowerCase())));
                console.log(matchedTagsRecipes);

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
            }
        }
        
        for(let t=0; selectedTags.app.length > t; t++){
            if(matchedTagsRecipes.length <= 0){ 
                recipes.forEach(recipe => {
                    if(recipe.appliance.toLowerCase().includes(selectedTags.app[t].toLowerCase())){
                        matchedTagsRecipes.push(recipe);
                    }
                });

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
                
            }else{
                matchedTagsRecipes = matchedTagsRecipes.filter(matched => matched.appliance.toLowerCase().includes(selectedTags.app[t].toLowerCase()));

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
            }
        }

        for(let y=0; selectedTags.ust.length > y; y++){
            if(matchedTagsRecipes.length <= 0){ 
                recipes.forEach(recipe => {
                    if(recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedTags.ust[y].toLowerCase()))){
                        matchedTagsRecipes.push(recipe);
                    }
                });

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
                
            }else{
                matchedTagsRecipes = matchedTagsRecipes.filter(matched => matched.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedTags.ust[y].toLowerCase())));

                displayRecipes(matchedTagsRecipes);
                getAllList(matchedTagsRecipes);
            }
        }

    }else{
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
        let newRecipesFound = searchInput(recipesData);
        researchTags(newRecipesFound);

    }else{
        researchTags(recipesData)
    }
});


