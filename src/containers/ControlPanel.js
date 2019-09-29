import { connect } from 'react-redux';
import ControlPanel from '../components/ControlPanel';
import {
  markup,
  namesOfPanels,
} from '../actions/constants';
import {
  deleteTodo,
  doneTodo,
  unselectTodo,
  hidePanel,
  showPanel,
  setScrollOffset,
} from '../actions/actions';

const mapStateToProps = state => ({
  selectedItem: state.selectedItem,
  currentWidth: state.currentWidth,
  scrollOffset: state.scrollOffset,
  scrollToEndOffset: state.scrollToEndOffset,
});

const mapDispatchToProps = {
  showPanel,
  hidePanel,
  doneTodo,
  deleteTodo,
  unselectTodo,
  setScrollOffset,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  selectedItem: stateProps.selectedItem,

  /**
   * Выводит на экран модальное окно для редактирования текста задачи,
   * скрывает панели управления и ввода новой задачи.
   */
  showModal: () => {
    dispatchProps.showPanel(namesOfPanels.MODAL_WINDOW);
    dispatchProps.hidePanel(namesOfPanels.INPUT_PANEL);
    dispatchProps.hidePanel(namesOfPanels.CONTROL_PANEL);
  },

  /**
   * Помечает задачу выделенную пользователем как завершенную, снимает выделение,
   * убирает панель управления и выводит на экран панель фильтров.
   */
  doneTodo: () => {
    dispatchProps.doneTodo(stateProps.selectedItem.id);
    dispatchProps.unselectTodo();
    dispatchProps.showPanel(namesOfPanels.FILTER_PANEL);
    dispatchProps.hidePanel(namesOfPanels.CONTROL_PANEL);
  },

  /**
   * Удаляет из списка задач выбранную пользователем задачу,
   * убирает панель управления и выводит на экран панель фильтров.
   * При необходимости корректирует отступ прокрутки для правильной работы компоненты DraggableFlatList.
   */
  deleteTodo: () => {
    dispatchProps.deleteTodo(stateProps.selectedItem.id);
    dispatchProps.unselectTodo();
    dispatchProps.showPanel(namesOfPanels.FILTER_PANEL);
    dispatchProps.hidePanel(namesOfPanels.CONTROL_PANEL);

    if (stateProps.scrollOffset > 0) {
      let newScrollOffset = stateProps.scrollOffset - markup.todoListItemContainerHeight.fullHeight;

      if (newScrollOffset < 0) {
        newScrollOffset = 0;
      }

      dispatchProps.setScrollOffset(newScrollOffset);
    } else if (stateProps.scrollToEndOffset > 0) {
      let newScrollToEndOffset = stateProps.scrollToEndOffset - markup.todoListItemContainerHeight.fullHeight;

      if (newScrollToEndOffset < 0) {
        newScrollToEndOffset = 0;
      }

      dispatchProps.setScrollOffset(newScrollToEndOffset);
    }
  },

  renameTodo: ownProps.renameTodo,
  currentWidth: stateProps.currentWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ControlPanel);
