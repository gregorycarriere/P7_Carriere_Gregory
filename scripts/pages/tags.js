import { researchTags, searchInput } from "./input-bar.js";

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

export var matchedTagsRecipes = [];
export var selectedTags = {'ing':[], 'app':[], 'ust':[]}



inputIngredient.addEventListener('keyup', function(){
    var inputNb = inputIngredient.value.length;
    let searchQuery = inputIngredient.value.toLowerCase();

    if(inputNb > 0){
        listIngredients.childNodes.forEach(child => {
            if(!child.innerText.toLowerCase().includes(searchQuery)){
                child.classList.add('hide-tags');
            }else{
                child.classList.remove('hide-tags');
            }
        }) 
    }else{
        listIngredients.childNodes.forEach(child => {
            child.classList.remove('hide-tags');
        })
    } 
});

inputAppliances.addEventListener('keyup', function(){
    var inputNb = inputAppliances.value.length;
    let searchQuery = inputAppliances.value.toLowerCase();

    if(inputNb > 0){
        listAppliances.childNodes.forEach(child => {
            if(!child.innerText.toLowerCase().includes(searchQuery)){
                child.classList.add('hide-tags');
            }else{
                child.classList.remove('hide-tags');
            }
        }) 
    }else{
        listAppliances.childNodes.forEach(child => {
            child.classList.remove('hide-tags');
        })
    } 
});

inputUstensils.addEventListener('keyup', function(){
    var inputNb = inputUstensils.value.length;
    let searchQuery = inputUstensils.value.toLowerCase();

    if(inputNb > 0){
        listUstensils.childNodes.forEach(child => {
            if(!child.innerText.toLowerCase().includes(searchQuery)){
                child.classList.add('hide-tags');
            }else{
                child.classList.remove('hide-tags');
            }
        }) 
    }else{
        listUstensils.childNodes.forEach(child => {
            child.classList.remove('hide-tags');
        })
    } 
});



srcIng.addEventListener('focusin', function(){
    listIngredients.style.display = "flex";
    inputIngredient.setAttribute('placeholder','Rechercher un ingrédient');
    inputIngredient.setAttribute('value','');     
    inputIngredient.style.width = "auto";
});
srcIng.addEventListener('focusout', function(){
    srcIng.reset();
    listIngredients.style.display = "none";
    inputIngredient.setAttribute('placeholder','');
    inputIngredient.setAttribute('value','Ingrédients');
    inputIngredient.style.width = "130px";
});

srcApp.addEventListener('focusin', function(){
    listAppliances.style.display = "flex";
    inputAppliances.setAttribute('placeholder','Rechercher un appareil');
    inputAppliances.setAttribute('value','');
    inputAppliances.style.width = "auto";
});
srcApp.addEventListener('focusout', function(){
    srcApp.reset();
    listAppliances.style.display = "none";
    inputAppliances.setAttribute('placeholder','');
    inputAppliances.setAttribute('value','Appareils');
    inputAppliances.style.width = "130px";
});

srcUst.addEventListener('focusin', function(){
    listUstensils.style.display = "flex";
    inputUstensils.setAttribute('placeholder','Rechercher un ustensil');
    inputUstensils.setAttribute('value','');
    inputUstensils.style.width = "auto";
});
srcUst.addEventListener('focusout', function(){
    srcUst.reset();
    listUstensils.style.display = "none";
    inputUstensils.setAttribute('placeholder','');
    inputUstensils.setAttribute('value','Ustensils');
    inputUstensils.style.width = "130px";
});

function closeTagsEvent(recipes){
    const closeTags = document.querySelectorAll('.close-tags');
    closeTags.forEach((btn) => {
        btn.addEventListener("click", function(){
    
            let itemToDel = btn.previousSibling.innerText;

            if(btn.parentElement.getAttribute("class").includes("ing")){
                let index = selectedTags.ing.indexOf(itemToDel);
                if(index >-1){
                    selectedTags.ing.splice(index,1);
                }
            }
            
            if(btn.parentElement.getAttribute("class").includes("app")){
                let index = selectedTags.app.indexOf(itemToDel);
                if(index >-1){
                    selectedTags.app.splice(index,1);
                }
            }

            if(btn.parentElement.getAttribute("class").includes("ust")){
                let index = selectedTags.ust.indexOf(itemToDel);
                if(index >-1){
                    selectedTags.ust.splice(index,1);
                }
            }
            

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

            searchInput(recipes);
        })
    })
}



export function tagSelection(recipes){
    let recipesToFilter = [];

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

                    selectedTags.ing.push(event.target.innerText);

                    recipesToFilter = searchInput(recipes);
                    researchTags(recipesToFilter);
                    closeTagsEvent(recipesToFilter);

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

                    selectedTags.app.push(event.target.innerText);

                    recipesToFilter = searchInput(recipes);
                    researchTags(recipesToFilter);
                    closeTagsEvent(recipesToFilter);

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

                    selectedTags.ust.push(event.target.innerText);

                    recipesToFilter = searchInput(recipes);
                    researchTags(recipesToFilter);
                    closeTagsEvent(recipesToFilter);

                    listUstensils.childNodes.forEach(child => {
                        if(child.innerText == event.target.innerText){
                            child.classList.add('tags-used');
                        }
                    })
                break;

            }
        })
    })
    
    return selectedTags;
}


