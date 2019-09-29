import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Storage from '../store/Storage';
import MainView from '../containers/MainView';
import { getIdNumber } from '../auxiliary/functions';
import { storeCurrentWidth } from '../actions/actions';
import { changeMarkupProperties, setDensity } from '../styles/functions';
import {
  Text,
  YellowBox,
  AppState,
  Dimensions,
  PixelRatio,
} from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

/**
 * Инициализирует хранилище приложения, ref ссылки.
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.refIPInput = React.createRef();
    this.refCPInput = React.createRef();
    this.refFlatList = React.createRef();

    this.storage = new Storage();
    this.store = null;
    this.setupStore();

    setDensity(PixelRatio.get());

    this._appStateChange = this._appStateChange.bind(this);
    this._flexibleMarkup = this._flexibleMarkup.bind(this);
  }

  /**
   * Сохраняет состояние в хранилище устройства в момент, когда приложение переводится в background.
   * @param {string} nextAppState - значение состояния приложения.
   * @private
   */
  _appStateChange(nextAppState) {
    if (nextAppState === 'background') {
      this.storage.execute({
        type: this.storage.actions.SET_ALL,
        store: this.store,
      });
    }
  }

  /**
   * Срабатывает при изменении ориентации экрана, сохраняет новое значение ширины экрана.
   * @param {Object} newDimensions - содержит значения ширины и высоты экрана.
   * @private
   */
  _flexibleMarkup(newDimensions) {
    if (this.store) {
      const currentWidth = Math.round(newDimensions.window.width);

      changeMarkupProperties(currentWidth);
      this.store.dispatch(
        storeCurrentWidth(currentWidth)
      );
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._appStateChange);
    Dimensions.addEventListener('change', this._flexibleMarkup);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._appStateChange);
    Dimensions.removeEventListener('change', this._flexibleMarkup);
  }

  /**
   * Производит реструктуризацию Состояния приложения в случае, если в хранилище устройства отсутствуют
   * контрольные переменные, символизирующие о том, что процесс реструктуризации уже был произведен ранее.
   * @param {Object} preloadedState - Состояние полученное из хранилища устройства при запуске приложения.
   */
  changeOfStatePermanently(preloadedState) {
    // использование в качестве id рандомного числа.
    if (preloadedState.patch === undefined) {
      if (preloadedState.todos !== undefined) {
        preloadedState.todos.forEach(item => {
          item.id = getIdNumber();
        });
      }
    }
  }

  /**
   * Считывает сохраненное Состояние из хранилища телефона и
   * использует его в качестве предопределенного при инициализации Состояния в момент запуска приложения.
   * @return {Promise<void>}
   */
  async setupStore() {
    const preloadedState = await this.storage.execute({
      type: this.storage.actions.GET_ALL,
    });

    preloadedState.currentWidth = Math.round(Dimensions.get('screen').width);
    changeMarkupProperties(preloadedState.currentWidth);

    this.changeOfStatePermanently(preloadedState);

    this.store = configureStore(preloadedState);
    this.forceUpdate();
  }

  render() {
    const {
      store,
      refCPInput,
      refIPInput,
      refFlatList,
    } = this;

    return (store === null)
      ? (
        <Text>*</Text>
      )
      : (
        <Provider store={store}>
          <MainView
            refCPInput={refCPInput}
            refIPInput={refIPInput}
            refFlatList={refFlatList}
          />
        </Provider>
      );
  }
}
