import { connect } from 'react-redux';
import ModalWindow from '../components/ModalWindow';
import { namesOfPanels } from '../actions/constants';
import {
  hidePanel,
  showPanel,
} from '../actions/actions';

const mapStateToProps = state => ({
  selectedItemText: state.selectedItem.text,
  currentWidth: state.currentWidth,
});

const mapDispatchToProps = {
  hidePanel,
  showPanel,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  selectedItemText: stateProps.selectedItemText,

  /**
   * Скрывает модальное окно, отображает панель ввода новой задачи.
   */
  hideModal: () => {
    dispatchProps.hidePanel(namesOfPanels.MODAL_WINDOW);
    dispatchProps.showPanel(namesOfPanels.INPUT_PANEL);
  },

  refCPInput: ownProps.refCPInput,
  renameTodo: ownProps.renameTodo,
  visibilityOfModal: ownProps.visibilityOfModal,
  currentWidth: stateProps.currentWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ModalWindow);
