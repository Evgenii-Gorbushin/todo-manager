import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import language from '../localization/ModalWindow';
import getStyles from '../styles/ModalWindow';
import { markup } from '../actions/constants';
import {
  Modal,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

/**
 * Модальное окно для переименования текста задачи.
 */
class ModalWindow extends PureComponent {
  constructor(props) {
    super(props);

    this.styles = getStyles(props.currentWidth);

    this._onShow = this._onShow.bind(this);
    this._renameTodo = this._renameTodo.bind(this);
  }

  /**
   * Срабатывает в момент отображения модального окна на экране,
   * в текстовое поле добавляется текст редактируемой задачи.
   * @private
   */
  _onShow() {
    const refCPInput = this.props.refCPInput.current;
    const { selectedItemText } = this.props;

    refCPInput._lastNativeText = selectedItemText;
    refCPInput.setNativeProps({
      text: selectedItemText,
    });
    refCPInput.focus();
  }

  /**
   * Если текст был изменен, то производит переименование текста задачи.
   * @private
   */
  _renameTodo() {
    const { hideModal, renameTodo, refCPInput } = this.props;
    const value = refCPInput.current._lastNativeText;

    if (value != null && value !== '') {
      renameTodo(value);
      hideModal();
    }
  }

  render() {
    const { _renameTodo, _onShow } = this;
    const { visibilityOfModal, refCPInput, hideModal } = this.props;

    return (
      <Modal
        visible={visibilityOfModal}
        transparent={true}
        onRequestClose={() => hideModal()}
        onShow={_onShow}
        animationType="slide"
      >
        <View style={this.styles.container}>
          <View style={this.styles.innerContainer}>

            <Text style={this.styles.title}>
              {language.modalTitle}
            </Text>

            <View style={this.styles.inputContainer}>
              <TextInput
                style={this.styles.textInput}
                maxLength={markup.SENTENCE_LENGTH}
                ref={refCPInput}
                underlineColorAndroid={'transparent'}
                multiline={true}
                numberOfLines={4}
                textAlignVertical={'bottom'}
              />
            </View>

            <Image
              resizeMode={'contain'}
              style={this.styles.textInputBar}
              source={require('../images/text-input-bar.png')}
            />

            <View style={this.styles.buttonsContainer}>

              <TouchableOpacity onPress={_renameTodo}>
                <View style={this.styles.buttonCancelSave}>
                  {
                    (language.name === 'en')
                      ? <Image
                        resizeMode={'contain'}
                        style={this.styles.imageButton}
                        source={require('../images/en/button-save.png')}
                      />
                      : <Image
                        resizeMode={'contain'}
                        style={this.styles.imageButton}
                        source={require('../images/ru/button-save.png')}
                      />
                  }
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => hideModal()}>
                <View style={this.styles.buttonCancelSave}>
                  {
                    (language.name === 'en')
                      ? <Image
                        resizeMode={'contain'}
                        style={this.styles.imageButton}
                        source={require('../images/en/button-cancel-active.png')}
                      />
                      : <Image
                        resizeMode={'contain'}
                        style={this.styles.imageButton}
                        source={require('../images/ru/button-cancel-active.png')}
                      />
                  }
                </View>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

ModalWindow.propTypes = {
  renameTodo: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  refCPInput: PropTypes.object.isRequired,
  selectedItemText: PropTypes.string.isRequired,
  visibilityOfModal: PropTypes.bool.isRequired,
  currentWidth: PropTypes.number.isRequired,
};

export default ModalWindow;
