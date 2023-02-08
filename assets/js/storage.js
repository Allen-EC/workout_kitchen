// var keyRecipes = "&apiKey=e98ec434165744b29dbcb939ab49166f";
var keyRecipes = "&apiKey=236e7bcb357349319ce62701e379f7c9";

renderSavedRecipes();
renderSavedExercises();

//function to get saved recipe data and append to page
function renderSavedRecipes() {
  var favouriteRecipes =
    JSON.parse(localStorage.getItem("favourite-recipes")) || [];
  if (favouriteRecipes !== null) {
    for (var i = 0; i < favouriteRecipes.length; i++) {
      var savedRecipeCard = $(
        "<div class='card card-recipe' style='width:20rem'></div>"
      );
      var savedRecipeImg = $(
        "<img class='card-img-top' src='" + favouriteRecipes[i].image + "'>"
      );
      var savedRecipeCardBody = $("<div class='card-body'></div>");
      var savedRecipeCardTitle = $(
        "<h5 class='card-title'>" + favouriteRecipes[i].title + "</h5>"
      );
      // var savedRecipeID = $("<p>" + favouriteRecipes[i].id + "</p>");

      //creating "See more" button
      var btnFullRecipe = $("<button></button>");
      var iconDown = $("<i>");
      iconDown.addClass("fa-solid fa-angle-down");
      btnFullRecipe.append(iconDown);
      btnFullRecipe.addClass("btn btn-primary btn-toggle");
      btnFullRecipe.attr("data-id", favouriteRecipes[i].id);
      // REMOVE BUTTON
      var removeBtn = $("<button>Remove</button>");
      removeBtn.addClass("btn btn-primary remove");
      //
      savedRecipeCardBody.append(
        savedRecipeCardTitle,
        btnFullRecipe,
        removeBtn
      );
      savedRecipeCard.append(savedRecipeImg, savedRecipeCardBody);
      $("#saved-recipes-div").append(savedRecipeCard);
    }
  }
}

// Click event on "See more" button
$("#saved-recipes-div").on("click", ".btn-toggle", function (e) {
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
      console.log(response);
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
      expandEl.append(textIngredients, ulEl, prepTitle, prepText, enjoyEl);
      cardBodyElement.prepend(expandEl);
      expandEl.hide();
      expandEl.show("slow");
    });
  }
});

//function to get saved exercises data and append to page
function renderSavedExercises() {
  var favouriteExercises = JSON.parse(
    localStorage.getItem("favourite-exercises")
  );
  if (favouriteExercises !== null) {
    for (var i = 0; i < favouriteExercises.length; i++) {
      var savedExCard = $('<div class="card" style="width:20rem"></div>');
      var savedExCardBody = $('<div class="card-body"></div>');
      var savedExCardTitle = $(
        '<h5 class="card-title">' + favouriteExercises[i].title + "</h5>"
      );
      var savedExCardTextEl = $('<div class="card-text"></div>');
      var savedExCardEquip = $(
        "<p>" + favouriteExercises[i].equipment + "</p>"
      );
      var savedExCardMuscle = $("<p>" + favouriteExercises[i].muscle + "</p>");

      var savedBtnInstructions = $(
        '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#instructionsCollapse' +
          [i] +
          '" aria-expanded="false" aria-controls="instructionsCollapse' +
          [i] +
          '">Instructions</button>'
      );
      var savedInstructions = $(
        '<div class="collapse" id="instructionsCollapse' +
          [i] +
          '"><p class="card-text">' +
          favouriteExercises[i].instructions +
          "</p></div>"
      );
      // Remove button
      var removeBtn = $("<button>Remove</button>");
      removeBtn.addClass("btn btn-primary remove-ex");

      savedExCardTextEl.append(
        savedExCardEquip,
        savedExCardMuscle,
        savedBtnInstructions
      );
      savedExCardBody.append(
        savedExCardTitle,
        savedExCardTextEl,
        savedInstructions,
        removeBtn
      );
      savedExCard.append(savedExCardBody);
      $("#saved-exercises-div").append(savedExCard);
    }
  }
}
// remove
$(".remove").on("click", function () {
  var favouriteRecipes = JSON.parse(localStorage.getItem("favourite-recipes"));
  var titleElement = $(this).parent().children().eq(0).text();
  favouriteRecipes = favouriteRecipes.filter(function (item) {
    return item.title !== titleElement;
  });
  $(this).parent().parent().remove();
  localStorage.setItem("favourite-recipes", JSON.stringify(favouriteRecipes));
});

$(".remove-ex").on("click", function () {
  var favouriteExercises = JSON.parse(
    localStorage.getItem("favourite-exercises")
  );
  var titleElement = $(this).parent().children().eq(0).text();
  favouriteExercises = favouriteExercises.filter(function (item) {
    return item.title !== titleElement;
  });
  $(this).parent().parent().remove();
  localStorage.setItem(
    "favourite-exercises",
    JSON.stringify(favouriteExercises)
  );
});
