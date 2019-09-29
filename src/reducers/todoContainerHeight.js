import { actions } from '../actions/constants';

const todoContainerHeight = (state = 0, action) => {
  switch (action.type) {
    case actions.SET_TODO_CONTAINER_HEIGHT:
      return action.height;
    default:
      return state;
  }
};

export default todoContainerHeight;
