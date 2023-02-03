var recipesDivEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=f98ddadddf8c48bc87d34611c1e22683";

// click event on recipes div/latter to be changed on "button"
recipesDivEl.on("click", function (e) {
  e.preventDefault();
  recipesDivEl.empty();
  var urlIngredient =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
    ingredient +
    "&number=6" +
    keyRecipes;
  $.ajax({
    url: urlIngredient,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
