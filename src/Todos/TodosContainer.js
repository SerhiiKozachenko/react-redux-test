import { connect } from 'react-redux'
import { add, remove, edit } from './TodosReducer'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Todos from './Todos'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  add: (todo) => add(todo),
  remove: (todo) => remove(todo),
  edit: (prev, updated) => edit(prev, updated)
}

const mapStateToProps = (state) => ({
  todos: state.todos
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
