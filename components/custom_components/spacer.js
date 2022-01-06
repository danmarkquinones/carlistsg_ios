import React from 'react';
import {View} from 'react-native';

const Spacer = ({top, right, left, bottom}) => (
  <View
    style={{
      marginTop: top ? top : 0,
      marginRight: right ? right : 0,
      marginBottom: bottom ? bottom : 0,
      marginLeft: left ? left : 0,
    }}
  />
);

export default Spacer;
