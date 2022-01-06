import React from 'react'
import { View , TextInput } from 'react-native'
import { theme } from '../contants/colors'
import PropTypes from 'prop-types';

const PrimaryInput = ({
  placeholder,
  onChange,
  value,
  borderColor,
  Icon,
  Unit,
  editable,
  multiline,
  height,
  textAlignVertical,
  isPassword,
  LeftIcon,
  maxLength,
  keyboardType,
}) => {
  return (
    <View
      style={{
        backgroundColor: theme.white,
        borderWidth: borderColor ? 2 : 0,
        borderColor: borderColor ?? '',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        overflow: 'hidden',
      }}>
      {LeftIcon && <LeftIcon />}
      <TextInput
        style={{
          flex: 1,
          height: height ?? 50,
          fontSize: 15,
        }}
        editable={editable}
        placeholder={placeholder}
        onChangeText={text => onChange(text)}
        value={value}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        secureTextEntry={isPassword ? isPassword : false}
        maxLength={maxLength ? maxLength : null}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
      {Icon && <Icon />}
      {Unit && <Unit />}
    </View>
  );
};

PrimaryInput.prototypes = {
  onChange: PropTypes.func,
};

PrimaryInput.defaulProps = {
  onChange: () => {},
};

export default PrimaryInput
