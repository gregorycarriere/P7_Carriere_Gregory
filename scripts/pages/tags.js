import { researchTags, searchInput } from "./input-bar.js";
import { matchedRecipes } from "./input-bar.js";

export const srcIng = document.getElementById('box-ing');
export const srcApp = document.getElementById('box-app');
export const srcUst = document.getElementById('box-ust');
export const srcBox = document.querySelectorAll('.search-box');
export const inputIngredient = document.getElementById('input-ing');
export const inputAppliances = document.getElementById('input-app');
export const inputUstensils = document.getElementById('input-ust');
export const boxInput = document.querySelectorAll('.input-box');
export const listIngredients = document.getElementById('list-ing');
export const listAppliances = document.getElementById('list-app');
export const listUstensils = document.getElementById('list-ust');
export const listTri = document.querySelectorAll('.list-box');

// const itemList = document.querySelectorAll('.item-list');


export const tagsBox = document.getElementById('search-tags');

export var matchedTagsRecipes = [];
export var selectedTags = [];

inputIngredient.addEventListener('keyup', function(){
    var inputNb = inputIngredient.value.length;
    let searchQuery = inputIngredient.value.toLowerCase();

    if(inputNb >= 3){
        listIngredients.childNodes.forEach(child => {
            if(child.innerText.includes(searchQuery)){
                child.classList.add('tags-used');
            }else{
                child.classList.remove('tags-used');
            }
        })

    }else{
        listIngredients.childNodes.forEach(child => {
            
            child.classList.remove('tags-used');
            
        })
    }
})




srcBox.forEach((src) => {
    src.addEventListener("click", function(){
        if(src.getAttribute("checked") === "false"){
            src.setAttribute("checked", "true");
            switch(src.getAttribute("id")){
                case 'box-ing' :
                    listIngredients.style.display = "flex";
                    inputIngredient.setAttribute('placeholder','Rechercher un ingrédient');
                    inputIngredient.setAttribute('value','');     
                    inputIngredient.style.width = "auto";   
                    break;
                
                case 'box-app' :
                    listAppliances.style.display = "flex";
                    inputAppliances.setAttribute('placeholder','Rechercher un appareil');
                    inputAppliances.setAttribute('value','');
                    inputAppliances.style.width = "auto";
                    break;

                case 'box-ust' :
                    listUstensils.style.display = "flex";
                    inputUstensils.setAttribute('placeholder','Rechercher un ustensil');
                    inputUstensils.setAttribute('value','');
                    inputUstensils.style.width = "auto";
                    break;
            }
        }else{
            src.setAttribute("checked", "false");
            switch(src.getAttribute("id")){
                case 'box-ing' :
                    listIngredients.style.display = "none";
                    inputIngredient.setAttribute('value','Ingrédients');
                    inputIngredient.style.width = "130px";   
                    break;
                
                case 'box-app' :
                    listAppliances.style.display = "none";
                    inputAppliances.setAttribute('value','Appareils');
                    inputAppliances.style.width = "130px";
                    break;

                case 'box-ust' :
                    listUstensils.style.display = "none";
                    inputUstensils.setAttribute('value','Ustensils');
                    inputUstensils.style.width = "130px";
                    break;
            }

        }
        
    })
});

function closeTagsEvent(){
    const closeTags = document.querySelectorAll('.close-tags');
    console.log(selectedTags);
    closeTags.forEach((btn) => {
        btn.addEventListener("click", function(){
    
            let itemToDel = btn.previousSibling.innerText;
            console.log(itemToDel);

            let index = selectedTags.indexOf(itemToDel);
            console.log(index);


            selectedTags.splice(index,1);
            
            console.log(selectedTags);

            listIngredients.childNodes.forEach(child => {
                if(child.innerText == itemToDel){
                    child.classList.remove('tags-used');
                }
            })

            listAppliances.childNodes.forEach(child => {
                if(child.innerText == itemToDel){
                    child.classList.remove('tags-used');
                }
            })

            listUstensils.childNodes.forEach(child => {
                if(child.innerText == itemToDel){
                    child.classList.remove('tags-used');
                }
            })

            tagsBox.childNodes.forEach(child => {
                if(child.innerText == itemToDel){
                    tagsBox.removeChild(child);
                }
            })

            researchTags(matchedRecipes);
        })
    })
}




class Tags {
    constructor(id, info) {
        this.type = id;
        this.name = info;
    }
}

export function tagSelection(recipes){
    console.log(recipes);

    if (matchedRecipes.length < 1){
        recipes.forEach((recipe) => {
            matchedRecipes.push(recipe);
        })
    }

    console.log(matchedRecipes);
    listTri.forEach((list) => {
        list.addEventListener("click", function(event){
            const newTag = document.createElement("div");
            const name = document.createElement("label");
            name.innerText = event.target.innerText;
            const closeTag = document.createElement("img");
            closeTag.setAttribute("src","assets/close.svg");
            closeTag.classList.add("close-tags");

            switch(list.id){
                case 'list-ing' :
                    
                    newTag.classList.add("ing-tags","box-tags");
                    
                    newTag.appendChild(name);
                    newTag.appendChild(closeTag);
                    tagsBox.appendChild(newTag);

                    var tags = new Tags("ing", event.target.innerText);
                    selectedTags.push(tags);
                    
                    
                    researchTags(matchedRecipes);

                    closeTagsEvent();

                    listIngredients.childNodes.forEach(child => {
                        if(child.innerText == event.target.innerText){
                            child.classList.add('tags-used');
                        }
                    })
                break;

                case 'list-app' :
                    newTag.classList.add("app-tags","box-tags");
                    
                    newTag.appendChild(name);
                    newTag.appendChild(closeTag);
                    tagsBox.appendChild(newTag);

                    var tags = new Tags("app", event.target.innerText);
                    selectedTags.push(tags);
                    
                    
                    researchTags(matchedRecipes);

                    closeTagsEvent();

                    listAppliances.childNodes.forEach(child => {
                        if(child.innerText == event.target.innerText){
                            child.classList.add('tags-used');
                        }
                    })
                break;

                case 'list-ust' :
                    newTag.classList.add("ust-tags","box-tags");
                    
                    newTag.appendChild(name);
                    newTag.appendChild(closeTag);
                    tagsBox.appendChild(newTag);

                    var tags = new Tags("ust", event.target.innerText);
                    selectedTags.push(tags);
                    
                    
                    researchTags(matchedRecipes);

                    closeTagsEvent();

                    listUstensils.childNodes.forEach(child => {
                        if(child.innerText == event.target.innerText){
                            child.classList.add('tags-used');
                        }
                    })
                break;

            }
        })
    })
    
    
}


