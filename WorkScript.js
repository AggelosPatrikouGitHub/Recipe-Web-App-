const getRecipes = () => {
    const recipes = localStorage.getItem("recipes");
    return recipes ? JSON.parse(recipes) : [];
  };
  
  const saveRecipes = (recipes) => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  };

  document.getElementById("recipe-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const category = document.getElementById("category").value;
  
    if (!title || !ingredients || !instructions || !category) {
      alert("Please fill in all fields!");
      return;
    }
  
    const newRecipe = { title, ingredients, instructions, category };
    const recipes = getRecipes();
    recipes.push(newRecipe);
  
    saveRecipes(recipes);
    renderRecipes();
    e.target.reset();
  });

  const renderRecipes = (filter = "") => {
    const recipes = getRecipes();
    const recipeContainer = document.getElementById("recipes");
    recipeContainer.innerHTML = "";
  
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.category.toLowerCase().includes(filter.toLowerCase())
      );
    });
  
    filteredRecipes.forEach((recipe, index) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
  
      recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
  
      recipeContainer.appendChild(recipeCard);
    });
  };
  
  document.getElementById("search").addEventListener("input", (e) => {
    renderRecipes(e.target.value);
  });
  
  renderRecipes();

  document.getElementById("recipes").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      const recipes = getRecipes();
      recipes.splice(index, 1);
  
      saveRecipes(recipes);
      renderRecipes();
    }
  });
  