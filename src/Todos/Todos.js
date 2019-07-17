import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const Todos = ({ todos, remove, add}) => {
  const [text, updateText] = useState('')
  const [warning, setWarning] = useState('')
  const [todoList, updateTodoList] = useState([])

  const addToDo = () => {
    if (todos.includes(text)) {
      setWarning('Warning')
    } else {
      setWarning('')
      add(text)
    }
    updateText('')
  }
  
  useEffect( () => {
    if (Array.from(new Set(todos)).length !== todos.length && todos.length !== 0) {
      updateTodoList(Array.from(new Set(todos)))
    } else {
      updateTodoList(todos)
    }
  }, [todos])

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px' }} >
      <h2>Todos:</h2>
      <ul className='list-group list-group-flush'>
      <h2 className="text-warning">{warning}</h2>
      {
        todos.length===0
          ?
          <h1 className="text-success">Congrats!... You did i!</h1>
          :
          todoList.map((t, idx) => (
            <li key={t} className='list-group-item d-flex justify-content-between align-items-center'>
              {++idx}. {t}
              <button className='close' onClick={() => remove(t)}>
                <span >&times;</span>
              </button>
            </li>
          ))
      }
      </ul>

      <br />
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Write something'
          value={text}
          onChange={ event => updateText(event.target.value) }
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' onClick={() => addToDo()}>Add</button>
        </div>
      </div>

    </div>
  )
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired
}

export default Todos
