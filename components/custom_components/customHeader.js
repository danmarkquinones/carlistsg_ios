import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import PropTypes from 'prop-types';

const CustomHeader = ({
  title,
  canGoBack,
  titleStyle,
  isTitleCenter,
  onPressBack,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#254A7C',
        height: 60,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: isTitleCenter ? 'center' : 'flex-start',
        zIndex: 20,
      }}>
      {canGoBack && (
        <Icon
          onPress={onPressBack ? onPressBack : () => navigation.goBack(null)}
          name="arrow-left"
          size={25}
          color={'#fff'}
          style={{marginRight: 16}}
        />
      )}
      <Text style={Object.keys(titleStyle).length ? titleStyle : styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

CustomHeader.prototypes = {
  title: PropTypes.string,
  canGoBack: PropTypes.bool,
  titleStyle: PropTypes.object,
  isTitleCenter: PropTypes.bool,
  onPressBack: PropTypes.func,
};

CustomHeader.defaultProps = {
  title: '',
  canGoBack: true,
  titleStyle: {},
  isTitleCenter: false,
};

export default CustomHeader;
