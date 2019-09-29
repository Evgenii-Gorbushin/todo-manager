import { connect } from 'react-redux';
import MainView from '../components/MainView';
import { filters } from '../actions/constants';
import { deleteAllDoneTasks } from '../actions/actions';

const mapStateToProps = (state, ownProps) => ({
  modalWindowExists: state.visibilityOfPanels.modalWindow,
  currentWidth: state.currentWidth,
  showOnlyDoneTasks: (state.filter === filters.HIDE_ACTIVE),
  taskIsNotSelected: (state.selectedItem.id === null),
  refCPInput: ownProps.refCPInput,
  refIPInput: ownProps.refIPInput,
  refFlatList: ownProps.refFlatList,
  todosLength: state.todos
    .filter(item => item.done)
    .length,
  filter: state.filter,
});

const mapDispatchToProps = {
  deleteAllDoneTasks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainView);
