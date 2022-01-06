import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import CustomHeader from '../../custom_components/customHeader';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import logo from '../../../assets/images/verificationBg.png';

const ResetPassword = ({}) => {
  const {width, height} = Dimensions.get('screen');
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <CustomHeader title="Reset Password" />

      <Spacer bottom={48} />
      <View style={{paddingHorizontal: 24, zIndex: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Create your new password{' '}
        </Text>
        <Spacer bottom={16} />
        <Text style={{fontSize: 16}}>
          In order to protect your account , make sure your password contains a
          combination of capital letters , number(s) , and atleast one special
          characters.
        </Text>

        <Spacer bottom={40} />

        <PrimaryInput
          onChange={() => {}}
          borderColor={theme.primaryBlue}
          height={50}
          placeholder="New Password"
          isPassword
        />
        <Spacer bottom={16} />

        <PrimaryInput
          onChange={() => {}}
          borderColor={theme.primaryBlue}
          height={50}
          placeholder="Confirm Password"
          isPassword
        />

        <Spacer bottom={48} />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Didn't receive code?{' '}
          <Text style={{color: '#20A8F4'}}>Request Again!</Text>
        </Text>

        <Spacer bottom={48} />

        <PrimaryButton
          color={'#254A7C'}
          onPress={() => {}}
          title="Submit"
          txtStyle={{color: theme.white}}
        />

        <Spacer bottom={48} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 48,
          paddingHorizontal: 24,
        }}>
        <Text style={{textAlign: 'center', fontSize: 12}}>
          By using this service, you confirm that you have read, understood and
          that you accept our{' '}
          <Text style={{color: '#20A8F4'}}>Terms and Conditions</Text>
        </Text>
      </View>
    </View>
  );
};

export default ResetPassword;
