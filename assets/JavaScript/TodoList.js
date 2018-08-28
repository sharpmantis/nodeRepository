class TodoList{



//    constructor
    constructor(){
        this._todos = [] //"[]"equivalent a un new array
        //Charger la mémoire locale
        this._load();
    }



    
   //getter setter
   get todoList(){
        return this._todos[index];
    }

    set todoList(value){
        this._todoList=value;
    }

//methodes
delete(){
    this._todoList.delete(this);
}

    delete(todo){ //Methode de suppression
      
        let index = this._todos.indexOf(todo);
        if (index !== -1){ //Si pas d'index, dans JS il sera égal a -1
            this._todos.splice(index,1); //splice permet de supprimer l'index et le nombre d'element a dégager 
        }
        this._persist();
     }

    add(todo){ //methode qui permet de "pousser" les todos dans le tableau
    this._todos.push(todo);
    //appeler la methode de persistence des données
    this._persist();
 }
 
    get(index){
    return this._todos[index]
    }
    
toString(){
    let message='';
    
    for (let ctrl=0; ctrl<this._todos.length; ctrl++){

        message += this._todos[ctrl]._todo +'\n';

    }
    return message
}

     _persist(){
         let datas=[];
         for(let index=0; index<this._todos.length;index++){
             datas.push(this._todos[index]._todo);
         }
         localStorage.setItem('todos', JSON.stringify(datas));
     }
    _load(){
        let todos=localStorage.getItem('todos');
        let jsontodos = JSON.parse(todos);

        for(let index=0;index<jsontodos.length;index++){
            let todo = new Todo();
            todo._todo=jsontodos[index]
            this._todos.push(todo);
            
        }
        console.log('mes todos= '+this.toString());

        //renvoyer les lignes
        this._render();


    }

    _render(){
       
        for(let index=0; index<this._todos.length; index++){
            let content = this._todos[index]._todo;
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

        }
    }
   
}