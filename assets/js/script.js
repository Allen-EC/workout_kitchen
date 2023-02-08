//-----RECIPE SEARCH-----
var recipesContainerEl = $(".recipe-cards-container");
var ingredient = "beef";
var keyRecipes = "&apiKey=f98ddadddf8c48bc87d34611c1e22683";
// var keyRecipes = "&apiKey=af6434966fb94e6daeee75dc4085d08d";
// var keyRecipes = "&apiKey=fc5be7872da647b7a8f8cb8e940470a4";
// var keyRecipes = "&apiKey=2e1e9f5c5088425086492362f6bd6756";
// var keyRecipes = "&apiKey=236e7bcb357349319ce62701e379f7c9";
// var keyRecipes = "&apiKey=fe29821c13db4e459d6e8bf085396eac";

var searchBtn = $(".btn-recipe");
var inputEl = $("#recipeInput");

var btnSave = $("<button>Save</button>");
btnSave.addClass("btn btn-secondary");

$("#dialog").hide();

// click event on recipes div-container/latter to be changed on "button"
searchBtn.on("click", function () {
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
    if (response.length > 0) {
      for (var i = 0; i < response.length; i++) {
        // creating card div
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
        var iconDown = $("<i>");
        iconDown.addClass("fa-solid fa-angle-down");
        btnFullRecipe.append(iconDown);
        btnFullRecipe.addClass("btn btn-primary btn-toggle");
        btnFullRecipe.attr("data-id", response[i].id);
        var save = $(
          "<button>Save <i class='fa-solid fa-heart-circle-plus'></i></button></button>"
        );
        save.addClass("btn btn-secondary recipe-save-btn");
        // displaying dynamically created cards to the user
        recipeCardBody.append(recipeTitleEL, btnFullRecipe, save);
        divRecipeCard.append(imageRecipe, recipeCardBody);
        recipesContainerEl.append(divRecipeCard);
      }
    } else {
      $("#dialog").dialog().show();
      var dialogBtn = $(".ui-dialog-titlebar-close");
      dialogBtn.addClass("btn btn-primary tip");
      dialogBtn.text("x");
      var responseEl = $(
        "<p>No results - please try another recipe search</p>"
      );
      recipesContainerEl.empty();
      recipesContainerEl.append(responseEl);
    }
  });
});

// Click event on "See Full Recipe" button
recipesContainerEl.on("click", ".btn-toggle", function (e) {
  $("i", $(this)).toggleClass("fa-solid fa-angle-up fa-solid fa-angle-down");
  if ($(".card-body").find(".expand").length > 0) {
    $(".expand").hide("slow", function () {
      $(".expand").remove();
    });
    var seenCard = $(".card-recipe");
    seenCard.attr("style", "width: 20rem");
    seenCard.removeClass("smooth");
  } else {
    var seenCard = $(this).parent().parent();
    seenCard.addClass("smooth");
    $(".smooth").attr("style", "width: 30rem");
    var mealId = $(this).data("id");
    var cardBodyElement = $(this).parent();
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
      // if vegan vegetarian
      if (response.vegan) {
        var veganIcon = $("<i class= 'fa-solid fa-seedling'></i>");
        var veganEl = $("<p class= 'vegan-text'>VG</p>");
        veganEl.attr("style", "color:green");
        veganIcon.attr("style", "color:green");
        veganEl.append(veganIcon);
      }
      if (response.vegetarian) {
        var vegetarianIcon = $("<i class= 'fa-solid fa-seedling'></i>");
        var vegetarianEl = $("<p>V</p>");
        vegetarianEl.attr("style", "color:green");
        vegetarianIcon.attr("style", "color:green");
        vegetarianEl.append(veganIcon);
      }
      //
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
      var enjoyEl = $("<h5 class='enjoy'>Enjoy</h5>");
      expandEl.append(
        textIngredients,
        ulEl,
        prepTitle,
        prepText,
        veganEl,
        vegetarianEl,
        enjoyEl
      );
      cardBodyElement.prepend(expandEl);
      expandEl.hide();
      expandEl.show("slow");
    });
  }
});

//-----EXERCISE SEARCH-----
//key for the Exercise API from Ninja APIs
var ninjaAPI = "i+Zes/WnU72HDYemlL23/g==UqTBhzMEI1nSnXHh";

