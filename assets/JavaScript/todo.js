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

$('#todo').on('submit', function (event) {
    event.preventDefault(); // interdire le déclenchement par défaut (CAD soumettre le formulaire)
});


//on vider le contenu de la saisie et désactiver le bouton, puis ajouter la ligne dans le tableau
$('#ajouter').on('click', function () {


    //on désactive le bouton
    $('#ajouter').attr('disabled', 'disabled')

    //on vide le bordel
    let content = $('#theTodo').val();
    $('#theTodo').val('');

    //ajoutons des lignes dans le tableau
    let ligne = $('<tr>');

    ////////////////////////////Colonne de la checkbox///////////////
    let checkboxcol = $('<td>');
    let checkbox = $('<input>');
    checkbox
        .attr('type', 'checkbox')
        .attr('checked', false)
        .addClass('multiSelect')

    //on colle le tout
    checkboxcol.appendTo(ligne);//ranger la colonne dans la ligne
    checkbox.appendTo(checkboxcol);//ranger la checkbox dans la colonne






    ////////////////maintenant la colonne de contenu/////////////////////////////////////
    let contentcol = $('<td>');
    contentcol.html(content);
    contentcol.appendTo(ligne);



    /////////////////////Bouton de suppression de ligne///////////////////////////////////////////
    //creation de la colonne
    let deletecol = $('<td>');
    //creation du bouton
    let deletebutton = $('<button>');
    deletebutton
        .addClass('deleteBtn')
        .addClass('btn')
        .addClass('btn-outline-danger')
        .attr('type', 'button');
    //creation de l'icone
    let deleteicon = $('<span>');
    deleteicon.addClass('icon-bin2');

    //on colle le tout 

    ligne.appendTo($('tbody'));//j'attache ma ligne au corps du tableau
    deletecol.appendTo(ligne);//la colonne a la ligne
    deletebutton.appendTo(deletecol);//le bouton a la colonne
    deleteicon.appendTo(deletebutton);//l'icone au bouton

});

//////////////////////gestion de la suppression d'une ligne////////////////////////////
//attention l'element deletebtn n'existe pas dans le DOM a la base, il est créé par la suite
//on va lui dire que dans "tbody" dès qu'il detecte un click on lance l'artillerie par heredité
$('tbody').on('click', '.deleteBtn', function (event) {
    //supprime la ligne
    $(this).parents('tr').remove();
});

////////////////////////bOUTON DE SUPPRESSION MULTIPLE (checkbox)////////////////
//binMultipleDelete



$('tbody').on('click', '.deleteBtn, .multiSelect', function (event) {

    if ($(this).hasClass('deleteBtn')) {
        console.log('boite cliquée');
        $(this).parents('tr').remove();

    } else {
        console.log('checkbox cliquée');

        if ($('input[type=checkbox]:checked').length > 0) {
            console.log('checkbox cochée');
            $('#binMultipleDelete').removeAttr('disabled');
            console.log('bouton enabled');
        } else {
            console.log('checkbox décochée');
            $('#binMultipleDelete').attr('disabled', 'disabled');
            console.log('bouton disabled');
        }

    }

    //cerise sur le ghetto
    if($(this).is(':checked')){
        $(this).parent('td').next('td').addClass('strikedOut');
    }else{
        $(this).parent('td').next('td').removeClass('strikedOut')
    }

});

//Le multi suppression !!!!
$('#binMultipleDelete').on('click',function(event){
   
    let indice=0;
    $('tbody tr').each(function(){
        console.log('parcours les lignes');
        let firstCol=$(this).children('td').eq(0);
        let checkbox= firstCol.children('input').eq(0);

        if(checkbox.is(':checked')){
            console.log('je dégage la ligne: '+indice)
            $(this).remove();
        }
        indice++;
    });
    $(this).attr('disabled','disabled');
});


