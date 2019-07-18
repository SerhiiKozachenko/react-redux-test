import { connect } from 'react-redux'
import { saveInputValue, 
         add,
         exist,
         remove,
         edit,
         changeTodo,
         saveNewValue } from './TodosReducer'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Todos from './Todos'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  saveInputValue: (todo) => saveInputValue(todo),
  add: (todo) => add(todo),
  exist: () => exist(),
  remove: (todo) => remove(todo),
  edit: (id) => edit(id),
  changeTodo: (todo) => changeTodo(todo),
  saveNewValue: (todo) => saveNewValue(todo)
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  inputValue: state.inputValue,
  edited: state.edited,
  alreadyExist: state.alreadyExist
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
