import { actions, selectedItemPreset } from '../actions/constants';

/**
 * Сохраняет/обнуляет данные о выделенной пользователем задаче
 * @param state
 * @param action
 * @return {Object}
 */
const selectedItem = (state = selectedItemPreset(), action) => {
  switch (action.type) {
    case actions.SELECT_TODO:
      return {
        id: action.id,
        text: action.text,
        done: action.done,
      };
    case actions.UNSELECT_TODO:
      return selectedItemPreset();
    default:
      return state;
  }
};

export default selectedItem;
