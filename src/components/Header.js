import React from 'react';
import PropTypes from 'prop-types';
import FilterPanel from '../containers/FilterPanel';
import ControlPanel from '../containers/ControlPanel';
import ModalWindow from '../containers/ModalWindow';
import { View } from 'react-native';
import { visibilityPreset } from '../actions/constants';

/**
 * Управляет отображение панелей:
 * панель фильтров отображается в режиме просмотра списка задач,
 * панель управления отображается при выделении задачи в списке,
 * модально окно отображается при переименовании текста задачи.
 * @param props
 * @return {ReactElement}
 * @constructor
 */
function Header(props) {
  const {
    renameTodo,
    visibilityOfPanels,
    refCPInput,
  } = props;

  return (
    <View>

      { visibilityOfPanels.filterPanel && <FilterPanel /> }
      { visibilityOfPanels.controlPanel && <ControlPanel renameTodo={renameTodo} />}

      <ModalWindow
        refCPInput={refCPInput}
        renameTodo={renameTodo}
        visibilityOfModal={visibilityOfPanels.modalWindow}
      />

    </View>
  );
}

Header.propTypes = {
  renameTodo: PropTypes.func.isRequired,
  visibilityOfPanels: PropTypes.object.isRequired,
  refCPInput: PropTypes.object.isRequired,
};

Header.defaultProps = {
  visibilityOfPanels: visibilityPreset(),
};

export default Header;
