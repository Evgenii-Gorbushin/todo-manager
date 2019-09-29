// управление задачами
export const actions = {
  ADD_TODO: 'ADD_TODO',
  DONE_TODO: 'DONE_TODO',
  SET_FILTER: 'SET_FILTER',
  RENAME_TODO: 'RENAME_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SELECT_TODO: 'SELECT_TODO',
  UNSELECT_TODO: 'UNSELECT_TODO',
  REARRANGE_TODO: 'REARRANGE_TODO',
  DELETE_ALL_DONE_TASKS: 'DELETE_ALL_DONE_TASKS',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
  SET_SCROLL_TO_END_OFFSET: 'SET_SCROLL_TO_END_OFFSET',
  SET_TODO_CONTAINER_HEIGHT: 'SET_TODO_CONTAINER_HEIGHT',
};

// фильтры для списка задач
export const filters = {
  HIDE_DONE: 'HIDE_DONE',
  HIDE_ACTIVE: 'HIDE_ACTIVE',
  SHOW_ALL: 'SHOW_ALL',
};

// видимость панелей
export const visibility = {
  SHOW_PANEL: 'SHOW_PANEL',
  HIDE_PANEL: 'HIDE_PANEL',
};

// имена панелей
export const namesOfPanels = {
  FILTER_PANEL: 'filterPanel',
  CONTROL_PANEL: 'controlPanel',
  INPUT_PANEL: 'inputPanel',
  MODAL_WINDOW: 'modalWindow',
};

// Сохранение текущего значения ширины окна.
export const screenWidth = {
  STORE_WIDTH: 'STORE_WIDTH',
};

// пресет видимости панелей окон.
export const visibilityPreset = () => ({
  filterPanel: true,
  inputPanel: true,
  controlPanel: false,
  modalWindow: false,
});

// пресет выделенной задачи.
export const selectedItemPreset = () => ({
  id: null,
  text: '',
  done: false,
});

// предопределенные значения свойств стилей и параметров устройства на котором запущено приложение.
export const markup = {
  flanks: 20,
  fontSizeThreeLine: 20,
  fontSize: 20,
  densityRation: 1,
  density: 2.625,
  MAX_FLANKS: 20,
  MIN_FLANKS: 10,
  MAX_FONT_SIZE: 20,
  MIN_FONT_SIZE: 16,
  MAX_FONT_SIZE_THREE_LINE: 17,
  MIN_FONT_SIZE_THREE_LINE: 13,
  SENTENCE_LENGTH: 90,
  LETTERS_IN_TWO_LINES: 50,
  FONT_FAMILY: 'PF DinDisplay Pro',
  FONT_COLOR: '#616161',
  BACKGROUND: '#f3f3f3',
  BASIS_DENSITY: 2.625,
  BASIC_WIDTH: 411,
  todoListItemContainerHeight: {
    FROM: 70,
    TO: 52,
    fullHeight: 0,
  },
};
