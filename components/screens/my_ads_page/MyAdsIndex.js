import React, {useState, useEffect, useContext} from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/core';
import {GridCard, ListCard} from '../../custom_components/customCards';
import {theme} from '../../contants/colors';
import PrimaryInput from '../../custom_components/customInput';
import Spacer from '../../custom_components/spacer';
import CustomHeader from '../../custom_components/customHeader';
import {scaleFont} from '../../../utils/scale';
import SorterComponent from '../../reusable_components/sorterComponent';
import {cars} from '../../contants/dummyCarData';
import {api} from '../../store/api_calls/useApi';
import {UserConfigContext} from '../../store/context_api/userContext';
import {SkeletonSquareCard} from '../../custom_components/customCardLoaders';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MyAdsIndex = () => {
  const navigation = useNavigation();
  const [userConfig] = useContext(UserConfigContext);

  const [page, setPage] = useState(1);

  const [config, setConfig] = useState({
    sortBy: 'ascending',
    isGridView: true,
    listCars: cars,
  });

  const [sortBy, setSortBy] = useState({
    sort: 'asc-price',
    height: 250,
    options: [
      {value: 'asc-price', label: 'Price - Lowest'},
      {value: 'desc-price', label: 'Price - Highest'},
      {value: 'asc-date-posted', label: 'Date - Newest'},
      {value: 'desc-date-posted', label: 'Date - Oldest'},
      {value: 'relevancy', label: 'By Relevance'},
    ],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAdvertiserProducts();
  }, []);

  const fetchAdvertiserProducts = async value => {
    setIsLoading(true);
    const params = {
      _id: userConfig.userDetails._id,
      page: 1,
      limit: 10,
      sort: value ? value : sortBy.sort,
    };

    const res = await api.GET('/advertiser', params);

    console.log(res);

    if (res?.data?.success) {
      setProducts(res.data.data[0].advertiser_products);
      setIsLoading(false);
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  };

  const onDeleteProduct = async id => {
    const res = await api.DELETE('/products/delete', {id});

    const filteredProducts = products.filter(product => product._id !== id);
    setProducts(filteredProducts);
    // console.log(res);
  };

  const onMarkAsSold = async id => {
    const res = await api.UPDATE('/products/sell', {id});
    console.log(res);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    fetchAdvertiserProducts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onChange = value => {
    setSortBy({...sortBy, sort: value});
    fetchAdvertiserProducts(value);
    // setFilters({...filters, sort: value});
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.lightBlue}}>
      <CustomHeader
        canGoBack={false}
        titleStyle={{
          fontSize: scaleFont(20),
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        title="SGCARLIST"
        isTitleCenter
      />

      <SorterComponent
        sortBy={sortBy}
        config={config}
        setConfig={setConfig}
        onChange={onChange}
      />

      <View style={{flex: 1}}>
        <Spacer bottom={16} />
        {/* <View style={{width: '90%', alignSelf: 'center'}}>
          <PrimaryInput placeholder="Search your listed car" />
        </View> */}
        <Spacer bottom={16} />

        {isLoading && (
          <FlatList
            contentContainerStyle={{padding: 8}}
            showsHorizontalScrollIndicator={false}
            data={[...Array(6)]}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <>
                <SkeletonSquareCard
                  width={'100%'}
                  height={115}
                  borderRadius={5}
                />
                <Spacer bottom={8} />
              </>
            )}
          />
        )}

        {!isLoading && products.length ? (
          <FlatList
            key={config.isGridView}
            contentContainerStyle={{
              alignItems: config.isGridView ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              paddingBottom: 150,
            }}
            numColumns={config.isGridView ? 2 : 1}
            data={products}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return config.isGridView ? (
                <GridCard
                  onPress={() => navigation.navigate('ProductView', item)}
                  car={item}
                  Icon={() => <Icon name="kebab-horizontal" size={20} solid />}
                  sellerMode={true}
                  deleteProduct={onDeleteProduct}
                  onMarkAsSold={onMarkAsSold}
                />
              ) : (
                <ListCard
                  onPress={() => navigation.navigate('ProductView', item)}
                  car={item}
                  Icon={() => <Icon name="kebab-horizontal" size={20} solid />}
                  sellerMode={true}
                  deleteProduct={onDeleteProduct}
                  onMarkAsSold={onMarkAsSold}
                />
              );
            }}
          />
        ) : null}

        {!isLoading && !products.length ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              You don't have any ads posted yet.
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};;

export default MyAdsIndex;
