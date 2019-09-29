import LocalizedStrings from 'react-native-localization';

// Локализация русского и английского языков для панели управления.
const language = new LocalizedStrings({
  'en-US': {
    name: 'en',
    save: 'Save',
    cancel: 'Cancel',
    ok: 'Ok',
    iosPromptTitle: 'Edit the task',
    alertTitle: 'Delete the task',
    alertMessage: 'Do you want to delete the task?',
  },
  ru: {
    name: 'ru',
    save: 'Сохранить',
    cancel: 'Отмена',
    ok: 'Да',
    iosPromptTitle: 'Редактирование текста задачи',
    alertTitle: 'Удаление задачи',
    alertMessage: 'Вы действительно хотите удалить текущую задачу?',
  },
});

export default language;
