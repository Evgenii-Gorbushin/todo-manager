import LocalizedStrings from 'react-native-localization';

// Локализация русского и английского языков для главного View.
const language = new LocalizedStrings({
  'en-US': {
    cancel: 'Cancel',
    ok: 'Ok',
    alertTitle: 'Clearing the list',
    alertMessage: 'Do you want to delete all done tasks?',
    emptyList: 'No tasks available for deleting',
  },
  ru: {
    cancel: 'Отмена',
    ok: 'Да',
    alertTitle: 'Удаление списка задач',
    alertMessage: 'Вы действительно хотите удалить все завершенные задачи?',
    emptyList: 'Нет задач для удаления',
  },
});

export default language;
