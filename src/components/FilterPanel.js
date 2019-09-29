import React from 'react';
import PropTypes from 'prop-types';
import { filters } from '../actions/constants';
import language from '../localization/FilterPanel';
import getStyles from '../styles/FilterControlPanels';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

/**
 * Панель фильтров для списка задач, содержит следующие фильтры:
 * показать все, только завершенные, только активные.
 * @return {boolean}
 */
function FilterPanel(props) {
  const {
    setFilter,
    filter,
    totalAll,
    totalActive,
    totalDone,
    currentWidth,
  } = props;
  const styles = getStyles(currentWidth);

  return (
    <View style={styles.filterContainer}>

      <View style={styles.buttonAll}>
        <TouchableOpacity onPress={() => setFilter(filters.SHOW_ALL)}>
          {
            (language.name === 'en')
              ? <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.SHOW_ALL)
                    ? require('../images/en/button-all-active.png')
                    : require('../images/en/button-all.png')
                }
              />
              : <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.SHOW_ALL)
                    ? require('../images/ru/button-all-active.png')
                    : require('../images/ru/button-all.png')
                }
              />
          }
          <Text style={styles.textButtonCorner}>
            {totalAll}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonActive}>
        <TouchableOpacity onPress={() => setFilter(filters.HIDE_DONE)}>
          {
            (language.name === 'en')
              ? <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.HIDE_DONE)
                    ? require('../images/en/button-active-active.png')
                    : require('../images/en/button-active.png')
                }
              />
              : <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.HIDE_DONE)
                    ? require('../images/ru/button-active-active.png')
                    : require('../images/ru/button-active.png')
                }
              />
          }
          <Text style={styles.textButtonCorner}>
            {totalActive}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonDone}>
        <TouchableOpacity onPress={() => setFilter(filters.HIDE_ACTIVE)}>
          {
            (language.name === 'en')
              ? <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.HIDE_ACTIVE)
                    ? require('../images/en/button-done-active.png')
                    : require('../images/en/button-done.png')
                }
              />
              : <Image
                resizeMode={'contain'}
                style={styles.imageButton}
                source={
                  (filter === filters.HIDE_ACTIVE)
                    ? require('../images/ru/button-done-active.png')
                    : require('../images/ru/button-done.png')
                }
              />
          }
          <Text style={styles.textButtonCorner}>
            {totalDone}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

FilterPanel.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  totalAll: PropTypes.number.isRequired,
  totalActive: PropTypes.number.isRequired,
  totalDone: PropTypes.number.isRequired,
  currentWidth: PropTypes.number.isRequired,
};

export default FilterPanel;
