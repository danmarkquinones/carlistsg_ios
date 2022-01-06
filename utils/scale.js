import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const IPHONE6_SCREEN_WIDTH = 375;
const IPHONE6_SCREEN_HEIGHT = 667;

export const isTablet = DeviceInfo.getDeviceType() !== 'Handset';

export const scaleWidth = width => {
  if (isTablet) {
    return width;
  }
  return (Dimensions.get('screen').width / IPHONE6_SCREEN_WIDTH) * width;
};

export const scaleHeight = height => {
  if (isTablet) {
    return height;
  }
  return (Dimensions.get('screen').width / IPHONE6_SCREEN_WIDTH) * height;
};

export const scaleX = scaleWidth;

export const scaleY = height =>
  (Dimensions.get('screen').height / IPHONE6_SCREEN_HEIGHT) * height;

export const scaleFont = scaleWidth;
