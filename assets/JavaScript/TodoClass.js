class Todo{
    /**constructeur de la classe
    * @param void
    */

    

    constructor(todoList){
        this._todoList= todoList;
    }

    /**On defini un getter et un setter
     * @param string value
     * @return todo
     * retourne la valeur du todo de l'objet courant
     */
    
    get todo(){
        return this._todo;
    }
    delete(){
        this._todoList.delete(this);
    }

    set todo(value){
        this._todo = value;
        //ajoute le todo a la liste des toto
        this._todoList.add(this);
     //presistence de l'information
     
    }
    update(){
        console.log('update');
        let todoColIndex = $(this).parents('tr').index();
        let val1 = todolist.get(todoColIndex);
        console.log('valeur a modifier' + val1);
        
        var val2 =this;
        updateVal(val1, val2);
    }
}