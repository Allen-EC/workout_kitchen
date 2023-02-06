//-----RECIPE SEARCH-----
var recipesContainerEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=e98ec434165744b29dbcb939ab49166f";
var navEl = $(".navbar");
var btnClose = $("<button>Show Less</button>");
btnClose.addClass("btn btn-secondary");
var btnSave = $("<button>Save</button>");
btnSave.addClass("btn btn-secondary");

// click event on recipes div-container/latter to be changed on "button"
// navEl.on("click", function () {
//   recipesContainerEl.empty();
//   var urlIngredient =
//     "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
//     ingredient +
//     "&number=6" +
//     keyRecipes;
//   // API call
//   $.ajax({
//     url: urlIngredient,
//     method: "GET",
//   }).then(function (response) {
//     // loop over the response array and dynamically create recipe card based on received data
//     for (var i = 0; i < response.length; i++) {
//       // creatin card div
//       var divRecipeCard = $("<div>");
//       divRecipeCard.addClass("card");
//       divRecipeCard.attr("style", "width:20rem");
//       // creating image
//       var imageRecipe = $("<img>");
//       imageRecipe.addClass("card-img-top");
//       imageRecipe.attr("src", response[i].image);
//       // creating div (card body) for recipe text and button
//       var recipeCardBody = $("<div>");
//       recipeCardBody.addClass("card-body");
//       var recipeTitleEL = $("<h5>" + response[i].title + "</h5>");
//       recipeTitleEL.addClass("card-title");
//       var btnFullRecipe = $("<button>See Full Recipe</button>");
//       btnFullRecipe.addClass("btn btn-primary");
//       btnFullRecipe.attr("data-id", response[i].id);
//       var save = $("<button>Save</button>");
//       save.addClass(" btn btn-secondary");
//       // displaying dynamically created cards to the user
//       recipeCardBody.append(recipeTitleEL, btnFullRecipe, save);
//       divRecipeCard.append(imageRecipe, recipeCardBody);
//       recipesContainerEl.append(divRecipeCard);
//     }
//   });
// });

// Click event on "See Full Recipe" button
recipesContainerEl.on("click", ".btn-primary", function (e) {
  var buttonEl = $(this);
  buttonEl.hide();
  var mealId = buttonEl.data("id");
  var cardBodyElement = buttonEl.parent();
  var cardDiv = buttonEl.parent().parent();
  cardDiv.attr("style", "width:30rem");
  cardDiv.addClass("recipe-card-main");
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

// Event listener for close button
btnClose.on("click", function () {
  $(".expand-text").hide();
  $(".recipe-card-main").attr("style", "width: 20rem");
  $(".btn-primary").show();
  btnSave.hide();
  btnClose.hide();
});


//-----EXERCISE SEARCH-----
//key for the Exercise API from Ninja APIs
var ninjaAPI = 'i+Zes/WnU72HDYemlL23/g==UqTBhzMEI1nSnXHh';

//click event for the submit button
$('#submit-exercise').on("click", function(event){
    event.preventDefault();
    //targets the selected option of each menu
    var level = $('#exerciseLevel').children('option:selected').val();
    var type = $('#exerciseType').children('option:selected').val();

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/exercises?difficulty=' + level + '&type=' + type,
        headers: { 'X-Api-Key': ninjaAPI},
        contentType: 'application/json',
        success: function(result) {
            createCards(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

})

//function for creating cards out of the response data
function createCards(data){
  $('.exercise-cards-container').empty();
  if (data.length !== 0){
    for (var i=0; i<6; i++){
        var exCard = $('<div class="card" style="width:20rem"></div>');
        var exCardBody = $('<div class="card-body"></div>');
        var exName = $('<h5 class="card-title">' + removeSpecialChars(data[i].name) + '</h5>');
        var equipment = $('<p class="card-text">Equipment: ' + removeSpecialChars(data[i].equipment) + '.</p>');
        var muscle = $('<p class="card-text">Target muscle: ' + data[i].muscle + '.</p>');
        //creates button which will extend card to show instructions
        var btnInstructions = $('<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#instructionsCollapse' + [i] + '" aria-expanded="false" aria-controls="instructionsCollapse' + [i] + '">Instructions</button>');
        var instructions = $('<div class="collapse" id="instructionsCollapse' + [i] + '"><p class="card-text">' + data[i].instructions + '</p></div>');
        //creates save button
        var exSaveBtn = $('<button class="btn btn-secondary" id="exSaveBtn">Save</button>');
        //appending all created elements to the exercise card container
        exCardBody.append(exName, equipment, muscle, btnInstructions, exSaveBtn);
        exCard.append(exCardBody, instructions);
        $('.exercise-cards-container').append(exCard);
    }
  } else {
    var noResultsText = $('<p>No results - please try another exercise search</p>');
    $('.exercise-cards-container').append(noResultsText);
  }
}

//function to remove special characters and replace with spaces (fixes typo issues in exercise API data)
function removeSpecialChars(string){
    var newString = string.replace(/[^a-zA-Z0-9\s]/gi, ' ');
    return newString;
}