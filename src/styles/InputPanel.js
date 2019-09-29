import { StyleSheet } from 'react-native';
import { markup } from '../actions/constants';
import { calculation, dr } from './functions';

const getStyles= (currentWidth) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: dr(markup.flanks),
    paddingRight: dr(markup.flanks),
    paddingTop: dr(7),
    marginBottom: dr(5),
    backgroundColor: markup.BACKGROUND,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: markup.FONT_FAMILY,
    fontStyle: 'italic',
    fontSize: dr(markup.fontSize),
    color: markup.FONT_COLOR,
    paddingLeft: dr(markup.flanks),
    marginRight: dr(5),
    height: calculation(dr(50), dr(38), currentWidth),
  },
  microphoneIcon: {
    width: calculation(dr(47), dr(35), currentWidth),
    height: calculation(dr(47), dr(35), currentWidth),
    marginBottom: dr(4),
  },
  textInputBar: {
    width: '100%',
    marginBottom: calculation(dr(10), dr(8), currentWidth),
  },
  buttonAdd: {
    width: '100%',
    height: calculation(dr(58), dr(44), currentWidth),
  },
  imageButtonAdd: {
    width: '100%',
    height: '100%',
  },
});

export default getStyles;
