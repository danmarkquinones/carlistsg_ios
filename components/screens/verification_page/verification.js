import React, {useState, useContext} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {theme} from '../../contants/colors';
import {TabView, TabBar} from 'react-native-tab-view';
import {cars, reviews} from '../../contants/dummyCarData';
import CustomHeader from '../../custom_components/customHeader';
import EmailVerification from './email_verification';
import MobileVerification from './mobile_verification';
import logo from '../../../assets/images/verificationBg.png';
import Spacer from '../../custom_components/spacer';
import {PrimaryButton} from '../../custom_components/customButtons';
import {useNavigation} from '@react-navigation/core';
import {api} from '../../store/api_calls/useApi';
// import LocalizedStrings from 'react-native-localization';
import {UserConfigContext} from '../../store/context_api/userContext';

// var localFile = require('../../languages/authLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const initialLayout = {width: Dimensions.get('window').width};

const Verification = props => {
  const {route} = props;

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const {width, height} = Dimensions.get('screen');
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [config, setConfig] = useState({
    sortBy: 'ascending',
    isGridView: true,
    ads: cars,
    reviews: reviews,
  });
  const [scrollY, setScrollY] = useState();
  const [otp, setOtp] = useState('');

  const [routes] = useState([
    {key: 'first', title: 'Email Verification'},
    {key: 'second', title: 'Mobile OTP'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <EmailVerification />;
      case 'second':
        return <MobileVerification />;
      default:
        return null;
    }
  };

  const onVerifyOtp = async () => {
    const params = {
      username: route.params.params.user_email,
      otp: parseInt(otp),
    };
    let res = await api.POST(params, '/users/verify-otp');
    if (res?.data?.success) {
      if (route.params.fromForgotPassword) {
        navigation.navigate('ResetPassword');
      } else {
        navigation.navigate('Login');
      }
    } else {
      alert('Incorrect OTP!');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.white,
      }}>
      <CustomHeader title="Verification" />

      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        {/* <TabView
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
          style={{padding: 24, zIndex: 2}}
        /> */}

        <View style={{flex: 1}}>
          <MobileVerification otp={otp} setOtp={setOtp} />
        </View>

        <View style={{flex: 1, paddingHorizontal: 24, zIndex: 20}}>
          <Spacer bottom={24} />
          <PrimaryButton
            onPress={onVerifyOtp}
            color={theme.primaryBlue}
            // title={localizedStrings.Otp.SubmitBtn}
            title="Submit"
            txtStyle={{textTransform: 'capitalize', color: theme.white}}
          />
        </View>

        <View style={{padding: 24, zIndex: 20}}>
          <Text style={{textAlign: 'center', color: theme.black, fontSize: 12}}>
            {/* {localizedStrings.Login.TermsAndCondition1} */}
            By using this service, you confirm that you have read, understood and that you accept our 
            <Text
              onPress={() => navigation.navigate('TOS')}
              style={{color: '#20A8F4'}}>
              {/* {localizedStrings.Login.TermsAndCondition2} */}
              Terms and Conditions
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Verification;
