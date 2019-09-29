import { actions } from '../actions/constants';

const scrollToEndOffset = (state = 0, action) => {
  switch (action.type) {
    case actions.SET_SCROLL_TO_END_OFFSET:
      return action.offset;
    default:
      return state;
  }
};

export default scrollToEndOffset;
