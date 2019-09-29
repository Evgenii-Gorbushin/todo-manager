/** @format */

import { AppRegistry, NativeModules } from 'react-native';
import App from './src/components/App';
import { name as appName } from './app.json';

/**
 * @var {{SpeechAndroid: Object}} NativeModules - модуль голосового ввода Android.
 */
export const SpeechAndroid = NativeModules.SpeechAndroid;

AppRegistry.registerComponent(appName, () => App);
