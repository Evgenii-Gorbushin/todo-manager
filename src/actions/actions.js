import {
  actions,
  visibility,
  screenWidth,
} from './constants';

/**
 * Вывести панель на экран.
 * @param {string} name - имя панели.
 * @return {{name: string, type: string}}
 */
export const showPanel = (name) => ({
  type: visibility.SHOW_PANEL,
  name,
});

/**
 * Скрыть панель с экрана.
 * @param {string} name
 * @return {{name: string, type: string}}
 */
export const hidePanel = (name) => ({
  type: visibility.HIDE_PANEL,
  name,
});

/**
 * Добавить новую задачу к списку задать.
 * @param {number} id - индекс задачи.
 * @param {string} text - текст задачи.
 * @return {{id: number, text: string, type: string}}
 */
export const addTodo = (id, text) => ({
  type: actions.ADD_TODO,
  id,
  text,
});

/**
 * Сохраняет новый порядок списка задач,
 * после того как задача была перемещена (перетаскиванием) пользователем на новую позицию.
 * @param {Object} draggableTask - перетаскиваемая пользователем задача.
 * @param {number} destinationTaskId - задача, на место которой необходимо переместить перетаскиваемую задачу.
 * @param {boolean} taskHasToBePrepended - определяет должна ли перетаскиваемая задача быть помещена перед (true) задачей,
 * на место которой она перемещается, или после (false) нее.
 * @return {{taskHasToBePrepended: boolean, type: string, draggableTask: Object, destinationTaskId: number}}
 */
export const rearrangeTodo = (draggableTask, destinationTaskId, taskHasToBePrepended) => ({
  type: actions.REARRANGE_TODO,
  draggableTask,
  destinationTaskId,
  taskHasToBePrepended,
});

/**
 * Пометить задачу как завершенную.
 * @param {number} id - индекс задачи.
 * @return {{id: number, type: string}}
 */
export const doneTodo = (id) => ({
  type: actions.DONE_TODO,
  id,
});

/**
 * Установить фильтр для списка задач.
 * @param {string} filter
 * @return {{filter: string, type: string}}
 */
export const setFilter = filter => ({
  type: actions.SET_FILTER,
  filter,
});

/**
 * Изменить текст задачи.
 * @param {number} id - индекс задачи.
 * @param {string} text - текст задачи.
 * @return {{id: number, text: string, type: string}}
 */
export const renameTodo = (id, text) => ({
  type: actions.RENAME_TODO,
  id,
  text,
});

/**
 * Удалить задачу.
 * @param {number} id - индекс задачи.
 * @return {{id: *, type: string}}
 */
export const deleteTodo = (id) => ({
  type: actions.DELETE_TODO,
  id,
});

/**
 * Удаляет все задачи помеченные как завершенные.
 * @return {{type: string}}
 */
export const deleteAllDoneTasks = () => ({
  type: actions.DELETE_ALL_DONE_TASKS,
});

/**
 * Выделить задачу на экране, в результате отобразится панель управления этой задачей.
 * @param {{id: number, text: string, done: boolean}[]} item
 * @return {{type: string}}
 */
export const selectTodo = (item) => ({
  type: actions.SELECT_TODO,
  ...item,
});

/**
 * Отменить выделение задачи на экране, в результате отобразится панель фильтров.
 * @return {{type: string}}
 */
export const unselectTodo = () => ({
  type: actions.UNSELECT_TODO,
});

/**
 * Сохраняет текущее значение ширины окна.
 * @param {number} currentWidth - текущее значение ширины окна.
 * @return {{storeWidth: number, type: string}}
 */
export const storeCurrentWidth = (currentWidth) => ({
  type: screenWidth.STORE_WIDTH,
  currentWidth,
});

/**
 * Сохраняет значение параметра высоты для TO-DO контейнера.
 * @param {number} height - высота TO-DO контейнера.
 * @return {{type: string, height: number}}
 */
export const setTodoContainerHeight = (height) => ({
  type: actions.SET_TODO_CONTAINER_HEIGHT,
  height,
});

/**
 * В момент окончания прокрутки списка,
 * сохраняет значение отступа контента по вертикали для ScrollView (список задач).
 * @param {number} scrollOffset - значение отступа контента по вертикали для ScrollView (список задач).
 * @return {{scrollOffset: number, type: string}}
 */
export const setScrollOffset = (scrollOffset) => ({
  type: actions.SET_SCROLL_OFFSET,
  scrollOffset,
});

/**
 * Сохраняет значение отступа прокрутки для случая, когда список задач прокручен по упора вниз.
 * @param {number} offset - значение отступа прокрутки.
 * @return {{offset: number, type: string}}
 */
export const setScrollToEndOffset = (offset) => ({
  type: actions.SET_SCROLL_TO_END_OFFSET,
  offset,
});
