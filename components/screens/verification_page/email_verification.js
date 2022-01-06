import React from 'react';
import {View, Text} from 'react-native';
import {PricingButton} from 'react-native-elements/dist/pricing/PricingCard';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';

const EmailVerification = () => {
  return (
    <View style={{flex: 1}}>
      <Spacer bottom={48} />
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
        We will send you a One Time{'\n'}Password on this email
      </Text>
      <Spacer bottom={24} />
      <PrimaryInput
        onChange={() => {}}
        borderColor={theme.primaryBlue}
        height={50}
        placeholder="Email"
        Icon={() => (
          <View
            style={{
              backgroundColor: theme.primaryBlue,
              height: '100%',
              width: 60,
              marginRight: -10,
              paddingTop: 15,
              alignItems: 'center',
            }}>
            <Text style={{color: theme.white}}>Send</Text>
          </View>
        )}
      />
      <Spacer bottom={24} />
      <PrimaryInput
        onChange={() => {}}
        borderColor={theme.primaryBlue}
        height={50}
        placeholder="OTP"
      />
      <Spacer bottom={24} />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Didn't receive code?{' '}
        <Text style={{color: '#20A8F4'}}>Request Again!</Text>
      </Text>

      <Spacer bottom={48} />
    </View>
  );
};

export default EmailVerification;
