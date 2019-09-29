import { StyleSheet } from 'react-native';
import { markup } from '../actions/constants';
import { calculation, dr } from './functions';

/**
 * Возвращает значения таких CSS свойств как top и height, для логотипного background изображения (верхняя треть экрана),
 * в случае если пропорции между width и height находятся между 1.84 и 1.88, производится расчет скорректированных
 * значений top и height, с целью убрать эффект подрезания изображения снизу.
 * @param {string} type - имя CSS свойства, значение которого необходимо вычислить (top / height).
 * @param {number} currentWidth - размер ширины экрана.
 * @return {number}
 */
const getCorrectedTopHeight = (type, currentWidth) => {
  const baseHeight = calculation(dr(228), dr(171), currentWidth);
  const widthHeightProportion = parseFloat(
    (currentWidth / baseHeight).toFixed(2)
  );

  if (widthHeightProportion >= 1.84 && widthHeightProportion <= 1.88) {
    const meaningfulDigit = (widthHeightProportion - 1.8) * 100 - 1;
    const correctedHeight = baseHeight + meaningfulDigit;
    const correctedTop = 3 - meaningfulDigit;

    return (type === 'top')
      ? correctedTop
      : correctedHeight;
  }

  return (type === 'top') ? 0 : baseHeight;
};
const getStyles= (currentWidth) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: markup.BACKGROUND,
  },
  background: {
    position: 'absolute',
    top: getCorrectedTopHeight('top', currentWidth),
    left: 0,
    width: '100%',
    height: getCorrectedTopHeight('height', currentWidth),
    zIndex: 0,
  },
  transparentBackground: {
    backgroundColor: '#0085a4',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  buttonBasket: {
    position: 'absolute',
    top: dr(markup.flanks),
    right: dr(markup.flanks),
    width: calculation(dr(23), dr(17), currentWidth),
    height: calculation(dr(27), dr(20), currentWidth),
    zIndex: 1,
  },
  imageButton: {
    width: '100%',
    height: '100%',
  },
});

export default getStyles;
