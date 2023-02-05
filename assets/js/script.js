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
        var exName = $('<h5 class="card-title">' + removeSpecialChars(data[i].name) + '</h5>');
        var cardBody = $('<div class="card-body">');
        var cardText = $('<p class="card-text"></p>');
        var equipment = 'Equipment: ' + removeSpecialChars(data[i].equipment) + '.';
        var muscle = 'Target muscle: ' + data[i].muscle + '.';
        var instructions = 'Instructions: ' + data[i].instructions;
        cardText.append(equipment, muscle, instructions);
        cardBody.append(exName, cardText);
        var exCard = $('<div class="card" style="width:30rem"></div>');
        exCard.append(cardBody);
        $('#exerciseCardContainer').append(exCard);
    }
}

//function to remove special characters and replace with spaces (fixes typo issues in API data)
function removeSpecialChars(string){
    var newString = string.replace(/[^a-zA-Z0-9\s]/gi, ' ');
    return newString;
}