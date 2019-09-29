import LocalizedStrings from 'react-native-localization';

// Локализация русского и английского языков для модального окна при переименовании текста задачи.
const language = new LocalizedStrings({
  'en-US': {
    name: 'en',
    modalTitle: 'Edit the text of the task',
  },
  ru: {
    name: 'ru',
    modalTitle: 'Редактирование текста задачи',
  },
});

export default language;
