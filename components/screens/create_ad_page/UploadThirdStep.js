import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import {useNavigation} from '@react-navigation/core';
import CustomRadioButton from '../../custom_components/customRadioButton';
import {CarConfigContext} from '../../store/context_api/carContext';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';
import {CustomPicker} from '../../custom_components/customPicker';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ID_TYPES = [
  'Business (e.g. 51234567M)',
  'Club/Association/Organisation (e.g. T08PQ1234A)',
  'Company (e.g. 198912345K)',
  'Foreign Company (e.g. T08FC1234A)',
  'Foreign Identification Number (e.g. F/G1234567N)',
  'Government (e.g. T08GA1234A)',
  'Limited Liability Partnership (e.g. T08LL1234A)',
  'Limited Partnership (e.g. T08LP1234A)',
  'Professional (e.g. T08PQ1234A)',
  'Singapore NRIC (e.g. S1234567D)',
  'Statutory Board (e.g. T08GB1234A)',
];

const UploadThirdStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);
  const navigation = useNavigation();
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = keyValue => {
    setCarDetails({...carDetails, ...keyValue});
  };

  useEffect(() => {
    if (
      carDetails.plate_number &&
      carDetails.owner_id_type &&
      carDetails.owner_id
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [carDetails]);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Spacer bottom={8} />

          <Text style={styles.title}>
            {/* {localizedStrings.CreateAdIndex.Step3Title} */}
            Car Details 1 of 3
          </Text>
          <Text style={styles.subtitle}>
            {/* {localizedStrings.CreateAdIndex.Step3Title} */}
            note: (*) fields are compulsory to be filled up
          </Text>

          <Spacer bottom={24} />

          <View>
            <Text style={styles.label}>
              Car Plate Number <Text style={{color: theme.red}}>*</Text>
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.plate_number}
              onChange={val => onSetCarDetails({plate_number: val})}
              placeholder="AAA-DA059"
            />
          </View>

          <Spacer bottom={24} />

          <View>
            <Text style={styles.label}>
              Owner ID Type <Text style={{color: theme.red}}>*</Text>
            </Text>
            <Spacer bottom={8} />
            <CustomPicker
              placeholder="Select ID Type"
              items={ID_TYPES}
              value={carDetails.owner_id_type}
              onChange={val => onSetCarDetails({owner_id_type: val})}
            />
          </View>

          <Spacer bottom={24} />

          <View>
            <Text style={styles.label}>
              Owner ID <Text style={{color: theme.red}}>*</Text>
            </Text>
            <Text>Input last four characters eg. 567D</Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.owner_id}
              onChange={val => onSetCarDetails({owner_id: val})}
              placeholder="Owner ID"
              maxLength={4}
            />
          </View>
          <Spacer bottom={24} />

          {/* <View style={{flexDirection: 'row'}}>
            <CustomRadioButton
              data={[
                {
                  value: false,
                  label:
                    'Use my carplate number and owner ID to fill my car details automatically',
                },
                {
                  value: true,
                  label: 'I wish to manually input all my car details',
                },
              ]}
              selectedValue={carDetails.details_type}
              onSelectRadio={value => onSetCarDetails({details_type: value})}
              isHorizontal
            />
          </View> */}
          <Spacer bottom={24} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={() => onScreenChange(1)}
              // title={localizedStrings.CreateAdIndex.BackBtn}
              title="Back"
              color={theme.secondaryBlue}
            />
          </View>
          <Spacer left={48} />
          <View style={{flex: 1}}>
            <PrimaryButton
              disabled={isDisabled}
              onPress={() => onScreenChange(carDetails.details_type ? 3 : 4)}
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
export default UploadThirdStep;
