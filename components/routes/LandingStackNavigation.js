import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import LandingIndex from '../screens/landing_page/LandingIndex';
import ProductView from '../screens/landing_page/product_view/ProductView';
import FilterIndex from '../screens/filter_page/FilterIndex';
import CreateAdIndex from '../screens/create_ad_page/CreateAdIndex';
import SellerView from '../screens/landing_page/seller_view/SellerView';
import Sellers from '../screens/landing_page/seller_view/Sellers';
import ImageViewer from '../screens/landing_page/product_view/ImageViewer';
import SearchResult from '../screens/search_result_page/search_result';
import Help from '../screens/profile_page/help_center/Help';

const Stack = createNativeStackNavigator();

export const LandingStackNavigation = ({navigation, route}) => {
  const tabHiddenRoutes = [
    'ProductView',
    'ImageViewer',
    'FilterIndex',
    'SellerView',
    'SearchResult',
    'CreateAdIndex',
  ];

  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  } else {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LandingIndex">
      <Stack.Screen name="LandingIndex" component={LandingIndex} />
      <Stack.Screen name="ProductView" component={ProductView} />
      <Stack.Screen name="ImageViewer" component={ImageViewer} />
      <Stack.Screen name="FilterIndex" component={FilterIndex} />
      <Stack.Screen name="CreateAdIndex" component={CreateAdIndex} />
      <Stack.Screen name="SellerView" component={SellerView} />
      <Stack.Screen name="TopDealers" component={Sellers} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="Help" component={Help}/>
    </Stack.Navigator>
  );
};
