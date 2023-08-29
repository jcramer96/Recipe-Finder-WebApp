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
    const main = document.querySelector('main');
    main.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Create an anchor element for the recipe link
        const recipeLink = document.createElement('a');
        recipeLink.href = `https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`;
        recipeLink.target = "_blank"; // Open the link in a new tab
        recipeLink.textContent = recipe.title;
        
       // Create HTML elements to display recipe information
       const recipeTitle = document.createElement('h2');
       recipeTitle.textContent = recipe.title;
       
       const recipeImage = document.createElement('img');
       recipeImage.src = recipe.image;
       
       // Append elements to the recipe card
       recipeCard.appendChild(recipeLink);
       recipeCard.appendChild(recipeTitle);
       recipeCard.appendChild(recipeImage);
       
       // Append the recipe card to the main container
        main.appendChild(recipeCard);
    });
}

// Handle form submission
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.querySelector('#search-term').value;
    fetchRecipes(searchTerm);
});