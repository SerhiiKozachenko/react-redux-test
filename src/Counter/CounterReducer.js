// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREASE = 'COUNTER_INCREASE'
export const COUNTER_DECREASE = 'COUNTER_DECREASE'
export const COUNTER_RESET = 'COUNTER_RESET'

// ------------------------------------
// Actions
// ------------------------------------
export function increase (value = 1) {
  return {
    type: COUNTER_INCREASE,
    payload: value
  }
}

export function decrease (value = 1) {
  return {
    type: COUNTER_DECREASE,
    payload: value
  }
}

export function reset () {
  return {
    type: COUNTER_RESET
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREASE]: (state, action) => state + action.payload,
  [COUNTER_DECREASE]: (state, action) => state ? state - action.payload : state,
  [COUNTER_RESET]: (state, action) => 0
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
