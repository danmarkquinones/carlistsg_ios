import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../../contants/colors';

const PackageCard = ({item, onSetCarDetails, carDetails}) => {
  return (
    <TouchableOpacity
      style={{marginBottom: 16}}
      onPress={() =>
        onSetCarDetails({
          price: item.package_price,
          ads_id: item._id,
        })
      }>
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 5,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}>
        {item.package_name === 'Star Ad' && (
          <View
            style={{
              backgroundColor: '#EA3636',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
            }}>
            <Text style={{color: theme.white}}>
              GET 3x MORE SALES INQUIRIES
            </Text>
          </View>
        )}

        <View
          style={{
            backgroundColor:
              carDetails.ads_id === item._id ? theme.primaryBlue : theme.white,
            width: '100%',
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 32,
                color: '#36D828',
                fontWeight: 'bold',
              }}>
              S${item.package_price}{' '}
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color:
                    carDetails.ads_id === item._id ? theme.white : '#4F4A4A',
                  paddingRight: 16,
                }}>
                till vehicle is sold (with 1 day StarAd {'\n'}
                exposure)
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#bbb',
              marginVertical: 8,
            }}
          />
          <Text
            style={{
              color: carDetails.ads_id === item._id ? theme.white : '#4F4A4A',
            }}>
            Sell it fast with StarAd package as you will get over 100,000 views
            a day.{'\n'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PackageCard;
