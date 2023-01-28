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


export const tagsBox = document.getElementById('search-tags');

export const itemsList = document.querySelectorAll(".item-list");
export var selectedTags = [];

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

function Tags(id, info) {
    this.list = id;
    this.name = info;
}

export function tagSelection(){
    

    listTri.forEach((list) => {
        list.addEventListener("click", function(event){

            switch(list.id){
                case 'list-ing' :
                    const newTag = document.createElement("div");
                    newTag.classList.add("ing-tags","box-tags");
                    const name = document.createElement("label");
                    name.innerText = event.target.innerText;
                    const closeTag = document.createElement("img");
                    closeTag.setAttribute("src","assets/close.svg");
                    closeTag.classList.add("close-tags");
                    newTag.appendChild(name);
                    newTag.appendChild(closeTag);
                    tagsBox.appendChild(newTag);

                    const tags = new Tags("ing", event.target.innerText);
                    selectedTags.push(tags);

                    
                    console.log(selectedTags);
                    
                    // listIngredients.removeChild(event.target);
                    // console.log(event.target);

                    searchInput(matchedRecipes);
                    break;

            }
        })
    })
    
    
}


