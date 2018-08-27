class TodoList{



//    constructor
    constructor(){
        this._todos = [] //"[]"equivalent a un new array
    }



    
   //getter setter
   get todoList(){
        return this._todos[index];
    }

    set todoList(value){
        this._todoList=value;
        
    }

//methodes

    delete(todo){ //Methode de suppression
      
        let index = this._todos.indexOf(todo);
        if (index !== -1){ //Si pas d'index, dans JS il sera égal a -1
            this._todos.splice(index,1); //splice permet de supprimer l'index et le nombre d'element a dégager 
        }

     }

    add(todo){ //methode qui permet de "pousser" les todos dans le tableau
    this._todos.push(todo)
 }
 
    get(index){
    return this._todos[index]
    }
    
}