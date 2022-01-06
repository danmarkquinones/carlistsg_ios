import React from 'react';
import {View} from 'react-native';
import {theme} from '../contants/colors';
// import {Picker} from '@react-native-picker/picker';

export const CustomPicker = ({placeholder, items, value, onChange}) => {
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
      }}>
      {/* <Picker
        selectedValue={value}
        style={{
          backgroundColor: '#fff',
          placeholder: {color: 'red'},
          inputIOS: {color: 'red'},
          inputAndroid: {color: 'red'},
        }}
        onValueChange={(item, itemIndex) => onChange(item)}>
        <Picker.Item style={{color: theme.gray}} label={placeholder} value="" />
        {items.map((item, i) => (
          <Picker.Item key={i} label={item} value={item} />
        ))}
      </Picker> */}
    </View>
  );
};

export const CustomPickerAsync = ({placeholder, items, value, onChange}) => {
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
      }}>
      {/* <Picker
        selectedValue={value}
        style={{
          backgroundColor: '#fff',
          placeholder: {color: 'red'},
          inputIOS: {color: 'red'},
          inputAndroid: {color: 'red'},
        }}
        onValueChange={(item, itemIndex) => onChange(item)}>
        <Picker.Item style={{color: theme.gray}} label={placeholder} value="" />
        {items.map((item, i) => (
          <Picker.Item key={i} label={item.name} value={item._id} />
        ))}
      </Picker> */}
    </View>
  );
};

export const CustomPickerLocation = ({placeholder, items, value, onChange}) => {
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
      }}>
      {/* <Picker
        selectedValue={value}
        style={{
          backgroundColor: '#fff',
          placeholder: {color: 'red'},
          inputIOS: {color: 'red'},
          inputAndroid: {color: 'red'},
        }}
        onValueChange={(item, itemIndex) => onChange(item)}>
        <Picker.Item style={{color: theme.gray}} label={placeholder} value="" />
        {items.map((item, i) => (
          <Picker.Item key={i} label={`${item.city}, ${item.region_name}`} value={item._id} />
        ))}
      </Picker> */}
    </View>
  );
};
