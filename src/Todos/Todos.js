import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      tempText: '',
      key: this.props.itemID,
      text: this.props.children,
    }
  }

  changeText(event) {
    event.preventDefault()
    this.setState({'tempText': event.target.value})
  }

  saveText() {
    if (this.state.tempText !== '') {
      this.props.updateTODO(this.state.text, this.state.tempText)
      this.props.removeItem()
    }
    this.setState({'editing': false})
  }

  // onBlur={() => this.setState({'editing': false})}
  render() {
    const editing = this.state.editing || false
    const inputValue = this.state.tempText === '' ? this.state.text : this.state.tempText
    return (
      <div 
        style={{display: 'flex', marginBottom: '15px'}}
      >
        <p style={{margin: 'auto 0', float: 'left'}}>{this.props.itemID}. </p>
        <input
          style={{marginRight: 'auto', float: 'left', border: 0, outline: 'unset', flex: 4}}
          type="text"
          value={inputValue}
          onFocus={() => this.setState({'editing': true})}
          className='list-group-item d-flex justify-content-between align-items-center'
          onChange={event => this.changeText(event)} />
          { editing ? (
            <button className='btn btn-success' onClick={ () => this.saveText() }>
              <span>Save</span>
            </button>
            ) : (
            <button className='close' onClick={ () => this.props.removeItem() }>
              <span >&times;</span>
            </button>
          )}
      </div>
    )
  }
}

export const Todos = ({ todos, remove, add, update}) => {

  const [text, updateText] = useState('')
  const [warning, setWarning] = useState('')
  const [todoList, updateTodoList] = useState([])

  const addToDo = () => {
    if (todos.includes(text)) {
      setWarning('Warning')
    } else {
      setWarning('')
      if (text !== '') { add(text) }
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
        todoList.length===0
          ?
          <h1 className="text-success">Congrats!... You did i!</h1>
          :
          todoList.map((t, idx) => (
          <TodoItem key={t}
            removeItem={ () => {
              remove(t)
              setWarning('')
            }}
            itemID={++idx}
            updateTODO={update}
          >
          {t}
          </TodoItem>
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
