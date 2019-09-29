import { markup } from '../actions/constants';

/**
 * В зависимости от разницы между эталонной шириной экрана раной 411 и шириной экрана устройства,
 * на котором запущено приложение, будет вычислено новое значение свойства стиля в пределах указанных границ min и max,
 * где при ширине экрана 411 и более будет возвращено значение max,
 * при ширине экрана менее и равное 311 будет возращено значение min,
 * в случае если ширина экрана находится между 411 и 311 будет произведено вычисление нового значения свойства стиля.
 * @param {number} max - максимально допустимое значение.
 * @param {number} min - минимально допустимое значение.
 * @param {number} currentWidth - размер ширины экрана.
 */
export function calculation(max, min, currentWidth) {
  const difference = markup.BASIC_WIDTH - currentWidth;
  let value = max;

  if (difference > 0) {
    if (difference <= 100) {
      value = min;
    } else {
      value = Math.round(max / 100 * difference + min);
    }
  }

  return value;
}

/**
 * Умножает значение свойства стиля на коэффициент плотности экрана в случае,
 * если плотность пикселей устройства выше чем заданная в константе markup.BASIS_DENSITY.
 * @param {number} value - значение свойства стиля.
 * @return {number}
 */
export function dr(value) {
  return (markup.densityRation <= 1)
    ? value
    : Math.round(
      value * markup.densityRation / ((markup.density >= 3.5) ? 1.3 : 1)
    );
}

/**
 * Вычисляет размера шрифта используемого RN компонентами по умолчанию,
 * а также значение боковых отступов для разметки приложения,
 * в момент его запуска или при изменении ориентации экрана устройства.
 * @param {number} currentWidth - размер ширины экрана.
 */
export function changeMarkupProperties(currentWidth) {
  markup.flanks = calculation(markup.MAX_FLANKS, markup.MIN_FLANKS, currentWidth);
  markup.fontSize = calculation(markup.MAX_FONT_SIZE, markup.MIN_FONT_SIZE, currentWidth);
  markup.fontSizeThreeLine = calculation(markup.MAX_FONT_SIZE_THREE_LINE, markup.MIN_FONT_SIZE_THREE_LINE, currentWidth);
  markup.todoListItemContainerHeight.fullHeight = calculation(
    dr(markup.todoListItemContainerHeight.FROM),
    dr(markup.todoListItemContainerHeight.TO),
    currentWidth
  ) + 2;
}

/**
 * Вычисляет коэффициент плотности экрана, где за единицу взята плотность экрана Андроид эмулятора Pixel равная 2.625.
 * Сохраняет значения плотности и коэффициента плотности экрана устройства в markup.
 * @param {number} currentDensity - плотность экрана устройства на котором запущено приложение.
 */
export function setDensity(currentDensity) {
  markup.density = currentDensity;

  if (currentDensity > markup.BASIS_DENSITY) {
    markup.densityRation = currentDensity / markup.BASIS_DENSITY;
  }
}
