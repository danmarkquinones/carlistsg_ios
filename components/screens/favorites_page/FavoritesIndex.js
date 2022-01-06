import React, {useContext} from 'react';
import {View} from 'react-native';
import MyAdsIndex from '../my_ads_page/MyAdsIndex';
import {UserConfigContext} from '../../store/context_api/userContext';
import BuyerFavorites from './BuyerFavorites';


const FavoritesIndex = (props) => {
  const [userConfig] = useContext(UserConfigContext);
  return (
    <View style={{flex: 1}}>
      {userConfig.isSellMode === 0 ? <BuyerFavorites {...props} /> : <MyAdsIndex />}
    </View>
  );
};

export default FavoritesIndex;
