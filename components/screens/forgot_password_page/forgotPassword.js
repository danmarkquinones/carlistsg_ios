import React, {useRef, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import CustomHeader from '../../custom_components/customHeader';
import Spacer from '../../custom_components/spacer';
import {api} from '../../store/api_calls/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LocalizedStrings from 'react-native-localization';
import {UserConfigContext} from '../../store/context_api/userContext';

var localFile = require('../../languages/authLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const ForgotPassword = ({navigation}) => {
  const phoneInput = useRef(null);
  const [contact, setContact] = useState('');

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  const onSubmit = async () => {
    const params = {number: contact};
    const res = await api.POST(params, 'users/reset-password');
    if (res?.data?.success) {
      navigation.navigate('Verification', {fromForgotPassword: true});
    } else {
      alert('Oops! Something went wrong.');
    }
    console.log(res);
    //
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.lightBlue}}>
      <CustomHeader 
        title={localizedStrings.ForgotPassword.Header} 
        title="Forgot Password"
      />
      <Spacer bottom={48} />
      <View style={{paddingHorizontal: 24}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
          {/* {localizedStrings.ForgotPassword.Title} */}
          We will send you a One Time Password on this mobile number
        </Text>
        <Spacer bottom={24} />

        <PhoneInput
          ref={phoneInput}
          defaultValue={contact}
          defaultCode="SG"
          value={contact}
          layout="first"
          // placeholder={localizedStrings.ForgotPassword.PhoneNumber}
          placeholder='Phone Number'
          containerStyle={{
            width: '100%',
            height: 55,
            borderColor: theme.primaryBlue,
            borderWidth: 2,
            borderRadius: 5,
          }}
          textContainerStyle={{
            paddingVertical: 0,
            borderRadius: 5,
          }}
          textInputStyle={{fontSize: 14}}
          codeTextStyle={{fontSize: 14}}
          onChangeFormattedText={text => {
            setContact(text);
          }}
        />
        <Spacer bottom={48} />
        <PrimaryButton
          disabled={!contact}
          color={'#254A7C'}
          onPress={onSubmit}
          // title={localizedStrings.ForgotPassword.SubmitBtn}
          title="Submit"
          txtStyle={{color: theme.white}}
        />
      </View>

      <View style={{padding: 24, flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{textAlign: 'center', color: theme.black, fontSize: 12}}>
          {/* {localizedStrings.Login.TermsAndCondition1} */}
          By using this service, you confirm that you have read, understood and that you accept our 
          <Text style={{color: '#20A8F4'}}>
            {/* {localizedStrings.Login.TermsAndCondition2} */}
            Terms and Conditions
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgotPassword;
