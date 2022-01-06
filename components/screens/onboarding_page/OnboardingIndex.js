// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import {OnboardingButton} from '../../custom_components/customButtons';
import {scaleFont} from '../../../utils/scale';

const {width, height} = Dimensions.get('window');

const OnboardingIndex = ({navigation}) => {
  const onDone = () => {
    AsyncStorage.setItem('isLaunched', '1');
    navigation.navigate('TabNav');
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {item.key === 's1' && (
          <View style={{flex: 1, position: 'absolute'}}>
            <View style={{flex: 1, zIndex: 1000}}>
              <Text style={styles.introTitleStyle}>{item.title}</Text>
              <Text style={styles.introTextStyle}>{item.text}</Text>
            </View>
            <View style={{flex: 1, zIndex: 1000}}></View>
            <Image
              style={styles.introImageStyle}
              source={require('../../../assets/images/Ob1.png')}
            />
          </View>
        )}
        {item.key === 's2' && (
          <View style={{flex: 1}}>
            <View style={{height: '50%'}} />
            <View
              style={{
                height: '50%',
                justifyContent: 'flex-start',
                zIndex: 1000,
                marginTop: 60,
              }}>
              <Text style={styles.introTitleStyle}>{item.title}</Text>
              <Text style={styles.introTextStyle}>{item.text}</Text>
            </View>
            <Image
              style={styles.introImageStyle}
              source={require('../../../assets/images/Ob2.png')}
            />
          </View>
        )}

        {item.key === 's3' && (
          <View style={{flex: 1, position: 'absolute'}}>
            <View style={{flex: 1, zIndex: 1000}}>
              <Text style={styles.introTitleStyle}>{item.title}</Text>
              <Text style={styles.introTextStyle}>{item.text}</Text>
              <View
                style={{
                  flex: 1,
                  width,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    width: 200,
                    paddingHorizontal: 24,
                  }}>
                  <OnboardingButton onPress={onDone} />
                </View>
              </View>
            </View>
            <View
              style={{flex: 1, backgroundColor: 'red', zIndex: 1000}}></View>
            <Image
              style={styles.introImageStyle}
              source={require('../../../assets/images/Ob1.png')}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        showSkipButton={false}
        showNextButton={false}
        showDoneButton={false}
      />
    </>
  );
};

export default OnboardingIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: width,
    height: height,
    position: 'absolute',
  },
  introTextStyle: {
    fontSize: scaleFont(16),
    color: 'white',
    textAlign: 'left',
    paddingVertical: 30,
    marginHorizontal: 24,
  },
  introTitleStyle: {
    fontSize: scaleFont(34),
    color: 'white',
    textAlign: 'left',
    marginTop: 60,
    fontFamily: 'RobotoSlab-Bold',
    marginLeft: 24,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Search for your dream car from\ntop car list site in Singapore',
    title: 'Find Your\nDream Car',
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Safe & Secured',
    text: 'Find sellers with our “Trusted” badge for\nsecure and safe deals',
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Sell Your Car',
    text: 'Post your Ad to the most number of interested buyers across Singapore',
    backgroundColor: '#22bcb5',
  },
];
