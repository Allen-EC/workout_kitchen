var recipesDivEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=f98ddadddf8c48bc87d34611c1e22683";
var urlIngredient =
  "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
  ingredient +
  "&number=6" +
  keyRecipes;
recipesDivEl.on("click", function (e) {
  e.preventDefault();
  //   recipesDivEl.empty();
  console.log("clicked");
});
