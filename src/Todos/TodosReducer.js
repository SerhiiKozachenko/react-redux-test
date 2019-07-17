// ------------------------------------
// Constants
// ------------------------------------
export const TODOS_ADD = 'TODOS_ADD'
export const TODOS_REMOVE = 'TODOS_REMOVE'

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

// ------------------------------------
// Action Handlers
// ------------------------------------

function addToLocalStorage(state, action) {
  localStorage.setItem('todoList', JSON.stringify([...state, action.payload]))
  return [...state, action.payload]
}

const ACTION_HANDLERS = {
  [TODOS_ADD]: (state, action) => addToLocalStorage(state, action),
  [TODOS_REMOVE]: (state, action) => state.filter(t => t !== action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = JSON.parse(localStorage.getItem('todoList')) || ['Buy milk', 'Do exercises', 'Cook dinner'] 

export default function todosReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
