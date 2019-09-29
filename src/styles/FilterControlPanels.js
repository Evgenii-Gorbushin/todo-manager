import { StyleSheet } from 'react-native';
import { markup } from '../actions/constants';
import { calculation, dr } from './functions';

const getStyles = (currentWidth) => StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: dr(markup.flanks),
    marginRight: dr(markup.flanks),
    marginTop: calculation(dr(102), dr(77), currentWidth),
    height: calculation(dr(53), dr(40), currentWidth),
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: dr(markup.flanks),
    marginRight: dr(markup.flanks),
    marginTop: calculation(dr(102), dr(77), currentWidth),
    height: calculation(dr(50), dr(38), currentWidth),
    marginBottom: calculation(dr(3), dr(2.5), currentWidth),
  },
  buttonAll: {
    width: calculation(dr(78), dr(59), currentWidth),
    height: '100%',
  },
  buttonActive: {
    width: calculation(dr(133), dr(100), currentWidth),
    height: '100%',
  },
  buttonDone: {
    width: calculation(dr(124), dr(93), currentWidth),
    height: '100%',
  },
  buttonDelete: {
    width: calculation(dr(61), dr(46), currentWidth),
    height: '100%',
  },
  buttonCancelFinishEdit: {
    width: calculation(dr(139), dr(104), currentWidth),
    height: '100%',
  },
  imageButton: {
    width: '100%',
    height: '100%',
  },
  textButtonCorner: {
    position: 'absolute',
    top: dr(1),
    right: dr(5),
    fontFamily: markup.FONT_FAMILY,
    fontSize: calculation(dr(markup.MAX_FONT_SIZE), dr(markup.MIN_FONT_SIZE), currentWidth) - 8,
    color: markup.FONT_COLOR,
  },
});

export default getStyles;
