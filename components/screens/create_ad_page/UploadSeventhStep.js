import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {theme} from '../../contants/colors';
import {TabView, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/core';
import Spacer from '../../custom_components/spacer';
import {PrimaryButton} from '../../custom_components/customButtons';
import {CarConfigContext} from '../../store/context_api/carContext';
import ImageSlider from 'react-native-image-slider';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const initialLayout = {width: Dimensions.get('window').width};

const UploadSeventhStep = ({onScreenChange}) => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Descriptions'},
    {key: 'second', title: 'Accessories'},
    {key: 'third', title: 'Features'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={{height: 250, padding: 16}}>
            <Text>{carDetails.description}</Text>
          </View>
        );
      case 'second':
        return (
          <View style={{height: 250, padding: 16}}>
            <Text>{carDetails.accessories}</Text>
          </View>
        );
      case 'third':
        return (
          <View style={{height: 250, padding: 16}}>
            <Text>{carDetails.features}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.lightBlue}}>
      {/* <Image
        style={{
          width: '100%',
          height: 250,
        }}
        source={require('../../../assets/images/car3.jpg')}
      /> */}
      <ImageSlider
        images={carDetails.images}
        customSlide={({index, item, style, width}) => (
          <View key={index} style={{display: 'flex', flex: 1}}>
            <Image
              source={{uri: item.uri}}
              style={{height: 300, width: initialLayout.width}}
            />
          </View>
        )}
      />
      <View style={{padding: 16, backgroundColor: theme.white}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {carDetails.title}
        </Text>
        <Text>{`${carDetails.location.city} - ${carDetails.location.region_name}`}</Text>
      </View>
      <View
        style={{
          padding: 16,
          backgroundColor: theme.white,
          borderTopWidth: 0.5,
          borderTopColor: theme.black,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{color: theme.primaryBlue, fontWeight: 'bold', fontSize: 18}}>
          {carDetails.asking_price} USD
        </Text>
        {/* <Text>625 USD / month</Text> */}
      </View>

      {carDetails.details_type ? (
        <View>
          <View
            style={{
              marginTop: 16,
              padding: 16,
              backgroundColor: theme.white,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{carDetails.mileage} KM</Text>
            <Text>{carDetails.car_condition}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: theme.black,
              padding: 16,
              backgroundColor: theme.white,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{carDetails.transmission}</Text>
            <Text>{carDetails.engince_capacity} cc</Text>
          </View>
        </View>
      ) : null}
      <Spacer bottom={16} />
      <View style={{height: 250}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: 'transparent', elevation: 0}}
              renderLabel={({focused, route}) => {
                return (
                  <Text
                    style={{
                      fontWeight: '500',
                      color: focused ? theme.primaryBlue : theme.black,
                    }}>
                    {route.title}
                  </Text>
                );
              }}
              indicatorStyle={{backgroundColor: theme.primaryBlue}}
            />
          )}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{padding: 24, zIndex: 2, backgroundColor: theme.white}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: 24,
        }}>
        <View style={{flex: 1}}>
          <PrimaryButton
            onPress={() => onScreenChange(5)}
            // title={localizedStrings.CreateAdIndex.BackBtn}
            title="Back"
            color={theme.secondaryBlue}
          />
        </View>
        <Spacer left={48} />
        <View style={{flex: 1}}>
          <PrimaryButton
            onPress={() => onScreenChange(7)}
            color={theme.primaryBlue}
            // title={localizedStrings.CreateAdIndex.NextBtn}
            title="Next"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadSeventhStep;
