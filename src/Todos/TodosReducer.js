// ------------------------------------
// Constants
// ------------------------------------
export const TODOS_ADD = 'TODOS_ADD'
export const TODOS_REMOVE = 'TODOS_REMOVE'
export const TODOS_UPDATE = 'TODOS_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
export function add (todo = '') {
  return {
    type: TODOS_ADD,
    payload: todo
  }
}

export function remove (todo) {
  return {
    type: TODOS_REMOVE,
    payload: todo
  }
}

export function update (todo_old, todo_new) {
  console.log(todo_old, todo_new)
  return {
    type: TODOS_UPDATE,
    old_item: todo_old,
    new_item: todo_new
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

function addToLocalStorage(state, action) {
  localStorage.setItem('todoList', JSON.stringify([...state, action.payload]))
  return [...state, action.payload]
}

function removeToLocalStorage(state, action) {
  localStorage.setItem('todoList', JSON.stringify(state.filter(t => t !== action.payload) ))
  return state.filter(t => t !== action.payload)  
}

function updateToLocalStorage(state, action) {
  console.log(state)
  console.log([...state.slice(0, state.indexOf(action.old_item)), action.new_item, ...state.slice(state.indexOf(action.old_item)+1)])
  localStorage.setItem('todoList', JSON.stringify([...state.slice(0, state.indexOf(action.old_item)), action.new_item, ...state.slice(state.indexOf(action.old_item))]))
  localStorage.setItem('todoList', JSON.stringify([...state.slice(0, state.indexOf(action.old_item)), action.new_item, ...state.slice(state.indexOf(action.old_item))]))
  return [...state.slice(0, state.indexOf(action.old_item)), action.new_item, ...state.slice(state.indexOf(action.old_item))]
}

const ACTION_HANDLERS = {
  [TODOS_ADD]: (state, action) => addToLocalStorage(state, action),
  [TODOS_REMOVE]: (state, action) => removeToLocalStorage(state, action),
  [TODOS_UPDATE]: (state, action) => updateToLocalStorage(state, action)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =JSON.parse(localStorage.getItem('todoList')) || ['Buy milk', 'Do exercises', 'Cook dinner'] 
// const initialState = ['Buy milk', 'Do exercises', 'Cook dinner'] 

export default function todosReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
