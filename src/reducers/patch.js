/**
 * Флаг разовой реструктуризации Состояния приложения, применяется для контроля за запуском процедуры по реструктуризации.
 * @param state
 * @param action
 * @return {string}
 */
const patch = (state = 'done', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default patch;
