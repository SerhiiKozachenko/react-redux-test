import React from 'react'
import PropTypes from 'prop-types'

export const Todos = ({ todos, remove }) => (
  <div style={{ margin: '0 auto', maxWidth: '400px' }} >
    <h2>Todos:</h2>
    <ul className='list-group list-group-flush'>
    {
      todos.map((t, idx) => (
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
      <input type='text' className='form-control' placeholder='Write something' />
      <div className='input-group-append'>
        <button className='btn btn-outline-secondary' onClick={() => alert('Not implemented!')}>Add</button>
      </div>
    </div>

  </div>
)
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
  // counter: PropTypes.number.isRequired,
  // increase: PropTypes.func.isRequired,
  // decrease: PropTypes.func.isRequired,
  // reset: PropTypes.func.isRequired
}

export default Todos
