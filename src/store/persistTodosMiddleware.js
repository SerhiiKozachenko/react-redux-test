import { TODOS_ADD, TODOS_REMOVE, TODOS_EDIT } from '../Todos/TodosReducer';

const neededActions = [TODOS_ADD, TODOS_REMOVE, TODOS_EDIT];

export default ({ getState }) => next => action => {
  next(action);

  if (neededActions.includes(action.type)) {
    localStorage.setItem('todos', JSON.stringify(getState().todos))
  }
}