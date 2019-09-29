import { StyleSheet } from 'react-native';
import { markup } from '../actions/constants';
import { calculation, dr } from './functions';

const itemBodyBase = (currentWidth) => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '99%',
  height: calculation(dr(64), dr(48), currentWidth),
  borderRadius: 10,
  zIndex: 2,
});
const getStyles= (currentWidth) => StyleSheet.create({
  container: {
    flex: 1,
    marginTop: dr(9),
    paddingTop: 0,
    paddingLeft: dr(markup.flanks),
    paddingRight: dr(markup.flanks),
    paddingBottom: 0,
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    height: calculation(
      dr(markup.todoListItemContainerHeight.FROM),
      dr(markup.todoListItemContainerHeight.TO),
      currentWidth
    ),
    marginBottom: dr(2),
  },
  itemBody: Object.assign({
    backgroundColor: '#ffffff',
  }, itemBodyBase(currentWidth)),
  itemBodyActive: Object.assign({
    backgroundColor: '#dddddd',
  }, itemBodyBase(currentWidth)),
  itemBodyShadow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '99%',
    height: calculation(dr(64), dr(48), currentWidth),
    backgroundColor: '#b1b1b1',
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.4,
    borderColor: '#dadada',
    borderWidth: dr(3),
    borderStyle: 'solid',
  },
  textActive: {
    flex: 1,
    marginRight: calculation(dr(7), dr(5), currentWidth),
    fontFamily: markup.FONT_FAMILY,
    fontSize: dr(markup.fontSize),
    fontWeight: '500',
    lineHeight: dr(markup.fontSizeThreeLine + 4),
    color: markup.FONT_COLOR,
  },
  textDone: {
    flex: 1,
    marginRight: calculation(dr(7), dr(5), currentWidth),
    fontFamily: markup.FONT_FAMILY,
    fontSize: dr(markup.fontSize),
    fontWeight: 'normal',
    lineHeight: dr(markup.fontSizeThreeLine + 4),
    color: '#969696',
    textDecorationLine: 'line-through',
  },
  textActiveThreeLine: {
    flex: 1,
    marginRight: calculation(dr(7), dr(5), currentWidth),
    fontFamily: markup.FONT_FAMILY,
    fontSize: dr(markup.fontSizeThreeLine),
    fontWeight: '500',
    lineHeight: dr(markup.fontSizeThreeLine + 2),
    color: markup.FONT_COLOR,
  },
  textDoneThreeLine: {
    flex: 1,
    marginRight: calculation(dr(7), dr(5), currentWidth),
    fontFamily: markup.FONT_FAMILY,
    fontSize: dr(markup.fontSizeThreeLine),
    fontWeight: 'normal',
    lineHeight: dr(markup.fontSizeThreeLine + 2),
    color: '#969696',
    textDecorationLine: 'line-through',
  },
  circleIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: calculation(dr(46), dr(35), currentWidth),
    width: calculation(dr(46), dr(35), currentWidth),
    marginLeft: calculation(dr(12), dr(9), currentWidth),
    marginRight: calculation(dr(12), dr(9), currentWidth),
  },
  number: {
    justifyContent: 'center',
    fontFamily: markup.FONT_FAMILY,
    fontSize: dr(markup.fontSize),
    fontWeight: 'normal',
    color: markup.FONT_COLOR,
  },
});

export default getStyles;