//click event for the submit button
$("#submit-exercise").on("click", function (event) {
  event.preventDefault();
  //targets the selected option of each menu
  var level = $("#exerciseLevel").children("option:selected").val();
  var type = $("#exerciseType").children("option:selected").val();

  $.ajax({
    method: "GET",
    url:
      "https://api.api-ninjas.com/v1/exercises?difficulty=" +
      level +
      "&type=" +
      type,
    headers: { "X-Api-Key": ninjaAPI },
    contentType: "application/json",
    success: function (result) {
      createCards(result);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
});

//function for creating cards out of the response data
function createCards(data) {
  $(".exercise-cards-container").empty();
  if (data.length !== 0) {
    for (var i = 0; i < 6; i++) {
      var exCard = $('<div class="card" style="width:20rem"></div>');
      var exCardBody = $('<div class="card-body"></div>');
      var exName = $(
        '<h5 class="card-title">' + removeSpecialChars(data[i].name) + "</h5>"
      );
      var equipment = $(
        '<p class="card-text equipment">Equipment: ' +
          removeSpecialChars(data[i].equipment) +
          ".</p>"
      );
      var muscle = $(
        '<p class="card-text muscle">Target muscle: ' + data[i].muscle + ".</p>"
      );
      //creates button which will extend card to show instructions
      var btnInstructions = $(
        '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#instructionsCollapse' +
          [i] +
          '" aria-expanded="false" aria-controls="instructionsCollapse' +
          [i] +
          '">Instructions</button>'
      );
      var instructions = $(
        '<div class="collapse" id="instructionsCollapse' +
          [i] +
          '"><p class="card-text">' +
          data[i].instructions +
          "</p></div>"
      );
      //creates save button
      var exSaveBtn = $(
        '<button class="btn btn-secondary ex-save-btn">Save <i class="fa-solid fa-heart-circle-plus"></i></button>'
      );
      //appending all created elements to the exercise card container
      exCardBody.append(exName, equipment, muscle, btnInstructions, exSaveBtn);
      exCard.append(exCardBody, instructions);
      $(".exercise-cards-container").append(exCard);
    }
  } else {
    var noResultsText = $(
      "<p>No results - please try another exercise search</p>"
    );
    $(".exercise-cards-container").append(noResultsText);
  }
}

//function to remove special characters and replace with spaces (fixes typo issues in exercise API data)
function removeSpecialChars(string) {
  var newString = string.replace(/[^a-zA-Z0-9\s]/gi, " ");
  return newString;
}

//-----SAVE TO LOCAL STORAGE-----

//CLICK EVENTS FOR SAVE BUTTONS
//save exercise
$(".exercise-cards-container").on("click", ".ex-save-btn", function (event) {
  saveBtnIcon(event);
  var exCardTitle = $(event.target).siblings(".card-title").text();
  var exCardTextEquip = $(event.target).siblings(".equipment").text();
  var exCardTextMuscle = $(event.target).siblings(".muscle").text();
  var exCardInstructions = $(event.target).parent().siblings().text();
  var favouriteExercises =
    JSON.parse(localStorage.getItem("favourite-exercises")) || [];
  var savedExCard = {
    title: exCardTitle,
    equipment: exCardTextEquip,
    muscle: exCardTextMuscle,
    instructions: exCardInstructions,
  };
  //for loop to check if exercise already saved and removes it
  for (var i = 0; i < favouriteExercises.length; i++) {
    if (favouriteExercises[i].title === savedExCard.title) {
      favouriteExercises.splice(i, 1);
      break;
    }
  }
  favouriteExercises.push(savedExCard);
  localStorage.setItem(
    "favourite-exercises",
    JSON.stringify(favouriteExercises)
  );
});

//save recipe
$(".recipe-cards-container").on("click", ".recipe-save-btn", function (event) {
  saveBtnIcon(event);
  var recipeCardTitle = $(event.target).siblings(".card-title").text();
  var recipeCardID = $(event.target).siblings(".btn-toggle").attr("data-id");
  console.log(recipeCardID);
  var recipeImg = $(event.target).parent().siblings("img").attr("src");
  var favouriteRecipes =
    JSON.parse(localStorage.getItem("favourite-recipes")) || [];
  var savedRecipeCard = {
    title: recipeCardTitle,
    image: recipeImg,
    id: recipeCardID,
  };
  //for loop to check if recipe already saved and removes it
  for (var i = 0; i < favouriteRecipes.length; i++) {
    if (favouriteRecipes[i].id === savedRecipeCard.id) {
      favouriteRecipes.splice(i, 1);
      break;
    }
  }
  favouriteRecipes.push(savedRecipeCard);
  localStorage.setItem("favourite-recipes", JSON.stringify(favouriteRecipes));
});

//function to change the text and icon on the button when clicked
function saveBtnIcon(event) {
  var btn = $(".btn").closest($(event.target));
  btn.attr("data-click", "clicked");
  btn.text("Saved ");
  var savedIcon = $("<i class='fa-solid fa-heart-circle-check'></i>");
  btn.append(savedIcon);
}
