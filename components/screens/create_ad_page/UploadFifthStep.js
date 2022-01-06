import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import {useNavigation} from '@react-navigation/core';
import CustomRadioButton from '../../custom_components/customRadioButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CarConfigContext} from '../../store/context_api/carContext';
import {fetchBrands} from '../../store/api_calls/cars_api';
import {
  CustomPicker,
  CustomPickerAsync,
} from '../../custom_components/customPicker';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const carConditions = ['Brand new', 'Used', 'Repossesed'];
const fuelTypes = ['Diesel', 'Petrol'];
const drivenWheel = ['FWD(Front Wheel Drive)', 'RWD(Rear Wheel Drive)'];
const transmissions = ['Manual', 'Automatic'];

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

const UploadFifthStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const [carBrands, setCarBrands] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = keyValue => {
    setCarDetails({...carDetails, ...keyValue});
  };

  useEffect(() => {
    const getBrands = fetchBrands();

    getBrands
      .then(res => {
        if (res.data) {
          console.log('Brands', res.data.data);
          const displayBrands = res.data.data;
          setCarBrands(displayBrands);
        }
      })
      .catch(e => {
        console.log('call failed', e);
      });
  }, []);

  useEffect(() => {
    if (
      carDetails.car_brand &&
      carDetails.car_model &&
      carDetails.car_condition &&
      carDetails.asking_price &&
      carDetails.transmission &&
      carDetails.fuel_type &&
      carDetails.mileage
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
            {/* {localizedStrings.CreateAdIndex.Step5Title} */}
            Car Details 3 of 3
          </Text>
          <Text style={styles.subtitle}>
            {/* {localizedStrings.CreateAdIndex.Step5Title} */}
            note: (*) fields are compulsory to be filled up
          </Text>
          <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>
              Car Brand <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <CustomPickerAsync
              placeholder="Select car brand"
              items={carBrands}
              value={carDetails.car_brand}
              onChange={val => onSetCarDetails({car_brand: val})}
            />
          </View>

          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Car Model <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.car_model}
              onChange={val => onSetCarDetails({car_model: val})}
              placeholder="Select Car Model"
            />
          </View>
          <Spacer bottom={16} />

          <TouchableOpacity
            onPress={() => onSetCarDetails({isOffPeak: !carDetails.isOffPeak})}>
            <View
              style={{
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                style={{marginRight: 8}}
                name={
                  carDetails.isOffPeak
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
              />
              <Text>Tick if your car is an Off-Peak Car</Text>
            </View>
          </TouchableOpacity>
          <Spacer bottom={8} />

          {carDetails.isOffPeak ? (
            <View
              style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 32}}>
              <CustomRadioButton
                data={[
                  {
                    value: '0',
                    label: 'Old OPC scheme (Use half-day on Saturdays)',
                  },
                  {
                    value: '1',
                    label: 'Revised OPC scheme (Use full-day on Saturdays)',
                  },
                  {
                    value: '2',
                    label: 'Normal car converted to Revised OPC scheme',
                  },
                ]}
                selectedValue={selectedValue}
                onSelectRadio={value => setSelectedValue(value)}
                isHorizontal
              />
            </View>
          ) : null}
          <View>
            <Text style={styles.label}>
              Car Condition <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <CustomPicker
              placeholder="Select Car Condition"
              items={carConditions}
              value={carDetails.car_condition}
              onChange={val => onSetCarDetails({car_condition: val})}
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Asking Price <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.asking_price}
              onChange={val => onSetCarDetails({asking_price: val})}
              placeholder="Asking Price"
              keyboardType={'numeric'}
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Transmission <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <CustomPicker
              placeholder="Select Car Transmission"
              items={transmissions}
              value={carDetails.transmission}
              onChange={val => onSetCarDetails({transmission: val})}
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Fuel Type <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <CustomPicker
              placeholder="Select Fuel Type"
              items={fuelTypes}
              value={carDetails.fuel_type}
              onChange={val => onSetCarDetails({fuel_type: val})}
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>
              Mileage <Text style={{color: theme.red}}>*</Text>:
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.mileage}
              onChange={val => onSetCarDetails({mileage: val})}
              placeholder="Mileage"
              keyboardType={'numeric'}
            />
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>Vehicle Features :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.features}
              onChange={val => onSetCarDetails({features: val})}
              placeholder=""
              height={100}
              multiline={true}
            />
            {/* <Text style={[styles.sublabel, {textAlign: 'right'}]}>0/150</Text> */}
          </View>
          <Spacer bottom={8} />

          <View>
            <Text style={styles.label}>Accessories :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.accessories}
              onChange={val => onSetCarDetails({accessories: val})}
              placeholder=""
              height={100}
              multiline={true}
            />
            {/* <Text style={[styles.sublabel, {textAlign: 'right'}]}>0/150</Text> */}
          </View>
          <Spacer bottom={8} />

          {/* <View>
            <Text style={styles.label}>Description :</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              onChange={() => {}}
              placeholder=""
              height={100}
              multiline={true}
            />
            <Text style={[styles.sublabel, {textAlign: 'right'}]}>0/150</Text>
          </View> */}
          <Spacer bottom={8} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={() => onScreenChange(!carDetails.details_type ? 2 : 3)}
              // title={localizedStrings.CreateAdIndex.BackBtn}
              title="Back"
              color={theme.secondaryBlue}
            />
          </View>
          <Spacer left={48} />
          <View style={{flex: 1}}>
            <PrimaryButton
              disabled={isDisabled}
              onPress={() => onScreenChange(5)}
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
export default UploadFifthStep;
