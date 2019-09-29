import { actions } from '../actions/constants';

/**
 * Сохраняет значение отступа контента по вертикали для ScrollView.
 * @param state
 * @param action
 * @return {number}
 */
const scrollOffset = (state = 0, action) => {
  switch (action.type) {
    case actions.SET_SCROLL_OFFSET:
      return action.scrollOffset;
    default:
      return state;
  }
};

export default scrollOffset;
