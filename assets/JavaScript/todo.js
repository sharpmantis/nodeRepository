/**
 * @name todo.js gestionnaire de taches
 * 
 * Gestionnaire de la zone de saisie : theTodo
 */

$('#theTodo').on('keyup', function (event) {
    if ($(this).val().length >= 5) {
        $('#ajouter').removeAttr('disabled');
    } else {
        //sinon je réaffecte l'attribut disabled
        $('#ajouter').attr('disabled', 'disabled');
    }
});