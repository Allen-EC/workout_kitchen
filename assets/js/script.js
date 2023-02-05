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
    for (var i=0; i<6; i++){
        console.log(data[i].name);
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
}

//function to remove special characters and replace with spaces (fixes typo issues in exercise API data)
function removeSpecialChars(string){
    var newString = string.replace(/[^a-zA-Z0-9\s]/gi, ' ');
    return newString;
}