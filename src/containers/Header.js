import { connect } from 'react-redux';
import Header from '../components/Header';
import { renameTodo, unselectTodo } from '../actions/actions';

const mapStateToProps = state => ({
  visibilityOfPanels: state.visibilityOfPanels,
  selectedItemId: state.selectedItem.id,
});

const mapDispatchToProps = {
  renameTodo,
  unselectTodo,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  visibilityOfPanels: stateProps.visibilityOfPanels,

  /**
   * Изменяет текст задачи.
   * @param {string} text - текст задачи.
   */
  renameTodo: (text) => {
    dispatchProps.renameTodo(stateProps.selectedItemId, text);
    dispatchProps.unselectTodo();
  },

  refCPInput: ownProps.refCPInput,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Header);
