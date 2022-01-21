import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

//Referencias en html
const divTodoList   = document.querySelector('.todo-list');
const textInput     = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const taskCounter   = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    conteo();

    return div.firstElementChild;
}

    const conteo = () => {
    const htmlConteo = `<strong>${TodoList.conteo()}</strong> pendiente(s)`;
    taskCounter.innerHTML = htmlConteo;
}

//Eventos
textInput.addEventListener('keyup', ( event ) => {
    if ( event.keyCode === 13 && textInput.value.length > 0) {

        const nuevoTodo = new Todo( textInput.value);
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        textInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input')){ //Click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button')) { //Borra todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

    conteo();

});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i>= 0; i--) { //FOR inverso

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro) {return;}

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const elemeto of divTodoList.children) {
        
        elemeto.classList.remove('hidden');
        const completado = elemeto.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemeto.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ) {
                    elemeto.classList.add('hidden');
                }
            break;
        }
    }
});