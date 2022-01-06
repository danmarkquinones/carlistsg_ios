import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {scaleFont} from '../../../utils/scale';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import CustomHeader from '../../custom_components/customHeader';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {CarConfigContext} from '../../store/context_api/carContext';
import {api} from '../../store/api_calls/useApi';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';
import {SkeletonSquareCard} from '../../custom_components/customCardLoaders';
import PackageCard from './PackageCard';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const UploadSecondStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);
  const navigation = useNavigation();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSetCarDetails = keyValue => {
    setCarDetails({...carDetails, ...keyValue});
  };

  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = async () => {
    const res = await api.GET('/advertisement_packages/');
    setIsLoading(false);
    setPackages(res.data.data);
  };

  useEffect(() => {
    if (carDetails.ads_id && carDetails.title && carDetails.description) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [carDetails]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Spacer bottom={8} />

        <Text style={styles.title}>
          {/* {localizedStrings.CreateAdIndex.Step2Title} */}
          Package Options
        </Text>
        <Text style={styles.subtitle}>
          {/* {localizedStrings.CreateAdIndex.Step2Subtitle} */}
          Packages that we offer for your car advertisement:
        </Text>
        <Spacer bottom={24} />
        <View>
          <Spacer bottom={8} />

          {!isLoading ? (
            packages.map(item => {
              return (
                <PackageCard
                  item={item}
                  onSetCarDetails={onSetCarDetails}
                  carDetails={carDetails}
                />
              );
            })
          ) : (
            <View>
              <SkeletonSquareCard
                width={'100%'}
                height={150}
                borderRadius={5}
              />
              <Spacer bottom={16} />
              <SkeletonSquareCard
                width={'100%'}
                height={150}
                borderRadius={5}
              />

              <Spacer bottom={16} />
            </View>
          )}

          {/* <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>
              Date of insertion <Text style={{color: theme.red}}>*</Text>
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput onChange={(val) => {}} placeholder="MM/DD/YYYY" />
          </View> */}
          <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.sublabel}>
              Title : Eg. 2004 Toyota Vios 1.5A at $35K
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.title}
              onChange={val => onSetCarDetails({title: val})}
              placeholder="Title"
            />
            {/* <Text style={[styles.sublabel, {textAlign: 'right'}]}>0/52</Text> */}
          </View>
          <Spacer bottom={24} />
          <View>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.sublabel}>
              Description : Eg. Very low mileage, immaculate condition, cheapest
              in the market, etc.
            </Text>
            <Spacer bottom={8} />
            <PrimaryInput
              value={carDetails.description}
              onChange={val => onSetCarDetails({description: val})}
              placeholder=""
              height={100}
              multiline={true}
            />
            {/* <Text style={[styles.sublabel, {textAlign: 'right'}]}>0/80</Text> */}
          </View>
        </View>
        <Spacer bottom={24} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={{flex: 1}}>
            <PrimaryButton
              onPress={() => onScreenChange(0)}
              // title={localizedStrings.CreateAdIndex.BackBtn}
              title="Back"
              color={theme.secondaryBlue}
            />
          </View>
          <Spacer left={48} />
          <View style={{flex: 1}}>
            <PrimaryButton
              disabled={isDisabled}
              onPress={() => onScreenChange(2)}
              color={theme.primaryBlue}
              title={localizedStrings.CreateAdIndex.NextBtn}
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
    fontWeight: 'bold',
    color: '#4F4A4A',
  },
  sublabel: {
    color: '#4F4A4A',
    fontSize: 10,
  },
});
export default UploadSecondStep;
