import { combineReducers } from 'redux';
import todos from './todos';
import filter from './filter';
import width from './width';
import patch from './patch';
import selectedItem from './selectedItem';
import scrollOffset from './scrollOffset';
import scrollToEndOffset from './scrollToEndOffset';
import todoContainerHeight from './todoContainerHeight';
import visibilityOfPanels from './visibilityOfPanels';

export default combineReducers({
  todos,
  filter,
  patch,
  currentWidth: width,
  selectedItem,
  scrollOffset,
  scrollToEndOffset,
  visibilityOfPanels,
  todoContainerHeight,
});
