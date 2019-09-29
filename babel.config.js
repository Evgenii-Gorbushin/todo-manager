'use strict';

module.exports = {
  sourceMaps: true,
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-flow'
  ],
  env: {
    production: {
      plugins: [
        'transform-remove-console'
      ]
    }
  }
};
