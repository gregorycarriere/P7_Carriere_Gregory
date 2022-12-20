export default function recipeFactory(data) {
    const { id,name,ingredients,time,description,appliance,ustensils } = data;

    function getRecipesCard(){
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipeCard');

        const image = document.createElement('img');
        image.classList.add('recipe-image');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('recipe-infos');

        const header = document.createElement('div');
        header.classList.add('recipe-header');

        const title = document.createElement('h2');
        title.textContent = name;
        title.classList.add('recipe-title');

        const timeZone = document.createElement('p');
        timeZone.classList.add('timeZone');

        const icon = document.createElement('img');
        icon.setAttribute("src","assets/clock-regular.svg");
        icon.classList.add('time-icon');

        const times = document.createElement('span');
        times.textContent = time + " min";

        timeZone.appendChild(icon);
        timeZone.appendChild(times);

        header.appendChild(title);
        header.appendChild(timeZone);

        const details = document.createElement('div');
        details.classList.add('recipes-details');

        const ingredList = document.createElement('li');
        ingredList.classList.add('ing-list');

        ingredients.forEach(item => {
            const ing = document.createElement('ul');
            if(item.unit === undefined){
                ing.textContent = item.ingredient + ": " + item.quantity;
            }else{
                ing.textContent = item.ingredient + ": " + item.quantity + " " + item.unit;
            }
            ingredList.appendChild(ing);
            ing.classList.add('ing-items');
        });

        const desc = document.createElement('p');
        desc.textContent = description;
        desc.classList.add('recipe-description');

        details.appendChild(ingredList);
        details.appendChild(desc);

        infoDiv.appendChild(header);
        infoDiv.appendChild(details);

        recipeCard.appendChild(image);
        recipeCard.appendChild(infoDiv);


        return (recipeCard);
    }

    return { getRecipesCard };
}