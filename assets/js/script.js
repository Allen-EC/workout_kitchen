var targetSelected = function(menu){
    var selected = menu.children("option:selected").val();
    return selected;
}

var ninjaAPI = 'i+Zes/WnU72HDYemlL23/g==UqTBhzMEI1nSnXHh';


$('#submit-exercise').on("click", function(){

    var difficulty = targetSelected($('#difficulty'));
    var type = targetSelected($('#type'));

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/exercises?difficulty=' + difficulty + '&type=' + type,
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