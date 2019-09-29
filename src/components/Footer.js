import React from 'react';
import PropTypes from 'prop-types';
import InputPanel from '../containers/InputPanel';
import { visibilityPreset } from '../actions/constants';

/**
 * Управляет отображением панели ввода текста для новых задач.
 * Панель скрывается по время отображения модального окна при переименовании текста задачи.
 * @param props
 * @return {boolean|ReactElement}
 * @constructor
 */
function Footer(props) {
  const {
    visibilityOfPanels,
    refIPInput,
    refFlatList,
  } = props;

  return visibilityOfPanels.inputPanel &&
    <InputPanel
      refIPInput={refIPInput}
      refFlatList={refFlatList}
    />;
}

Footer.propTypes = {
  visibilityOfPanels: PropTypes.object.isRequired,
  refIPInput: PropTypes.object.isRequired,
  refFlatList: PropTypes.object.isRequired,
};

Footer.defaultProps = {
  visibilityOfPanels: visibilityPreset(),
};

export default Footer;
