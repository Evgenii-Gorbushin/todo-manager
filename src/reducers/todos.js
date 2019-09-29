import { actions } from '../actions/constants';

/**
 * Производит операции со списком задач:
 * создание, удаление, переименование, пометка задачи как завершенной, отмена пометки о завершенности.
 * @param state
 * @param action
 * @return {Array}
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    case actions.DONE_TODO:
      return state.map(item => (item.id === action.id)
        ? {
          ...item,
          done: !item.done,
        }
        : item
      );
    case actions.DELETE_TODO:
      return state.filter(
        item =>
          item.id !== action.id
      );
    case actions.RENAME_TODO:
      return state.map(item =>
        (item.id === action.id)
          ? {
            ...item,
            text: action.text,
          }
          : item
      );
    case actions.REARRANGE_TODO:
      // eslint-disable-next-line no-case-declarations
      const rearrangedTodo = [];

      state.forEach(task => {
        if (task.id !== action.draggableTask.id) {
          if (task.id === action.destinationTaskId) {
            if (action.taskHasToBePrepended) {
              rearrangedTodo.push(action.draggableTask);
              rearrangedTodo.push(task);
            } else {
              rearrangedTodo.push(task);
              rearrangedTodo.push(action.draggableTask);
            }
          } else {
            rearrangedTodo.push(task);
          }
        }
      });

      return rearrangedTodo;
    case actions.DELETE_ALL_DONE_TASKS:
      return state.filter(item => !item.done);
    default:
      return state;
  }
};

export default todos;
