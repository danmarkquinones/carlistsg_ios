import { optionalCallExpression } from '@babel/types';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { theme } from '../contants/colors';

export const OnboardingButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.onboardingBtn}>
        <Text style={styles.onboardingBtnText}>Get Started</Text>
      </View>
    </TouchableOpacity>
  );
};

export const SmallButton = (props) => {

  const {title , onPress , options} = props

  return(
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex:1,
          height:options.height,
          backgroundColor:options.color,
          paddingVertical:5,
          paddingHorizontal:10,
          borderRadius:2
        }}
      >
        <Text
          style={{
            textAlign:'center',
            color:options.textColor
          }}
        >{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const PrimaryButton = props => {
  const {color, title, onPress, Icon, txtStyle, disabled} = props;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={{
          backgroundColor: color,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          borderRadius: 5,
          opacity: disabled ? 0.5 : 1,
        }}>
        {Icon && (
          <View style={{marginHorizontal: 10}}>
            <Icon />
          </View>
        )}
        <Text style={txtStyle ? txtStyle : styles.primaryBtnTxt}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const OffCancelButton = props => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: theme.gray,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  onboardingBtn: {
    backgroundColor: '#254A7C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 48,
  },
  onboardingBtnText: {
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  primaryBtnTxt: {
    color: theme.white,
    textTransform: 'uppercase',
  },
});
