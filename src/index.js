import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();


todoList.todos.forEach(crearTodoHtml); //Forma corta



// const newTodo = new Todo('Aprender');
// // todoList.nuevoTodo( newTodo );
// todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();


//Conteo 
// console.log(todoList.todos.length);
// let conteo = todoList.todos.filter( todo => !todo.completado);

