import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getStyles from '../styles/MainView';
import Header from '../containers/Header';
import TodoList from '../containers/TodoList';
import Footer from '../containers/Footer';
import { visibilityPreset } from '../actions/constants';
import language from '../localization/MainView';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';

/**
 * Выводит основные компоненты приложения, в случае отображения модального окна
 * (при переименовании текста задачи) выводит прозрачный фон.
 */
class MainView extends Component {
  constructor(props) {
    super(props);

    this._onPressDelete = this._onPressDelete.bind(this);

    this.state = {
      /**
       * 3 из 3
       * Компонента DraggableFlatList скрывается и тут же отображается:
       * это необходимо для того, чтобы использовать встроенную фитчу FlatList,
       * в результате которой происходит сброс прокрутки и список отображается с первого элемента.
       * Если этого не делать, то DraggableFlatList неверно рассчитывает offset для перетаскиваемого элемента,
       * то приводит к его отображению значительно выше/ниже от пальца пользователя.
       */
      todoListIsHidden: false,
    };
  }

  /**
   * Выводит модальное окно с запросом на удаление задачи.
   * @private
   */
  _onPressDelete() {
    if (this.props.todosLength > 0) {
      Alert.alert(
        language.alertTitle,
        language.alertMessage,
        [
          { text: language.ok, onPress: () => this.props.deleteAllDoneTasks() },
          { text: language.cancel, style: 'cancel' },
        ]
      );
    } else {
      ToastAndroid.show(language.emptyList, ToastAndroid.LONG);
    }
  }

  componentDidUpdate() {
    if (this.state.todoListIsHidden) {
      this.setState({
        todoListIsHidden: false,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.setState({
        todoListIsHidden: true,
      });

      return false;
    }

    return true;
  }

  render() {
    const {
      modalWindowExists,
      showOnlyDoneTasks,
      currentWidth,
      refCPInput,
      refIPInput,
      refFlatList,
      taskIsNotSelected,
    } = this.props;
    const styles = getStyles(currentWidth);

    return (
      <View style={styles.container}>
        {
          modalWindowExists
          &&
          <View style={styles.transparentBackground} />
        }
        {
          showOnlyDoneTasks
          &&
          taskIsNotSelected
          &&
          <View style={styles.buttonBasket}>
            <TouchableOpacity onPress={this._onPressDelete}>
              <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={require('../images/basket-icon.png')}
              />
            </TouchableOpacity>
          </View>
        }
        <ImageBackground
          source={require('../images/background-top.png')}
          style={styles.background}
        />
        <Header
          refCPInput={refCPInput}
        />
        {
          this.state.todoListIsHidden
          ||
          <TodoList
            refFlatList={refFlatList}
          />
        }
        <Footer
          refIPInput={refIPInput}
          refFlatList={refFlatList}
        />
      </View>
    );
  }
}

MainView.propTypes = {
  modalWindowExists: PropTypes.bool.isRequired,
  showOnlyDoneTasks: PropTypes.bool.isRequired,
  taskIsNotSelected: PropTypes.bool.isRequired,
  currentWidth: PropTypes.number.isRequired,
  refCPInput: PropTypes.object.isRequired,
  refIPInput: PropTypes.object.isRequired,
  refFlatList: PropTypes.object.isRequired,
  deleteAllDoneTasks: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
};

MainView.defaultProps = {
  visibilityOfPanels: visibilityPreset(),
};

export default MainView;
