import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import CustomHeader from '../../custom_components/customHeader';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import {CarConfigContext} from '../../store/context_api/carContext';
import UploadEighthStep from './UploadEighthStep';
import UploadFifthStep from './UploadFifthStep';
import UploadFourthStep from './UploadFourthStep';
import UploadSecondStep from './UploadSecondStep';
import UploadSeventhStep from './UploadSeventhStep';
import UploadSixthStep from './UploadSixthStep';
import UploadThirdStep from './UploadThirdStep';
import UploadVehicleNumber from './UploadVehicleNumber';

const {height, width} = Dimensions.get('window');

const CreateAd = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carDetails, setCarDetails] = useContext(CarConfigContext);

  const onScreenChange = index => {
    setCurrentIndex(index);
  };

  const onPressBack = () => {
    if (currentIndex) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigation.goBack(null);
    }
  };

  const screens = [
    <UploadVehicleNumber onScreenChange={onScreenChange} />,
    <UploadSecondStep onScreenChange={onScreenChange} />,
    <UploadThirdStep onScreenChange={onScreenChange} />,
    <UploadFourthStep onScreenChange={onScreenChange} />,
    <UploadFifthStep onScreenChange={onScreenChange} />,
    <UploadSixthStep onScreenChange={onScreenChange} />,
    <UploadSeventhStep onScreenChange={onScreenChange} />,
    <UploadEighthStep onScreenChange={onScreenChange} />,
  ];

  return (
    <View style={{flex: 1}}>
      {carDetails.isLoading && (
        <View
          style={{
            backgroundColor: 'black',
            height,
            width,
            position: 'absolute',
            zIndex: 1000,
            opacity: 0.5,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <CustomHeader onPressBack={onPressBack} title="Create Ad" />
      {screens[currentIndex]}
    </View>
  );
};

const styles = StyleSheet.create({});
export default CreateAd;
