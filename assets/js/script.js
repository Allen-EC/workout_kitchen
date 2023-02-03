var recipesContainerEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=f98ddadddf8c48bc87d34611c1e22683";

// click event on recipes div-container/latter to be changed on "button"
recipesContainerEl.on("click", function (e) {
  e.preventDefault();
  recipesContainerEl.empty();
  var urlIngredient =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
    ingredient +
    "&number=6" +
    keyRecipes;
  // API call
  $.ajax({
    url: urlIngredient,
    method: "GET",
  }).then(function (response) {
    // loop over the response array and dynamically create recipe card based on received data
    for (var i = 0; i < response.length; i++) {
      // creatin card div
      var divRecipeCard = $("<div>");
      divRecipeCard.addClass("card");
      divRecipeCard.attr("style", "width:20rem");
      // creating image
      var imageRecipe = $("<img>");
      imageRecipe.addClass("card-img-top");
      imageRecipe.attr("src", response[i].image);
      // creating div (card body) for recipe text and button
      var recipeCardBody = $("<div>");
      recipeCardBody.addClass("card-body");
      var recipeTitleEL = $("<p>" + response[i].title + "</p>");
      var btnFullRecipe = $("<button>See Full Recipe</button>");
      btnFullRecipe.addClass("btn btn-primary");
      btnFullRecipe.attr("data-id", response[i].id);
      // displaying dynamically created cards to the user
      divRecipeCard.append(imageRecipe, recipeCardBody);
      recipeCardBody.append(recipeTitleEL, btnFullRecipe);
      recipesContainerEl.append(divRecipeCard);
    }
  });
});
// example of bootstrap card

/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
