import { displayRecipes, recipeSection, recipesData} from "./index.js";
import {getIngredients, getAppliances, getUstensils, setIngredientsList, setApplianceList, setUstensilsList} from "./index.js";
import {inputIngredient, inputAppliances, inputUstensils, listIngredients, listAppliances, listUstensils, srcIng, srcApp, srcUst} from "./tags.js";
import { tagSelection } from "./tags.js";
import { itemsList, tagsBox, selectedTags } from "./tags.js";





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

    if(matchedRecipes.length === 0){
        researchTags(recipes);
    }else{
        researchTags(matchedRecipes);
    }
    

    

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

    
}

export function researchTags(UpdatesList){
    console.log(UpdatesList);
    console.log(selectedTags);
        if(selectedTags.length > 0 ){
            selectedTags.forEach((tag) => {
                switch(tag.list){
                    case 'ing': 
                        console.log("test");
                        UpdatesList.filter((recipe) => {
                            if(recipe.ingredients.find(object => object.ingredient.toLowerCase().includes(tag.name))){
                                if(matchedRecipes.includes(recipe) === false){
                                    matchedRecipes.push(recipe);
                                }
                            }
                        });
                        displayRecipes(matchedRecipes);
                        getAllList(matchedRecipes);
                        break;
                }
            })
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


