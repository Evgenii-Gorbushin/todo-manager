import { filters } from '../actions/constants';

/**
 * Генерирует рандомный номер в качестве id новой задачи.
 * @return {number}
 */
export function getIdNumber() {
  return Math.random() * (100000 - 1) + 1;
}

/**
 * Возвращает список задач, отобранный по фильтру.
 * @param {array} todos - список задач.
 * @param {string} filter - фильтр отбора задач.
 * @return {array}
 */
export function getTasksByFilter(todos, filter) {
  return (filter === filters.SHOW_ALL)
    ? todos.slice()
    : todos.filter(item =>
      (filter === filters.HIDE_ACTIVE)
        ? item.done
        : !item.done
    );
}
