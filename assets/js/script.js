var recipesContainerEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=e98ec434165744b29dbcb939ab49166f";
var navEl = $(".navbar");
var btnClose = $("<button>Show Less</button>");
btnClose.addClass("btn btn-secondary");
var btnSave = $("<button>Save</button>");
btnSave.addClass("btn btn-secondary");

// click event on recipes div-container/latter to be changed on "button"
navEl.on("click", function () {
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
      var recipeTitleEL = $("<h5>" + response[i].title + "</h5>");
      recipeTitleEL.addClass("card-title");
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

// Click event on "See Full Recipe" button
recipesContainerEl.on("click", ".btn-primary", function (e) {
  var buttonEl = $(this);
  buttonEl.hide();
  var mealId = buttonEl.data("id");
  var cardBodyElement = buttonEl.parent();
  var cardDiv = buttonEl.parent().parent();
  cardDiv.attr("style", "width:30rem");
  //   INGREDIENTS:
  var textIngredients = $("<h5>Ingredients:</h5>");
  textIngredients.addClass("ingredients");
  // PREPARATION
  var prepTitle = $("<h5>Preparation:</h5>");
  prepTitle.addClass("prep-title");
  // API call based on meal id
  var urlId =
    "https://api.spoonacular.com/recipes/" +
    mealId +
    "/information?includeNutrition=true" +
    keyRecipes;
  $.ajax({
    url: urlId,
    method: "GET",
  }).then(function (response) {
    // creating ul with li elements containing recipe ingredients

    var prepText = $("<p>" + response.instructions + "<p>");
    // •••••INGREDIENTS LIST
    var ulEl = $("<ul>");
    ulEl.addClass("ul-ingredients");
    for (i = 0; i < response.extendedIngredients.length; i++) {
      var liEl = $("<li>" + response.extendedIngredients[i].original + "</li>");
      ulEl.append(liEl);
    }
    // displaying to the user
    var expandEl = $("<div>");
    expandEl.addClass("expand-text");
    expandEl.append(textIngredients, ulEl, prepTitle, prepText);
    cardBodyElement.append(expandEl);
    cardBodyElement.append(btnClose, btnSave);
  });
});
btnClose.on("click", function () {
  $(".expand-text").hide();
  $(".primary-btn").show();
});
