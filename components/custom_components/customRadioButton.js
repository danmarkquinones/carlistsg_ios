import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {theme} from '../contants/colors';

const CustomRadioButton = ({
  data,
  selectedValue,
  onSelectRadio,
  isHorizontal,
}) => {
  return (
    <View style={{flexDirection: isHorizontal ? 'column' : 'row'}}>
      {data.map((item, i) => (
        <TouchableWithoutFeedback
          key={i}
          onPress={() => onSelectRadio(item.value)}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: isHorizontal ? 0 : 16,
              marginBottom: isHorizontal ? 16 : 0,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 50,
                backgroundColor: theme.white,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor:
                    selectedValue === item.value
                      ? theme.primaryBlue
                      : theme.gray,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{paddingRight: 25}}>
              <Text>{item.label}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default CustomRadioButton;
