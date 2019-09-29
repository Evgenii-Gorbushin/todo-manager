import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { selectedItemPreset } from '../actions/constants';
import language from '../localization/ControlPanel';
import getStyles from '../styles/FilterControlPanels';
import {
  View,
  Alert,
  AlertIOS,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

/**
 * Панель управления выделенной задачей, позволяет совершать следующие действия над задачей:
 * удалить, переименовать, пометить как завершенную, отменить пометку завершенности.
 */
class ControlPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.styles = getStyles(props.currentWidth);

    this._onPressDelete = this._onPressDelete.bind(this);
    this._onPressRename = this._onPressRename.bind(this);
  }

  /**
   * Выводит модальное окно с запросом на удаление задачи.
   * @private
   */
  _onPressDelete() {
    const { deleteTodo } = this.props;

    Alert.alert(
      language.alertTitle,
      language.alertMessage,
      [
        { text: language.ok, onPress: () => deleteTodo() },
        { text: language.cancel, style: 'cancel' },
      ]
    );
  }

  /**
   * Выводит модальное окно для изменения текста задачи.
   * @private
   */
  _onPressRename() {
    const { showModal, renameTodo, selectedItem } = this.props;

    if (Platform.OS === 'ios') {
      AlertIOS.prompt(
        language.iosPromptTitle,
        null,
        [
          { text: language.cancel, style: 'cancel' },
          { text: language.save, onPress: (newTextTodo) => renameTodo(newTextTodo) },
        ],
        'plain-text',
        selectedItem.text
      );
    } else { //android
      showModal();
    }
  }

  render() {
    const { selectedItem, doneTodo } = this.props;

    return (
      <View style={this.styles.controlContainer}>

        <View style={this.styles.buttonCancelFinishEdit}>
          <TouchableOpacity onPress={doneTodo}>
            {
              (selectedItem.done)
                ? (
                  (language.name === 'en')
                    ? <Image
                      resizeMode={'contain'}
                      style={this.styles.imageButton}
                      source={require('../images/en/button-cancel.png')}
                    />
                    : <Image
                      resizeMode={'contain'}
                      style={this.styles.imageButton}
                      source={require('../images/ru/button-cancel.png')}
                    />
                )
                : (
                  (language.name === 'en')
                    ? <Image
                      resizeMode={'contain'}
                      style={this.styles.imageButton}
                      source={require('../images/en/button-finish.png')}
                    />
                    : <Image
                      resizeMode={'contain'}
                      style={this.styles.imageButton}
                      source={require('../images/ru/button-finish.png')}
                    />
                )
            }
          </TouchableOpacity>
        </View>

        <View style={this.styles.buttonCancelFinishEdit}>
          <TouchableOpacity onPress={this._onPressRename}>
            {
              (language.name === 'en')
                ? <Image
                  resizeMode={'contain'}
                  style={this.styles.imageButton}
                  source={require('../images/en/button-edit.png')}
                />
                : <Image
                  resizeMode={'contain'}
                  style={this.styles.imageButton}
                  source={require('../images/ru/button-edit.png')}
                />
            }
          </TouchableOpacity>
        </View>

        <View style={this.styles.buttonDelete}>
          <TouchableOpacity onPress={this._onPressDelete}>
            <Image
              resizeMode={'contain'}
              style={this.styles.imageButton}
              source={require('../images/en/button-delete.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

ControlPanel.propTypes = {
  showModal: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  renameTodo: PropTypes.func.isRequired,
  doneTodo: PropTypes.func.isRequired,
  currentWidth: PropTypes.number.isRequired,
  selectedItem: PropTypes.object,
};

ControlPanel.defaultProps = {
  selectedItem: selectedItemPreset(),
};

export default ControlPanel;
