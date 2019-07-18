// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_INPUT_VALUE = 'SAVE_INPUT_VALUE'
export const TODOS_ADD = 'TODOS_ADD'
export const TODOS_EXIST = 'TODOS_EXIST'
export const TODOS_REMOVE = 'TODOS_REMOVE'
export const TODOS_EDIT = 'TODOS_EDIT'
export const TODOS_CHANGE = 'TODOS_CHANGE_INPUT_VALUE'
export const TODOS_NEW_VALUE = 'TODOS_NEW_VALUE'

// ------------------------------------
// Actions
// ------------------------------------
export function saveInputValue (todo) {
  return {
    type: SAVE_INPUT_VALUE,
    payload: todo
  }
}

export function add (todo = '') {
  return {
    type: TODOS_ADD,
    payload: todo
  }
}

export function exist () {
  return {
    type: TODOS_EXIST
  }
}

export function remove (todo) {
  return {
    type: TODOS_REMOVE,
    payload: todo
  }
}

export function edit (id) {
  return {
    type: TODOS_EDIT,
    payload: id
  }
}

export function changeTodo (todo) {
  return {
    type: TODOS_CHANGE,
    payload: todo
  }
}

export function saveNewValue () {
  return {
    type: TODOS_NEW_VALUE
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_INPUT_VALUE]: (state, action) => {
    return {
      ...state,
      inputValue: action.payload
    }
  },
  [TODOS_ADD]: (state, action) => {
    return {
      ...state,
      todos: [...state.todos, action.payload],
      inputValue: '',
      alreadyExist: null
    }
  },
  [TODOS_EXIST]: (state, action) => {
    return {
      ...state,
      alreadyExist: true 
    }
  },
  [TODOS_REMOVE]: (state, action) => {
    return {
      ...state,
      todos: state.todos.filter(t => t !== action.payload)
    }
  },
  [TODOS_EDIT]: (state, action) => {
    return {
      ...state,
      edited: action.payload
    }
  },
  [TODOS_CHANGE]: (state, action) => {
    return {
      ...state,
      newName: action.payload
    }
  },
  [TODOS_NEW_VALUE]: (state, action) => {
    return {
      ...state,
      todos: state.todos.map((todo, idx) => state.edited === idx ? state.newName : todo),
      edited: null,
      newName: null
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
// Сheck for state in storage
const persistedState = localStorage.getItem('app_state') 
                        ? JSON.parse(localStorage.getItem('app_state')).todos 
                        : undefined

const initialState = {
  todos: ['Buy milk', 'Do exercises', 'Cook dinner'],
  inputValue: '',
  edited: null,
  newName: null,
  alreadyExist: null
}
export default function todosReducer (state = persistedState || initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
