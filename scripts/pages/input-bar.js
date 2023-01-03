export { getIngredients, getAppliances, getUstensils, getNames};

let recipesBox = [];

export let ingredientsDataList = [];
export let appliancesDataList = [];
export let ustensilsDataList = [];
export let namesDataList = [];

let ingredientsSearch = [];
let appliancesSearch = [];
let ustensilsSearch = [];
let namesSearch = [];

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

searchbar.addEventListener('keyup', function(){
    // let searchQuery = searchbar.value.toLowerCase();
    let searchQuery = "coco";
    console.log(searchQuery);

    if(searchQuery.length >= 3){
        
        

        
    }
})



function researchInput(data,input) {

    const result = [];
    let searchQuery = "coco";

    ingredientsDataList.forEach((ingredient) => {
        if(ingredient.includes(searchQuery)){
            ingredientsSearch.push(ingredient);
        }
    })
    appliancesDataList.forEach((appliance) => {
        if(appliance.includes(searchQuery)){
            appliancesSearch.push(appliance);
        }
    })
    ustensilsDataList.forEach((ustensil) => {
        if(ustensil.includes(searchQuery)){
            ustensilsSearch.push(ustensil);
        }
    })
    namesDataList.forEach((name) => {
        if(name.includes(searchQuery)){
            namesSearch.push(name);
        }
    })


    for(let i=0; i < ingredientsSearch.length; i++){

        console.log(ingredientsSearch[i]);
    }
    
    // console.log("test");
    // console.log(result);
}


async function init(){
    const recipesData = await getRecipes();
}

init();