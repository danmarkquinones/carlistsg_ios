import {useNavigation} from '@react-navigation/core';
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import CustomHeader from '../../custom_components/customHeader';
import PrimaryInput from '../../custom_components/customInput';
import {CustomPickerLocation} from '../../custom_components/customPicker';
import CustomRadioButton from '../../custom_components/customRadioButton';
import Spacer from '../../custom_components/spacer';
import {fetchLocations} from '../../store/api_calls/cars_api';
import {CarConfigContext} from '../../store/context_api/carContext';
// import LocalizedStrings from 'react-native-localization';
import {UserConfigContext} from '../../store/context_api/userContext';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const {width, height} = Dimensions.get('screen');

const UploadVehicleNumber = ({onScreenChange}) => {
  const [carDetails, setCarDetails, onReset] = useContext(CarConfigContext);
  const [locations, setLocations] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = keyValue => {
    setCarDetails({...carDetails, ...keyValue});
  };

  const navigation = useNavigation();
  const [selectedValueContact, setSelectedValueContact] = useState('yes');
  const [selectedValueEmail, setSelectedValueEmail] = useState('yes');

  useEffect(() => {
    const getLocations = fetchLocations();

    getLocations
      .then(res => {
        if (res.data) {
          console.log(res.data);
          const displayLocations = res.data.data;
          setLocations(displayLocations);
        }
      })
      .catch(e => {
        console.log('call failed location', e);
      });
  }, []);

  const onSetLocation = id => {
    const selectedLocation = locations.filter(
      location => location._id === id,
    )[0];
    onSetCarDetails({
      location: selectedLocation,
    });
  };

  useEffect(() => {
    if (Object.keys(carDetails.location).length && carDetails.street) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [carDetails]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.lightBlue}}>
      <View style={styles.container}>
        <View>
          <Spacer bottom={8} />
          <Text style={styles.title}>
            {/* {localizedStrings.CreateAdIndex.ViewingArea} */}
            Preffered Viewing Area
          </Text>
          <Text style={styles.subtitle}>
            {/* {localizedStrings.CreateAdIndex.Note} */}
            note: (*) fields are compulsary to be filled up
          </Text>
          <Spacer bottom={40} />
          {/* <View>
            <Text style={styles.label}>
              Name <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.product_name}
              onChange={val => onSetCarDetails({product_name: val})}
              placeholder="Name"
            />
          </View>
          <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>
              Contact No. <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.contact_no}
              onChange={val => onSetCarDetails({contact_no: val})}
              placeholder="Contact No."
            />
          </View>
          <Spacer bottom={24} />

          <View>
            <Text style={styles.label}>
              Email Address <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.email}
              onChange={val => onSetCarDetails({email: val})}
              placeholder="Email Address"
            />
          </View>
          <Spacer bottom={24} /> */}

          <View>
            <Text style={styles.label}>
              Location <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <CustomPickerLocation
              placeholder="Select Location"
              items={locations}
              value={carDetails.location._id}
              onChange={val => onSetLocation(val)}
            />
          </View>

          <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>
              Street <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.street}
              onChange={val => onSetCarDetails({street: val})}
              placeholder="Street"
            />
          </View>
        </View>
      </View>
      <Spacer bottom={330} />
      <View style={{flex: 1, justifyContent: 'flex-end', padding: 24}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={() => navigation.goBack(null)}
              // title={localizedStrings.CreateAdIndex.BackBtn}
              title="Back"
              color={theme.secondaryBlue}
            />
          </View>
          <Spacer left={48} />
          <View style={{flex: 1}}>
            <PrimaryButton
              disabled={isDisabled}
              onPress={() => onScreenChange(1)}
              color={theme.primaryBlue}
              // title={localizedStrings.CreateAdIndex.NextBtn}
              title="Next"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
export default UploadVehicleNumber;
