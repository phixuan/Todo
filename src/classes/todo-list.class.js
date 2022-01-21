import { Todo } from ".";
import { todoList } from "..";

export class TodoList {

    static conteo() {
        let conteo = todoList.todos.filter( todo => !todo.completado).length;
        return conteo;
    }

    constructor(){
        
        // this.todos = [];
        this.CargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();

    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id)
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {

        for( const todo of this.todos ){
            if(todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    CargarLocalStorage(){
        this.todos = ( localStorage.getItem('todo') ) 
                    ? this.todos = JSON.parse( localStorage.getItem('todo') ) 
                    : this.todos = [];
        
        this.todos = this.todos.map( Todo.fromJson );
    }
}