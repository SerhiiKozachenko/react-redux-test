import React from 'react'
import PropTypes from 'prop-types'
import TodosList from './TodosList'
import { Alert } from 'react-bootstrap'
import { exist } from './TodosReducer';

export const Todos = ({ todos, saveInputValue, add, exist, remove, edit, changeTodo, saveNewValue }) => {
  const allTodos = todos.todos
  const inputValue = todos.inputValue
  const alreadyExist = todos.alreadyExist
  const edited = todos.edited
  return (
    <div style={{ margin: '0 auto', maxWidth: '400px' }} >
      <h2>Todos:</h2>
      <ul className='list-group list-group-flush'>
      {allTodos.length 
        ? <TodosList todos={allTodos} remove={remove} edited={edited} 
                     edit={edit} changeTodo={changeTodo} saveNewValue={saveNewValue} />
        : <Alert variant='success'>Congrats! You did it!</Alert>
      }
      </ul>

      <br />
      <div className='input-group'>
        <input type='text' className='form-control' placeholder='Write something' value={inputValue}
               onBlur={(e) => e.target.value = ''}
               onChange={(e) => saveInputValue(e.target.value)} 
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' disabled={!inputValue} 
                  onClick={() => allTodos.some(t => t === inputValue) 
                                   ? exist()
                                   : add(inputValue)}>
            Add
          </button>
        </div>
      </div>

      <br />    
      {alreadyExist && <Alert variant='danger'>Todo already exist in the list</Alert>}

    </div>
  )
}

Todos.propTypes = {
  todos: PropTypes.object,
  saveInputValue: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Todos
