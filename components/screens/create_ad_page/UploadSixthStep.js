import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import {useNavigation} from '@react-navigation/core';
import CustomRadioButton from '../../custom_components/customRadioButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CarConfigContext} from '../../store/context_api/carContext';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const UploadSixthStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = newImages => {
    let imgs = [...carDetails.images, ...newImages];

    if (imgs.length > 9) {
      imgs = imgs.slice(0, 9);
    }

    setCarDetails({
      ...carDetails,
      images: imgs,
    });
  };

  const takePicture = async () => {
    const result = await launchCamera({});
    console.log(result);
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({selectionLimit: 4});

    onSetCarDetails(result.assets);
  };

  const onRemoveImage = uri => {
    const filteredImages = carDetails.images.filter(image => image.uri !== uri);
    setCarDetails({
      ...carDetails,
      images: filteredImages,
    });
  };

  useEffect(() => {
    if (carDetails.images.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [carDetails.images]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        takePicture();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openGallery();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.lightBlue}}>
      <ScrollView style={{flex: 1, backgroundColor: theme.lightBlue}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Spacer bottom={8} />

            <Text style={styles.title}>
              {/* {localizedStrings.CreateAdIndex.Step6Title} */}
              Upload Pictures
            </Text>
            <Text style={styles.subtitle}>
              {/* {localizedStrings.CreateAdIndex.Step6Subtitle} */}
              Upload requirements: You can upload upto 9 images. Total image file size should not exceed 6MB and it's dimension should not exceed (4800 x 3600)pixels.
            </Text>

            <Spacer bottom={24} />

            <TouchableOpacity onPress={requestStoragePermission}>
              <View
                style={{
                  width: '100%',
                  height: 150,
                  backgroundColor: theme.white,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#C2BEBE',
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="images" size={50} color="#C2BEBE" />
                <Text>Upload Images</Text>
              </View>
            </TouchableOpacity>

            {carDetails.images.length ? (
              <Text style={{marginVertical: 16}}>Image Preview</Text>
            ) : null}

            {carDetails.images.length
              ? carDetails.images.map((image, i) => (
                  <View key={i}>
                    <MaterialCommunityIcons
                      onPress={() => onRemoveImage(image.uri)}
                      style={{
                        zIndex: 10,
                        position: 'absolute',
                        right: 20,
                        top: 20,
                      }}
                      name="close"
                      size={24}
                      color="#C2BEBE"
                    />
                    <Image
                      style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                      source={{uri: image.uri}}
                    />
                  </View>
                ))
              : null}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          margin: 24,
        }}>
        <View style={{flex: 1}}>
          <PrimaryButton
            onPress={() => onScreenChange(4)}
            // title={localizedStrings.CreateAdIndex.BackBtn}
            title="Back"
            color={theme.secondaryBlue}
          />
        </View>
        <Spacer left={48} />
        <View style={{flex: 1}}>
          <PrimaryButton
            disabled={isDisabled}
            onPress={() => onScreenChange(6)}
            color={theme.primaryBlue}
            // title={localizedStrings.CreateAdIndex.NextBtn}
            title="Next"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: scaleFont(20),
    color: '#4F4A4A',
  },
  subtitle: {
    color: '#4F4A4A',
  },
  label: {
    color: '#4F4A4A',
  },
  sublabel: {
    color: '#4F4A4A',
    fontSize: 10,
  },
});
export default UploadSixthStep;
