import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {PricingButton} from 'react-native-elements/dist/pricing/PricingCard';
import {theme} from '../../contants/colors';
import {PrimaryButton} from '../../custom_components/customButtons';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
// import LocalizedStrings from 'react-native-localization';
import {UserConfigContext} from '../../store/context_api/userContext';

// var localFile = require('../../languages/authLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const MobileVerification = ({otp, setOtp}) => {
  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  return (
    <View style={{flex: 1, padding: 24}}>
      <Spacer bottom={48} />
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
      We will send you a One Time Password on this mobile number
      </Text>
      <Spacer bottom={24} />

      <PrimaryInput
        value={otp}
        onChange={setOtp}
        borderColor={theme.primaryBlue}
        height={50}
        placeholder="One Time Password"
      />
      <Spacer bottom={24} />
      {/* <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {localizedStrings.Otp.DidntReceive}
        <Text style={{color: '#20A8F4'}}>
          {localizedStrings.Otp.RequestAgain}
        </Text>
      </Text> */}
    </View>
  );
};

export default MobileVerification;
