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
  //  _load()
}