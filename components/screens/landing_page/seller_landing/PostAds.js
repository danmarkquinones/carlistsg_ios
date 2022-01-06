import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet , TouchableOpacity} from 'react-native';
import {scaleFont} from '../../../../utils/scale';
import CustomHeader from '../../../custom_components/customHeader';
import Spacer from '../../../custom_components/spacer';
import {Card} from 'react-native-elements';
import {theme} from '../../../contants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PrimaryButton} from '../../../custom_components/customButtons';
import {useNavigation} from '@react-navigation/core';
import {CarConfigContext} from '../../../store/context_api/carContext';
import {UserConfigContext} from '../../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const PostAds = () => {
  const navigation = useNavigation();
  const [carDetails, setCarDetails, onReset] = useContext(CarConfigContext);

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        canGoBack={false}
        titleStyle={{
          fontSize: scaleFont(20),
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        title="CARLIST.SG"
        isTitleCenter
      />
      <ScrollView style={{flex: 1}}>
        <Spacer bottom={24} />
        <Text style={styles.title}>Got a car to sell?</Text>
        <Spacer bottom={4} />
        <Text style={styles.subtitle}>
        Let us help you with the right product
        </Text>
        <Spacer bottom={24} />
        <View style={{paddingHorizontal: 24}}>
          <Card containerStyle={{borderRadius: 8}}>
            <Text style={styles.cardTitle}>
            Sell it on Carlist.SG
            </Text>
            <Spacer bottom={4} />
            <Text style={styles.cardSubtitle}>
            List your car on Carlist.SG and get direct inquiries from interested buyers
            </Text>

            <Spacer bottom={32} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>
              Selling Price
              </Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
              </View>
            </View>
            <Spacer bottom={16} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>
              Selling Time
              </Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(3)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
                {/* <FontAwesome5
                    key={4}
                    name="star"
                    size={15}
                    solid
                    color={theme.gray}
                  /> */}
                <FontAwesome5
                  key={5}
                  name="star"
                  size={15}
                  solid
                  color={theme.gray}
                />
              </View>
            </View>
            <Spacer bottom={16} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>
              Convenience
              </Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(4)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
                <FontAwesome5
                  key={5}
                  name="star"
                  size={15}
                  solid
                  color={theme.gray}
                />
              </View>
            </View>
            <Spacer bottom={24} />
            <PrimaryButton
              onPress={() => {
                navigation.navigate('CreateAdIndex');
                onReset();
              }}
              title="CREATE AD"
              color={theme.primaryBlue}
            />
          </Card>
        </View>

        {/* <View style={{paddingHorizontal: 24}}>
          <Card containerStyle={{borderRadius: 8}}>
            <Text style={styles.cardTitle}>Sell it on our Partner</Text>
            <Spacer bottom={4} />
            <Text style={styles.cardSubtitle}>
              List your car on SGCarlist and Ut occaecat cupidatat non proident.
            </Text>

            <Spacer bottom={32} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>Selling price</Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
              </View>
            </View>
            <Spacer bottom={16} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>Selling time</Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
              </View>
            </View>
            <Spacer bottom={16} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.itemTitle}>Selling time</Text>
              <View style={{flexDirection: 'row'}}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome5
                    key={i}
                    name="star"
                    size={15}
                    solid
                    color={theme.yellow}
                  />
                ))}
              </View>
            </View>
            <Spacer bottom={24} />
            <PrimaryButton
              onPress={() => navigation.navigate('CreateAdIndex')}
              title="Create Ad"
              color={theme.primaryBlue}
            />
          </Card>
        </View>
        <Spacer bottom={24} /> */}

        <Spacer bottom={24} />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.footerText}>
            {localizedStrings.CreateAdIndex.FooterTxt}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={{color: '#20A8F4'}}>
              {localizedStrings.CreateAdIndex.ContactUs}
            </Text>
          </TouchableOpacity>
        </View>

        <Spacer bottom={32} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: '#4F4A4A',
    textAlign: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: scaleFont(16),
    color: '#4F4A4A',
  },
  cardSubtitle: {
    fontSize: scaleFont(12),
    color: '#C2BEBE',
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#C2BEBE',
    textAlign: 'center',
  },
  itemTitle: {
    fontSize: scaleFont(12),
    color: '#4F4A4A',
  },
  footerText: {
    fontSize: scaleFont(14),
    color: '#C2BEBE',
    textAlign: 'center',
  },
});
export default PostAds;
