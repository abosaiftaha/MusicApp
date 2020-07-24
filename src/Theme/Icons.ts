import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
const icoMoonConfig: object = require('../../Assets/Icons/selection.json') as object;

export const Icon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'IcoMoon',
  'icomoon.ttf',
);
