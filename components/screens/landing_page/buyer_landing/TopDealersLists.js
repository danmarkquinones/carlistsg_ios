import React , {useEffect , useState} from 'react'
import { FlatList } from 'react-native'
import { DealerCard, WhiteCard } from '../../../custom_components/customCards';
import { fetchLandingPageLists } from '../../../store/api_calls/cars_api';
import { SkeletonSquareCard } from '../../../custom_components/customCardLoaders';
import { FetchFailed } from '../../../custom_components/customFallbacks';

const TopDealersLists = props => {
  const {navigation, refreshing} = props;
  const [dealers, setDealers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    const getLocations = fetchLandingPageLists('featured-dealers');
    getLocations
      .then(res => {
        if (res.data) {
          const displayDealers = res.data.data;
          setDealers(displayDealers);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('call failed', e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchData();
    }
  }, [refreshing]);

  return (
    <>
      {isLoading ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(3)]}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <SkeletonSquareCard
              width={150}
              height={150}
              borderRadius={5}
              marginLeft={10}
            />
          )}
        />
      ) : !isLoading && dealers.length === 0 ? (
        <FetchFailed 
            // message={localizedStrings.Fallbacks.NoData}
            message="There seems to be a problem getting your request, please try again later"
        />
      ) : (
        <FlatList
          horizontal
          data={dealers}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) =>
            index !== 3 ? (
              <DealerCard
                dealer={item}
                onPress={() => navigation.navigate('SellerView', item)}
              />
            ) : (
              <WhiteCard
                options={{width: 150}}
                onPress={() => navigation.navigate('SearchResult')}
              />
            )
          }
        />
      )}
    </>
  );
};

export default TopDealersLists
