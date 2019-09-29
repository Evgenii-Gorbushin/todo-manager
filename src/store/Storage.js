import { AsyncStorage } from 'react-native';

const DEV_MODE = false; // true false
const DEV_CLEAR_STORAGE = false;

class Storage {
  static showError(error) {
    return (error === null)
      ? false
      : (error instanceof Array)
        ? error.forEach(item => console.log(item))
        : console.log(error);
  }

  constructor() {
    this.keys = {
      FILTER: 'filter',
      TODOS: 'todos',
      PATCH: 'patch',
    };
    this.actions = {
      SET_ALL: 'SET_ALL',
      GET_ALL: 'GET_ALL',
    };
  }

  async devMode(mode) {
    if (!DEV_MODE) {
      return false;
    }

    if (mode === 'clear') {
      if (DEV_CLEAR_STORAGE) {
        this.asyncClear();
      }

      return false;
    }

    const keys = await this.asyncGetAllKeys();
    const values = await this.asyncMultiGet(keys);

    console.log(keys);
    console.log(values);
  }

  async execute(action) {
    const { actions } = this;

    this.devMode('clear');

    switch (action.type) {
      case actions.SET_ALL:
        this.setAll(action.store);
        break;
      case actions.GET_ALL:
        return await this.getAll()
          .then(result => result);
      default:
        console.log(`The command has not been found: ${action.type}`);
    }

    this.devMode('show');
  }

  setAll(store) {
    const currentStore = store.getState();
    const nextStorage = Object.values(this.keys).map(key => [
      key,
      JSON.stringify(currentStore[key]),
    ]);

    this.asyncMultiSet(nextStorage);
  }

  async getAll() {
    const preloadedStore = {};
    const keys = await this.asyncGetAllKeys();
    const values = await this.asyncMultiGet(keys);

    values.forEach(item => {
      preloadedStore[item[0]] = JSON.parse(item[1]);
    });

    return preloadedStore;
  }

  asyncMultiSet(arr) {
    AsyncStorage.multiSet(arr, errors =>
      Storage.showError(errors)
    );
  }

  asyncMultiGet(keys) {
    return AsyncStorage.multiGet(keys)
      .then(
        result => result,
        errors => Storage.showError(errors)
      );
  }

  asyncGetAllKeys() {
    return AsyncStorage.getAllKeys()
      .then(
        result => result,
        error => Storage.showError(error)
      );
  }

  asyncClear() {
    AsyncStorage.clear(error =>
      Storage.showError(error)
    );
  }
}

export default Storage;
