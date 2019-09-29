import { visibility, visibilityPreset } from '../actions/constants';

/**
 * Изменяет признак отображения на экране для панелей:
 * управления, фильтров, ввода новой задачи, модального окна при редактировании текста задачи.
 * @param state
 * @param action
 * @return {Object}
 */
const visibilityOfPanels = (state = visibilityPreset(), action) => {
  switch (action.type) {
    case visibility.SHOW_PANEL:
      return Object.assign({}, state, { [action.name]: true });
    case visibility.HIDE_PANEL:
      return Object.assign({}, state, { [action.name]: false });
    default:
      return state;
  }
};

export default visibilityOfPanels;
