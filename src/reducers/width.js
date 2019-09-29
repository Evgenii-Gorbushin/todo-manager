import { screenWidth } from '../actions/constants';

/**
 * Сохраняет текущее значение ширины экрана устройства.
 * @param state
 * @param action
 * @return {number}
 */
const width = (state = 0, action) => {
  switch (action.type) {
    case screenWidth.STORE_WIDTH:
      return action.currentWidth;
    default:
      return state;
  }
};

export default width;
