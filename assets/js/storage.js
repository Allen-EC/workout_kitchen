renderSavedRecipes();
renderSavedExercises();

//function to get saved recipe data and append to page
function renderSavedRecipes(){
    var favoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
    if (favoriteRecipes !== null){
        for (var i=0; i<favoriteRecipes.length; i++){
            var savedRecipeCard = $('<div class="card card-recipe" style="width:20rem"></div>');
            var savedRecipeImg = $('<img class="card-img-top" src="' + favoriteRecipes[i].image + '">');
            var savedRecipeCardBody = $('<div class="card-body"></div>');
            var savedRecipeCardTitle = $('<h5 class="card-title">' + favoriteRecipes[i].title + '</h5>');
            var savedRecipeID = $('<p>' + favoriteRecipes[i].id + '</p>');
            savedRecipeCardBody.append(savedRecipeCardTitle, savedRecipeID);
            savedRecipeCard.append(savedRecipeImg, savedRecipeCardBody);
            $('#saved-recipes-div').append(savedRecipeCard);
        }
    }
}

//function to get saved exercises data and append to page
function renderSavedExercises(){
    var favoriteExercises = JSON.parse(localStorage.getItem('favorite-exercises'));
    if (favoriteExercises !== null){
        for (var i=0; i<favoriteExercises.length; i++){
            var savedExCard = $('<div class="card" style="width:20rem"></div>');
            var savedExCardBody = $('<div class="card-body"></div>');
            var savedExCardTitle = $('<h5 class="card-title">' + favoriteExercises[i].title + '</h5>');
            var savedExCardTextEl = $('<div class="card-text"></div>')
            var savedExCardEquip = $('<p>' + favoriteExercises[i].equipment + '</p>');
            var savedExCardMuscle = $('<p>' + favoriteExercises[i].muscle + '</p>');

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
                  favoriteExercises[i].instructions +
                  "</p></div>"
              );

            savedExCardTextEl.append(savedExCardEquip, savedExCardMuscle, savedBtnInstructions);
            savedExCardBody.append(savedExCardTitle, savedExCardTextEl, savedInstructions);
            savedExCard.append(savedExCardBody);
            $('#saved-exercises-div').append(savedExCard);
        }
    }
}