import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { namesOfPanels } from '../actions/constants';
import { getTasksByFilter } from '../auxiliary/functions';
import {
  showPanel,
  hidePanel,
  selectTodo,
  unselectTodo,
  rearrangeTodo,
  setScrollOffset,
  setScrollToEndOffset,
  setTodoContainerHeight,
} from '../actions/actions';

const mapStateToProps = (state, ownProps) => ({
  todos: getTasksByFilter(state.todos, state.filter),
  selectedItem: {
    id: state.selectedItem.id,
  },
  currentWidth: state.currentWidth,
  scrollOffset: state.scrollOffset,
  scrollToEndOffset: state.scrollToEndOffset,
  todoContainerHeight: state.todoContainerHeight,
  refFlatList: ownProps.refFlatList,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Помечает выбранную пользователем задачу на экране,
   * скрывает панель фильтров, отображает панель управления.
   * @param {Array} item
   */
  selectTodo: (item) => {
    dispatch(selectTodo(item));
    dispatch(hidePanel(namesOfPanels.FILTER_PANEL));
    dispatch(showPanel(namesOfPanels.CONTROL_PANEL));
  },

  /**
   * Снимает пометку с задачи,
   * скрывает панель управления,
   * отображает панель фильтров.
   */
  unselectTodo: () => {
    dispatch(unselectTodo());
    dispatch(showPanel(namesOfPanels.FILTER_PANEL));
    dispatch(hidePanel(namesOfPanels.CONTROL_PANEL));
  },

  /**
   /**
   * Сохраняет новый порядок списка задач,
   * после того как задача была перемещена (перетаскиванием) пользователем на новую позицию.
   * @param {Object} draggableTask - перетаскиваемая пользователем задача.
   * @param {number} destinationTaskId - задача, на место которой необходимо переместить перетаскиваемую задачу.
   * @param {boolean} taskHasToBePrepended - определяет должна ли перетаскиваемая задача быть помещена перед (true) задачей,
   * на место которой она перемещается, или после (false) нее.
   * @return {*}
   */
  rearrangeTodo: (draggableTask, destinationTaskId, taskHasToBePrepended) =>
    dispatch(rearrangeTodo(draggableTask, destinationTaskId, taskHasToBePrepended)),

  /**
   * В момент окончания прокрутки списка задач пользователем,
   * сохраняет значение отступа контента по вертикали для ScrollView (список задач),
   * обнуляет значение отступа контента по вертикали при полной прокрутки вниз (происходит при добавлении новых задач).
   * @param {Object} nativeEvent - объект возвращаемый событиями: onScrollEndDrag, onMomentumScrollEnd.
   * @return {*}
   */
  setScrollOffset: (nativeEvent) => {
    dispatch(setScrollOffset(nativeEvent.contentOffset.y));
    dispatch(setScrollToEndOffset(0));
  },

  /**
   * Сохраняет значение параметра высоты для TO-DO контейнера.
   * @param {number} height - высота TO-DO контейнера.
   * @return {*}
   */
  setTodoContainerHeight: (height) =>
    dispatch(setTodoContainerHeight(height)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
