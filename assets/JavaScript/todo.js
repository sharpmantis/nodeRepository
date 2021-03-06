/**
 * @name todo.js gestionnaire de taches
 * 
 * Gestionnaire de la zone de saisie : theTodo
 */

//On instancie un nouvel objet de la classe todolist
var todolist = new TodoList;

$('#theTodo').on('keyup', function (event) {
    if ($(this).val().length >= 5) {
        $('#ajouter').removeAttr('disabled');
    } else {
        //sinon je réaffecte l'attribut disabled
        $('#ajouter').attr('disabled', 'disabled');
    }
});




//

$('#todo').on('submit', function (event) {
    event.preventDefault(); // interdire le déclenchement par défaut (CAD soumettre le formulaire)
    var todo = new Todo(todolist); //On cree un todo avec les attribus suivants
    todo.todo = $('#theTodo').val(); //methode set.
    console.log('l\'objet todo contient: ' + todo.todo); //methode "get"
    console.log('la liste contient' + todolist._todos.length)


    //});


    //on vide le contenu de la saisie et désactiver le bouton, puis ajouter la ligne dans le tableau
    //$('#ajouter').on('click', function () {


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
    let todoColIndex = $(this).parents('tr').index();
    contentcol.html('<input type="text" class="modif" id="kk"   value="' + content + '">');
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


    //////////////////////////Bouton de modif////////////////////////////

    //creation de la colonne
    let modifcol = $('<td>');
    //creation du bouton
    let modifbutton = $('<button>');
    modifbutton
        .addClass('modifbutton')
        .addClass('btn')
        .addClass('btn-outline-danger')
        .attr('type', 'button');
    //creation de l'icone
    let modificon = $('<span>');
    modificon.addClass('icon-bin2');


    //on colle le tout 

    ligne.appendTo($('tbody'));//j'attache ma ligne au corps du tableau
    deletecol.appendTo(ligne);//la colonne a la ligne
    modifcol.appendTo(ligne);
    modifbutton.appendTo(modifcol)

    modificon.appendTo(modifbutton);
    deletebutton.appendTo(deletecol);//le bouton a la colonne
    deleteicon.appendTo(deletebutton);//l'icone au bouton


    modifbutton.appendTo(modifcol);
    modifbutton.appendTo(modifcol);
    modificon.appendTo(modifbutton);

});




//////////////////////gestion de la suppression d'une ligne////////////////////////////
//attention l'element deletebtn n'existe pas dans le DOM a la base, il est créé par la suite
//on va lui dire que dans "tbody" dès qu'il detecte un click on lance l'artillerie par heredité
$('tbody').on('click', '.deleteBtn', function (event) {
    //Recuperer la valeur du précédent <td>
    let todoColIndex = $(this).parents('tr').index();
    console.log('$index: ' + todoColIndex);
    let todo = todolist.get(todoColIndex);
    todolist.delete(todo);
    console.log('il reste :' + todolist._todos.length + ' elements');

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
    if ($(this).is(':checked')) {
        $(this).parent('td').next('td').addClass('strikedOut');
    } else {
        $(this).parent('td').next('td').removeClass('strikedOut')
    }

});

//Le multi suppression !!!!
$('#binMultipleDelete').on('click', function (event) {

    let indice = 0;


    $('tbody tr').each(function () {
        console.log('je parcoure les lignes');
        let TRindex = $(this).index();
        let firstCol = $(this).children('td').eq(0);
        let checkbox = firstCol.children('input').eq(0);

        if (checkbox.is(':checked')) {

            let todo = todolist.get(TRindex);
            console.log('notre todo ' + todo);
            todolist.delete(todo);
            console.log('il reste :' + todolist._todos.length + ' elements');

            $(this).remove();
            console.log('je dégage la ligne: ' + indice);
        }
        indice++;
    });
    $(this).attr('disabled', 'disabled');

    console.log('il me reste ça: ' + todolist.toString())

});




///////////////////////////////MODIFICATION DE LIGNE///////////////////////////////
$('tbody').on('click', '.modifbutton', function (event) {
    console.log('modif cliquée')


    //Recup de l'index html
    let indextodo = $(this).parents('tr').index();
    console.log('todocolindex = ' + indextodo)

    let content = $(this).parent().prev().prev().children().val(value);
    console.log(content);


    //injection de l'index dans l'id du champ si ce dernier est celui par defaut
    console.log('l\id est celui par defaut');
    document.getElementById("kk").id = indextodo;

    console.log('index et id du champ modifié =' + indextodo);

  

    console.log('l\index est egal a : ' + indextodo)

    //recuperation et enregistrement du todo dans localstorage//

    
    var todo = new Todo(todolist); //On cree un todo avec les attribus suivants
    todo.todo = document.getElementById(indextodo).value; //methode set.
    console.log('todo modifié= '+todo.todo);

    //suppression de l'anciennne version du todo

    let todoremove = todolist.get(indextodo);
    todolist.delete(todoremove);
    console.log('todo enlevé de la mémoire locale');

    //on change la value html
    document.getElementById(indextodo).value = todo.todo;
    console.log('todo injecté dans le html')
 

});
