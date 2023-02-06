var recipesContainerEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=fe29821c13db4e459d6e8bf085396eac";

var searchBtn = $(".btn-recipe");
var inputEl = $("#recipeInput");

var btnSave = $("<button>Save</button>");
btnSave.addClass("btn btn-secondary");

// click event on recipes div-container/latter to be changed on "button"
searchBtn.on("click", function (e) {
  e.preventDefault();
  recipesContainerEl.empty();
  var usersInput = inputEl.val();
  inputEl.val("");
  var urlIngredient =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
    usersInput +
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
      divRecipeCard.addClass("card card-recipe");
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
      var btnFullRecipe = $("<button></button>");
      // Icon for button
      var iconUp = $("<i>");
      iconUp.addClass("fa-solid fa-angle-up");
      var iconDown = $("<i>");
      iconDown.addClass("fa-solid fa-angle-down");
      btnFullRecipe.append(iconUp, iconDown);
      btnFullRecipe.addClass("btn btn-primary btn-toggle");
      btnFullRecipe.attr("data-id", response[i].id);
      var save = $("<button>Save</button>");
      save.addClass(" btn btn-secondary");
      // displaying dynamically created cards to the user
      recipeCardBody.append(recipeTitleEL, btnFullRecipe, save);
      divRecipeCard.append(imageRecipe, recipeCardBody);
      recipesContainerEl.append(divRecipeCard);
    }
  });
});

// Click event on "See Full Recipe" button
recipesContainerEl.on("click", ".btn-toggle", function (e) {
  if ($(".card-body").find(".expand").length > 0) {
    console.log("has");
    $(".expand").remove();
    $(".card-recipe").attr("style", "width:20rem");
  }
  //   if ($(".card-body").has(".expand")) {
  //     console.log("has");
  //   }
  else {
    var buttonEl = $(this);
    var mealId = buttonEl.data("id");
    var cardBodyElement = buttonEl.parent();
    var cardDiv = buttonEl.parent().parent();
    cardDiv.attr("style", "width:30rem");
    cardDiv.addClass("recipe-card-main");
    var textIngredients = $("<h5>Ingredients:</h5>");
    var prepTitle = $("<h5>Preparation:</h5>");
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
      var prepText = $("<p>" + response.instructions + "<p>");
      // creating ul with li elements containing recipe ingredients
      var ulEl = $("<ul>");
      for (i = 0; i < response.extendedIngredients.length; i++) {
        var liEl = $(
          "<li>" + response.extendedIngredients[i].original + "</li>"
        );
        ulEl.append(liEl);
      }
      // displaying to the user
      var expandEl = $("<div>");
      expandEl.addClass("expand");
      expandEl.append(textIngredients, ulEl, prepTitle, prepText);
      cardBodyElement.append(expandEl);
    });
  }
});
