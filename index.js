const apiKey = 'e216d4b615d64f3bb71667e85617710b';

// Function to fetch recipes based on user input
async function fetchRecipes(query) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Process and display the data in your UI
        displayRecipes(data.results);
        console.log(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display recipes in the UI
function displayRecipes(recipes) {
    const recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        // If no recipes were found, display a message
        const noRecipesMessage = document.createElement('p');
        noRecipesMessage.textContent = "Sorry, no recipes were found.";
        recipeContainer.appendChild(noRecipesMessage);
        recipeContainer.style.backgroundImage = 'none';
    } else {
        // If recipes were found, display them
        recipes.forEach(recipe => {
            // Create an anchor element for the entire recipe card
            const recipeLink = document.createElement('a');
            recipeLink.href = `https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`;
            recipeLink.target = "_blank"; // Open the link in a new tab

            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // Create HTML elements to display recipe information
            const recipeTitle = document.createElement('h2');
            recipeTitle.textContent = recipe.title.toUpperCase();

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.classList.add('recipe-img');

            //returns the background image
            recipeContainer.style.backgroundImage = 'url(img/food-background.jpeg)'

            // Append elements to the recipe card
            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(recipeTitle);

            // Append the recipe card to the link
            recipeLink.appendChild(recipeCard);

            // Append the link to the main container
            recipeContainer.appendChild(recipeLink);
        });
    }
}

// Handle form submission
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.querySelector('#search-term').value;
    fetchRecipes(searchTerm);
});