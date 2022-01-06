import React, {useContext, useState} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {theme} from '../../contants/colors';
import Spacer from '../../custom_components/spacer';
import logo from '../../../assets/images/qr.png';
import {PrimaryButton} from '../../custom_components/customButtons';
import {CarConfigContext} from '../../store/context_api/carContext';
import {api} from '../../store/api_calls/useApi';
import {RNS3} from 'react-native-aws3';
import {aws} from '../../store/helpers/keys';
import {UserConfigContext} from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';
import {useNavigation} from '@react-navigation/native';

// var localFile = require('../../languages/postAdLocale.json');
// let localizedStrings = new LocalizedStrings(localFile);

const UploadEighthStep = () => {
  const [carDetails, setCarDetails] = useContext(CarConfigContext);

  const navigation = useNavigation();

  const [userConfig, setUserConfig] = useContext(UserConfigContext);
  // localizedStrings.setLanguage(userConfig.language);

  let ids = [];

  const onSubmit = async () => {
    setCarDetails({...carDetails, isLoading: true});
    let product_image_id = await uploadImages();
    postProduct(product_image_id);
  };

  const postProduct = async product_image_id => {
    const payload = {
      package_price: carDetails.price,
      product_name: carDetails.title,
      car_plate_number: carDetails.plate_number,
      owner_type: carDetails.owner_id_type,
      owner_id: carDetails.owner_id,
      registration_date: carDetails.registration_date + ' 00:00:00.000Z',
      product_cc: carDetails.engine_capacity,
      omv: carDetails.omv,
      arf: carDetails.arf,
      coe: carDetails.coe,
      coe_expiry_date: carDetails.coe_expiry_date + ' 00:00:00.000Z',
      number_of_owners: carDetails.number_of_owners,
      vehicle_type: carDetails.type_of_vehicle,
      product_edition: carDetails.car_model,
      product_price: carDetails.asking_price,
      product_transmission: carDetails.transmission,
      fuel_type: carDetails.fuel_type,
      product_mileage: carDetails.mileage,
      vehicle_features: carDetails.features,
      accessories: carDetails.accessories,
      product_description: carDetails.description,
      details_type: true,
      product_condition: carDetails.car_condition,
      product_brand_id: carDetails.car_brand,
      is_off_peak_car: false,
      product_pickup_location: {
        street: carDetails.street,
        country: carDetails.location.country,
        region_name: carDetails.location.region,
        city: carDetails.location.city,
      },
      selected_ads_id: carDetails.ads_id,
      product_image_id: product_image_id,
    };

    let res = await api.POST(payload, '/products');

    setCarDetails({...carDetails, isLoading: false});
    if (res?.data?.success) {
      navigation.pop();
    } else {
      alert('Something went wrong!');
    }
  };

  const uploadImages = async () => {
    const images = carDetails.images;

    for (let i = 0; i < images.length; i++) {
      const payload = {
        file: images[i].uri,
        filename: images[i].fileName,
      };

      const res = await api.POST_IMAGE(payload, '/images');
      if (res.success) {
        ids = [...ids, res.data._id];
      } else {
        ids = [];
      }
    }

    return ids;
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.white}}>
      <View style={{padding: 24, flex: 1}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          {/* {localizedStrings.CreateAdIndex.Step8Title} */}
          You are on the last step to create your ad.
        </Text>
        <Spacer bottom={40} />

        <Image
          source={logo}
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Spacer bottom={48} />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <PrimaryButton
            onPress={onSubmit}
            color={theme.primaryBlue}
            // title={localizedStrings.CreateAdIndex.ProceedBtn}
            title="Proceed"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadEighthStep;
