import { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
  return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodos = () => {

    const [ todos, dispatchTodo ] = useReducer( todoReducer, [], init );

    const handleNewTodo = ( newTodo ) => {
      const action = {
        type: 'Add',
        payload: newTodo
      }
      dispatchTodo( action );
    }
  
    const handleDeleteTodo = ( id ) => {
      dispatchTodo({
        type: 'Remove',
        payload: id
      })
    } 
  
    const handleToggleTodo = ( id ) => {
      dispatchTodo({
        type: 'Toggle',
        payload: id
      }) 
    } 
  
    useEffect(() => {    
      localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])


  return {    
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( t => !t.done ).length,
    handleNewTodo, 
    handleDeleteTodo, 
    handleToggleTodo
  }
}
