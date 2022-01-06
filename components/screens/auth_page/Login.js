import React, {useState, useContext, useEffect} from 'react';
import {Button, Text, View, Image, Dimensions, ScrollView} from 'react-native';
import logo from '../../../assets/images/carlistsg_white.png';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import Kjur from '../../store/helpers/jwt';
import {api} from '../../store/api_calls/useApi';
import {UserConfigContext} from '../../store/context_api/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../languages/authLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const Login = props => {
  const {width, height} = Dimensions.get('screen');
  const {navigation} = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onLogin = async () => {
    setIsFetching(true);
    const params = {username, password};
    let res = await api.POST(params, '/users/login');
    if (res?.data?.success) {
      const data = Kjur.decode(res.data.token);

      setUserConfig({
        ...userConfig,
        isLoggedIn: 1,
        userDetails: {...userConfig.userDetails, ...data},
      });

      AsyncStorage.setItem('userDetails', JSON.stringify(data));
      AsyncStorage.setItem('bearerToken', res.data.token);

      navigation.navigate('LandingStacks');
    } else {
      alert('Invalid Username or Password!');
    }

    setIsFetching(false);
  };

  useEffect(() => {
    validateFields();
  }, [username, password]);

  const validateFields = () => {
    if (username && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{zIndex: 20}}>
          <Image
            source={logo}
            style={{
              width: '100%',
              height: '50%',
              resizeMode: 'contain',
            }}
          />

          <View style={{paddingHorizontal: 24}}>
            <PrimaryInput
              value={username}
              onChange={setUsername}
              borderColor={theme.primaryBlue}
              height={50}
              // placeholder={localizedStrings.Login.Username}
              placeholder="Username"
            />
            <Spacer bottom={16} />
            <PrimaryInput
              value={password}
              onChange={setPassword}
              borderColor={theme.primaryBlue}
              height={50}
              // placeholder={localizedStrings.Login.Password}
              placeholder="Password"
              isPassword
            />
            {/* <Spacer bottom={24} />
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{
                textAlign: 'right',
                color: '#20A8F4',
                fontWeight: 'bold',
              }}>
              {localizedStrings.Login.Forgot}
            </Text> */}
            <Spacer bottom={48} />

            <PrimaryButton
              disabled={isDisabled}
              color={'#254A7C'}
              onPress={onLogin}
              // title={localizedStrings.Login.LoginBtn}
              title="Log in"
              txtStyle={{color: theme.white, fontWeight: 'bold'}}
            />

            <Spacer bottom={16} />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {/* {localizedStrings.Login.DontHaveAccount} */}
              Don't have an account?
              <Text
                onPress={() => navigation.navigate('Register')}
                style={{color: '#20A8F4'}}>
                {/* {localizedStrings.Login.SignUp} */}
                Sign Up Now!
              </Text>
            </Text>
            <Spacer bottom={48} />

            <Text style={{textAlign: 'center', fontSize: 12}}>
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
      </ScrollView>
    </View>
  );
};

export default Login;
