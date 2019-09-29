import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SpeechAndroid } from '../../index';
import language from '../localization/InputPanel';
import getStyles from '../styles/InputPanel';
import { markup } from '../actions/constants';
import {
  View,
  TextInput,
  Keyboard,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';

/**
 * Панель служит для ввода текста новой задачи путем его набора на клавиатуре или голосового ввода,
 * затем при нажатии на кнопку "Добавить задачу" происходит ее добавление в список задач.
 */
class InputPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.styles = getStyles(props.currentWidth);

    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._runVoiceRecognition = this._runVoiceRecognition.bind(this);
    this._pressAddButton = this._pressAddButton.bind(this);
  }

  /**
   * Срабатывает в момент скрытия клавиатуры, выводит на экран панель фильтров/управления.
   * @private
   */
  _keyboardDidHide() {
    this.props.keyboardIsHidden();
  }

  /**
   * Срабатывает в момент появления клавиатуры на экране пользователя,
   * скрывает панель: фильтров или управления.
   * @private
   */
  _keyboardDidShow() {
    this.props.keyboardIsShown();
  }

  /**
   * Создает новую задачу в случае, если текст новой задачи был введен пользователем.
   * @private
   */
  async _pressAddButton() {
    const {
      refIPInput,
      addTodo,
    } = this.props;
    const value = (refIPInput.current === null) ? undefined : refIPInput.current._lastNativeText;

    if (value !== undefined && value !== '') {
      addTodo();
    } else {
      ToastAndroid.show(language.emptyInputField, ToastAndroid.LONG);
    }
  }

  /**
   * При нажатии на кнопку микрофона запускает модуль распознавания голоса,
   * полученный текст добавляет в текстовое поля для ввода новой задачи.
   * @return {Promise<void>}
   * @private
   */
  async _runVoiceRecognition() {
    try {
      const { refIPInput } = this.props;
      let spokenText = await SpeechAndroid.startSpeech('Speak', SpeechAndroid.DEFAULT);

      spokenText = spokenText.substr(0, markup.SENTENCE_LENGTH);

      refIPInput.current.setNativeProps({ text: spokenText });
      refIPInput.current._lastNativeText = spokenText;

      //refIPInput.current.focus();
    } catch (error) {
      switch (error.message) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG);
          break;
        default:
          ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
      }
    }
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
  }

  render() {
    const { refIPInput } = this.props;

    return (
      <View style={this.styles.container}>
        <View style={this.styles.inputContainer}>
          <TextInput
            style={this.styles.textInput}
            autoFoces={true}
            maxLength={markup.SENTENCE_LENGTH}
            placeholder={language.placeholder}
            ref={refIPInput}
          />
          <TouchableOpacity onPress={this._runVoiceRecognition}>
            <Image
              resizeMode={'contain'}
              style={this.styles.microphoneIcon}
              source={require('../images/microphone-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <Image
          resizeMode={'contain'}
          style={this.styles.textInputBar}
          source={require('../images/text-input-bar.png')}
        />

        <TouchableOpacity
          onPress={() => {
            this._pressAddButton();
            Keyboard.dismiss();
          }}
        >
          <View style={this.styles.buttonAdd}>
            {
              (language.name === 'en')
                ? <Image
                  resizeMode={'contain'}
                  style={this.styles.imageButtonAdd}
                  source={require('../images/en/button-add.png')}
                />
                : <Image
                  resizeMode={'contain'}
                  style={this.styles.imageButtonAdd}
                  source={require('../images/ru/button-add.png')}
                />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

InputPanel.propTypes = {
  addTodo: PropTypes.func.isRequired,
  keyboardIsHidden: PropTypes.func.isRequired,
  keyboardIsShown: PropTypes.func.isRequired,
  refIPInput: PropTypes.object.isRequired,
  refFlatList: PropTypes.object.isRequired,
  currentWidth: PropTypes.number.isRequired,
};

export default InputPanel;
