import React from 'react'

export const TodosList = ({ todos, remove, edited, edit, changeTodo, saveNewValue }) => (
  todos.map((t, idx) => (
    <React.Fragment key={t}>
      {edited !== null && edited === idx
        ? <li className='list-group-item d-flex justify-content-between align-items-center'>
            <input type="text" className='form-control-sm' onChange={(e) => changeTodo(e.target.value)} />
            <button className='close' onClick={saveNewValue}>
              <span>Save</span>
            </button>
          </li>
        : <li className='list-group-item d-flex justify-content-between align-items-center'
              onClick={() => edit(idx - 1)}
          >
            {++idx}. {t}
            <button className='close' onClick={(e) => {e.stopPropagation(); return remove(t)}}>
              <span>&times;</span>
            </button>
        </li>
      }
    </React.Fragment>
  ))
)

export default TodosList
