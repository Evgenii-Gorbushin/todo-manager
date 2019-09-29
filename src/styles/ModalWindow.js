import { StyleSheet } from 'react-native';
import { markup } from '../actions/constants';
import { calculation, dr } from './functions';

const getStyles= (currentWidth) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginLeft: dr(markup.flanks),
    marginRight: dr(markup.flanks),
    paddingTop: dr(markup.flanks * 1.5),
    paddingLeft: dr(markup.flanks),
    paddingRight: dr(markup.flanks),
    borderRadius: 8,
  },
  title: {
    fontFamily: markup.FONT_FAMILY,
    fontWeight: '500',
    fontSize: dr(markup.fontSize),
    color: markup.FONT_COLOR,
  },
  inputContainer: {
    width: '100%',
    height: calculation(dr(104), dr(78), currentWidth),
    marginTop: dr(4),
  },
  textInput: {
    flex: 1,
    fontFamily: markup.FONT_FAMILY,
    fontStyle: 'italic',
    fontSize: dr(markup.fontSize),
    color: markup.FONT_COLOR,
    backgroundColor: 'white',
    marginRight: dr(markup.flanks / 2),
    marginLeft: dr(markup.flanks / 2),
    paddingBottom: 0,
    paddingTop: 0,
  },
  textInputBar: {
    width: '100%',
    marginTop: dr(8),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: dr(markup.flanks * 1.5),
    marginBottom: dr(markup.flanks * 1.5),
  },
  buttonCancelSave: {
    width: calculation(dr(153), dr(121), currentWidth),
    height: calculation(dr(52), dr(45), currentWidth),
  },
  imageButton: {
    width: '100%',
    height: '100%',
  },
});

export default getStyles;
