import LocalizedStrings from 'react-native-localization';

// Локализация русского и английского языков для панели ввода новой задачи.
const language = new LocalizedStrings({
  'en-US': {
    placeholder: 'Enter a new task here',
    name: 'en',
    emptyInputField: 'Enter the text of a new task',
    taskHasBeenAdded: 'The task has been added',
    taskHasBeenAddedOut: 'Added to the list of the active tasks',
  },
  ru: {
    placeholder: 'Текст новой задачи',
    name: 'ru',
    emptyInputField: 'Введите текст новой задачи',
    taskHasBeenAdded: 'Задача добавлена в список',
    taskHasBeenAddedOut: 'Задача была добавлена в список активных задач',
  },
});

export default language;
