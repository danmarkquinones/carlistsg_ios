import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {View, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const SearcBox = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <TextInput
        onFocus={() => navigation.navigate('FilterIndex')}
        placeholder="Find your dream car now"
        style={{
          flex: 1,
        }}
      />
      <AntIcon name="search1" size={25} />
    </View>
  );
};

export default SearcBox;
