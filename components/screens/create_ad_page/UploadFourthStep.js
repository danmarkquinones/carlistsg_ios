import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import {useNavigation} from '@react-navigation/core';
import CustomRadioButton from '../../custom_components/customRadioButton';
// import DatePicker from 'react-native-datepicker';
import {CarConfigContext} from '../../store/context_api/carContext';
import {CustomPicker} from '../../custom_components/customPicker';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';
import moment from 'moment';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const vehicleTypes = [
  'Hybrid',
  'Electric',
  'Hatchback',
  'Luxury Sedan',
  'MPV',
  'Mid-sized Sedan',
  'Sports Car',
  'Stationwagon',
  'SUV',
  'Commercial Vehicle',
  'Passenger Cars',
  'Any',
];

const UploadFourthStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = keyValue => {
    setCarDetails({...carDetails, ...keyValue});
  };

  useEffect(() => {
    if (
      carDetails.registration_date &&
      carDetails.engine_capacity &&
      carDetails.number_of_owners &&
      carDetails.type_of_vehicle
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [carDetails]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Spacer bottom={8} />

          <Text style={styles.title}>
            {/* {localizedStrings.CreateAdIndex.Step4Title} */}
            Car Details 2 of 3
          </Text>
          <Text style={styles.subtitle}>
            {/* {localizedStrings.CreateAdIndex.Step4Subtitle} */}
            note: (*) fields are compulsory to be filled up
          </Text>

          <Spacer bottom={24} />

          <View>
            <Text style={styles.label}>
              Registration Date <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            {/* <PrimaryInput onChange={() => {}} placeholder="MM/DD/YYYY" /> */}
            {/* <DatePicker
              style={{
                width: '100%',
                borderRadius: 5,
                paddingVertical: 8,
              }}
              date={carDetails.registration_date}
              mode="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              minDate="2000-05-01"
              maxDate={moment().format('YYYY-MM-DD')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  backgroundColor: theme.white,
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  paddingLeft: 16,
                  width: '100%',
                  height: 50,
                  borderRadius: 5,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setRegistrationDate(date);
                onSetCarDetails({registration_date: date});
              }}
            /> */}
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Engine Capacity <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              keyboardType={'numeric'}
              value={carDetails.engine_capacity}
              onChange={val => onSetCarDetails({engine_capacity: val})}
              placeholder="Engine Capacity"
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>OMV :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              LeftIcon={() => (
                <Text style={{width: 20, fontWeight: 'bold'}}>S$</Text>
              )}
              value={carDetails.omv}
              onChange={val => onSetCarDetails({omv: val})}
              keyboardType={'numeric'}
              placeholder=""
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>ARF :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              keyboardType={'numeric'}
              LeftIcon={() => (
                <Text style={{width: 20, fontWeight: 'bold'}}>S$</Text>
              )}
              value={carDetails.arf}
              onChange={val => onSetCarDetails({arf: val})}
              placeholder=""
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>COE :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              keyboardType={'numeric'}
              LeftIcon={() => (
                <Text style={{width: 20, fontWeight: 'bold'}}>S$</Text>
              )}
              value={carDetails.coe}
              onChange={val => onSetCarDetails({coe: val})}
              placeholder=""
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>COE Expiry Date :</Text>
            <Spacer bottom={8} />
            {/* <PrimaryInput onChange={() => {}} placeholder="MM/DD/YYYY" /> */}
            {/* <DatePicker
              style={{
                width: '100%',
                borderRadius: 5,
                paddingVertical: 8,
              }}
              date={carDetails.coe_expiry_date}
              mode="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              minDate="2020-05-01"
              maxDate="2035-05-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  backgroundColor: theme.white,
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  paddingLeft: 16,
                  width: '100%',
                  height: 50,
                  borderRadius: 5,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setDate(date);
                onSetCarDetails({coe_expiry_date: date});
              }}
            /> */}
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Number of Owners <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              keyboardType={'numeric'}
              value={carDetails.number_of_owners}
              onChange={val => onSetCarDetails({number_of_owners: val})}
              placeholder="Number of Owners"
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Type of Vehicle <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <CustomPicker
              placeholder="Select Vehicle Type"
              items={vehicleTypes}
              value={carDetails.type_of_vehicle}
              onChange={val => onSetCarDetails({type_of_vehicle: val})}
            />
          </View>
          <Spacer bottom={24} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={() => onScreenChange(2)}
              // title={localizedStrings.CreateAdIndex.BackBtn}
              title="Back"
              color={theme.secondaryBlue}
            />
          </View>
          <Spacer left={48} />
          <View style={{flex: 1}}>
            <PrimaryButton
              disabled={isDisabled}
              onPress={() => onScreenChange(4)}
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
export default UploadFourthStep;
