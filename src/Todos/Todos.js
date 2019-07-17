import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './Todos.scss'

export const Todos = ({ todos, add, remove, edit }) => {
  const [text, setText] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(false);

  const input = useRef(null);

  const onSubmit = () => {
    if (todos.includes(text)) {
      return setError(true);
    }
    add(text);
    setText('');
    return input.current.focus();
  }

  const onEdit = () => {
    edit(editingTask, text);
    setText('');
    setEditingTask(null);
    input.current.focus();
  }

  const resetError = (callback) => (p) => {
    if (error) {
      setError(false);
    }
    callback(p)
  }

  const onChange = resetError(e => setText(e.target.value));
  
  const onRemove = resetError((t) => {
    remove(t)
    if (t === editingTask) {
      setEditingTask(null)
      setText('')
    }
  });

  const onStartEditing = resetError(t => {
    if (editingTask === t) {
      setEditingTask(null)
      setText('')
      return input.current.focus();
    }
    
    setText(t)
    setEditingTask(t)
    return input.current.focus();
  });

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px' }}>
      {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList todos={todos} editing={editingTask} edit={onStartEditing} remove={onRemove} />
      )}
      <br />
      <div className='input-group'>
        <input
          value={text}
          onChange={onChange}
          ref={input}
          type='text'
          className='form-control'
          placeholder='Write something'
        />
        {error && <p className="error-message">Duplicate items is not allowed!</p>}
        <div className='input-group-append'>
          <button
            className={`btn btn-outline-${error ? 'danger' : 'secondary'}`}
            onClick={editingTask ? onEdit : onSubmit}
          >
            {editingTask ?  "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}

const EmptyState = () => <h2 className="success-message">Congrats! You did it!</h2>;

const TodoList = ({ todos, remove, edit, editing }) => (
  <React.Fragment>
    <h2>Todos:</h2>
    <ul className='list-group list-group-flush'>
    {
      todos.map((t, idx) => (
        <li
          key={t}
          className={`list-group-item d-flex justify-content-between align-items-center task ${editing === t ? 'selected' : ''}`}
        >
          {++idx}. {t}
          <button className='close pencil' onClick={() => edit(t)}>
            <span>✏️</span>
          </button>
          <button className='close' onClick={(e) => remove(t, e)}>
            <span>&times;</span>
          </button>
        </li>
      ))
    }
    </ul>
  </React.Fragment>
)

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  editing: PropTypes.string,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  editing: null,
}

export default Todos
