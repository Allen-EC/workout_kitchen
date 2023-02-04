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
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

})