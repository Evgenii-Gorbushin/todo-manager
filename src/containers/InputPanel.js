import { connect } from 'react-redux';
import { getIdNumber, getTasksByFilter } from '../auxiliary/functions';
import InputPanel from '../components/InputPanel';
import language from '../localization/InputPanel';
import {
  InteractionManager,
  ToastAndroid,
} from 'react-native';
import {
  filters,
  namesOfPanels,
  markup,
} from '../actions/constants';
import {
  addTodo,
  hidePanel,
  setFilter,
  showPanel,
  setScrollOffset,
  setScrollToEndOffset,
} from '../actions/actions';

const mapStateToProps = state => ({
  visibilityOfModal: state.visibilityOfPanels.modalWindow,
  selectedItemId: state.selectedItem.id,
  filter: state.filter,
  currentWidth: state.currentWidth,
  todoContainerHeight: state.todoContainerHeight,
  todoListLength: getTasksByFilter(state.todos, state.filter).length,
  scrollToEndOffset: state.scrollToEndOffset,
});

const mapDispatchToProps = {
  setFilter,
  addTodo,
  hidePanel,
  showPanel,
  setScrollOffset,
  setScrollToEndOffset,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  /**
   * Выводит на экран панель фильтров/управления,
   * в момент скрытия экранной клавиатуры.
   */
  keyboardIsHidden: () => {
    if (stateProps.selectedItemId === null) {
      dispatchProps.showPanel(namesOfPanels.FILTER_PANEL);
    } else {
      dispatchProps.showPanel(namesOfPanels.CONTROL_PANEL);
    }
  },

  /**
   * Скрывает панель фильтров/управления,
   * в момент отображения на экране экранной клавиатуры.
   */
  keyboardIsShown: () => {
    if (stateProps.selectedItemId === null) {
      dispatchProps.hidePanel(namesOfPanels.FILTER_PANEL);
    } else {
      dispatchProps.hidePanel(namesOfPanels.CONTROL_PANEL);
    }
  },

  /**
   * Создает новую задачу в случае, если пользователь ввел текст новой задачи в панель ввода
   * и нажал кнопку "Добавить задачу" или ok на экранной клавиатуре, при этом если текущее значение фильтра
   * для списка задач установлено на отображение только завешенных задач, то устанавливается новое
   * значение фильтра - показать все задачи.
   * В случае если список задач имеет полосу прокрутки,
   * устанавливает значение отступа контента по вертикали при полной прокрутки вниз,
   * которая происходит автоматически при добавлении новой задачи
   * (это необходимо для правильной работы компоненты DraggableFlatList).
   * @return {boolean}
   */
  addTodo: () => {
    const value = ownProps.refIPInput.current._lastNativeText;

    if (value === undefined || value === '') {
      return false;
    }

    const filter_show_all = filters.SHOW_ALL;
    const taskId = getIdNumber();

    if (stateProps.filter === filters.HIDE_ACTIVE) {
      // 1 из 3
      // dispatchProps.setFilter(filter_show_all);

      ToastAndroid.show(language.taskHasBeenAddedOut, ToastAndroid.LONG);
    } else {
      const fullHeightTodoList = Math.round((stateProps.todoListLength + 1) * markup.todoListItemContainerHeight.fullHeight);
      const todoListHeightOffset = fullHeightTodoList - stateProps.todoContainerHeight;

      if (todoListHeightOffset > 0) {
        // ВНИМАНИЕ: функционал не закончен до конца.
        // функционал: при создании новой задачи она добавляется в конец списка,
        // после чего список прокручивается до конца вниз.
        // проблема: прокрутка осуществляется с помощью метода scrollToEnd,
        // который не инициирует никаких событий связанных с прокруткой,
        // и как следствие компонента DraggableFlatList некорректно позиционирует перетаскиваемый элемент.

        // 2 из 3
        // if (stateProps.scrollToEndOffset === 0) {
        //   dispatchProps.setScrollOffset(0);
        //   dispatchProps.setScrollToEndOffset(todoListHeightOffset);
        //
        //   InteractionManager.runAfterInteractions(() => {
        //     ownProps.refFlatList.current.scrollToEnd();
        //   });
        // } else {
        ToastAndroid.show(language.taskHasBeenAdded, ToastAndroid.LONG);
        // }
      }
    }

    ownProps.refIPInput.current.clear();
    ownProps.refIPInput.current._lastNativeText = '';

    dispatchProps.addTodo(taskId, value);
  },

  refIPInput: ownProps.refIPInput,
  refFlatList: ownProps.refFlatList,
  currentWidth: stateProps.currentWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InputPanel);
