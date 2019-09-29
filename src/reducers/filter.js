import { actions, filters } from '../actions/constants';

/**
 * Изменяет значение фильтра для списка задач.
 * @param state
 * @param action
 * @return {string}
 */
const filter = (state = filters.SHOW_ALL, action) => {
  switch (action.type) {
    case actions.SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default filter;
