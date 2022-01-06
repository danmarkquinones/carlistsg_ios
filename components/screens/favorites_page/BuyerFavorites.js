import React , {useState , useEffect, useContext} from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import CustomHeader from '../../custom_components/customHeader';
import {theme} from '../../contants/colors';
import SorterComponent from '../../reusable_components/sorterComponent';
import { cars, pinnedFilters } from '../../contants/dummyCarData';
import { GridCard , ListCard, PinnedFilterCard } from '../../custom_components/customCards';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SimpleFallback } from '../../custom_components/customFallbacks';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removePinnedFilter, removeToSavedCars } from '../../store/helpers/globalFunctions';
import { SkeletonListCard } from '../../custom_components/customCardLoaders';
import { FilterConfigContext } from '../../store/context_api/filterContext';
import { UserConfigContext } from '../../store/context_api/userContext';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../languages/favoritesLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const SavedCars = ({config , setConfig , navigation , localizedStrings}) => {

    const [favoriteCars , setFavoriteCars] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const [sortBy,setSortBy] = useState({
        sort:"asc-price",
        height:120,
        options:[]
    })

    useEffect(() => {
        getSavedCars()
    }, [])

    useEffect(() => {
        if(isFocused){
            getSavedCars()
            setSortBy({
                ...sortBy,
                options:[
                    // {value:"asc-price" , label:localizedStrings.Dropdown.PriceLowest},
                    // {value:"desc-price" , label:localizedStrings.Dropdown.PriceHighest},
                    {value:"asc-price" , label:"Price - Lowest"},
                    {value:"desc-price" , label:"Price - Highest"},
                    
                ]
            })
        }
    }, [isFocused])


    const getSavedCars = async () => {
        setIsLoading(true)
        try {
          const data = await AsyncStorage.getItem('savedCars')
          if(data){
            let sortedData = JSON.parse(data)
            console.log('filter data' , sortedData)
            sortedData.sort(function(a,b){
                return a.product_price - b.product_price;
            });
            setFavoriteCars(sortedData)
            setIsLoading(false)
          }else{
              AsyncStorage.setItem('savedCars' , '[]')
              setIsLoading(false)
          }
        } catch(e) {
            console.log('ERROR',e)
            setIsLoading(false)
        }
    }

    const removeToFavorite=(item)=>{
        const filteredData = favoriteCars.filter(el=>el._id!==item._id)
        setFavoriteCars(filteredData)
        removeToSavedCars(item)
    }

    const goToProduct=(item)=>{
        navigation.navigate('ProductView', item)
    }

    const onChange = (value) => {
        let sortedData = favoriteCars

        if(value==='asc-price'){
            sortedData.sort(function(a,b){
                return a.product_price - b.product_price;
            });
        }else{
            sortedData.sort(function(a,b){
                return b.product_price - a.product_price;
            });
        }
        setFavoriteCars(sortedData)
        setSortBy({...sortBy,sort:value})
    }

    return(
        <View style={styles.scene} >

                <SorterComponent sortBy={sortBy} setSortBy={setSortBy} config={config} setConfig={setConfig} onChange={onChange}/>

                <View style={styles.sceneList}>
                    {isLoading? 
                        <FlatList
                            data={[...Array(3)]}
                            keyExtractor={(item,index)=>index}
                            renderItem={({item})=>
                                <SkeletonListCard width={500} height={100} borderRadius={5} margin={5}/>
                            }
                        />
                    :!isLoading&&favoriteCars?.length===0?
                        <SimpleFallback 
                            // message={localizedStrings.Fallbacks.NoSavedCars}
                            message="No saved car."
                        />
                    :<FlatList
                        data={favoriteCars}
                        key={config.isGridView}
                        contentContainerStyle={{ 
                            alignItems: config.isGridView ?'flex-start':'center' , 
                            justifyContent: 'space-between', 
                            paddingBottom:100
                        }}
                        numColumns={config.isGridView ? 2 : 1}                  // set number of columns 
                        keyExtractor={item=>item._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item , index})=>(
                            <TouchableOpacity onPress={()=>goToProduct(item)}>
                            {config.isGridView?
                                <GridCard 
                                    car={item} 
                                    Icon={()=><FontAwesome5 name='star' size={20} solid color={theme.yellow}/>}
                                    inFavorites={true}
                                    onPress={()=>removeToFavorite(item)}
                                />
                                :<ListCard 
                                    car={item} 
                                    Icon={()=><FontAwesome5 name='star' size={20} solid color={theme.yellow}/>}
                                    inFavorites={true}
                                    onPress={()=>removeToFavorite(item)} 
                                />
                            }
                            </TouchableOpacity>
                        )}
                    />
                    }
                    
                </View>
        </View>
    )
};

const PinnedFilters = ({config , setConfig , navigation , localizedStrings}) => {

    const [pinnedFilters , setPinnedFilters] = useState([])
    const [isLoading , setIsLoading] = useState([])
    const [filters , setFilters] = useContext(FilterConfigContext)
    const isFocused = useIsFocused()
    

    useEffect(() => {
        if(isFocused){
            getPinnedFilters()
        }
        // console.log('filters',pinnedFilters) 
    }, [isFocused])

    const goToSearchResult = (data) => {
        setFilters(data)
        // navigation.navigate('SearchResult')
    }

    const getPinnedFilters = async () => {
        setIsLoading(true)
        try {
          const data = await AsyncStorage.getItem('pinnedFilters')
          if(data){
            setPinnedFilters(JSON.parse(data))
            setIsLoading(false)
          }else{
              AsyncStorage.setItem('pinnedFilters' , '[]')
              setIsLoading(false)
          }
        } catch(e) {
          console.log(e)
          setIsLoading(false)
        }
    }

    const unPin = (data) => {
        setPinnedFilters(pinnedFilters.filter(el=>el.id!==data.id))
        removePinnedFilter(data)
    }

    return(
        <View style={[{...styles.scene},{backgroundColor:theme.white}]} >
            <View style={styles.sceneList}>
                {isLoading?
                    <FlatList
                        data={[...Array(3)]}
                        keyExtractor={(item,index)=>index}
                        renderItem={({item})=>
                            <SkeletonListCard width={500} height={100} borderRadius={5} margin={5}/>
                        }
                    />
                :!isLoading&&pinnedFilters.length===0?
                    <SimpleFallback 
                        // message={localizedStrings.Fallbacks.NoPinnedFilter}
                        message="No Pinned Filter"
                    />
                :<FlatList
                        data={pinnedFilters}
                        keyExtractor={item=>item.id}
                        renderItem={({item , index})=>(
                            <PinnedFilterCard
                                index={index}
                                filter={item}
                                onPress={()=>goToSearchResult(item)}
                                onUnpin={()=>unPin(item)}
                            />
                        )}
                    />
                }
            </View>
        </View>
    )
};

const initialLayout = { width: Dimensions.get('window').width };


const BuyerFavorites = (props) => {

    const {navigation} = props

    const [index, setIndex] = useState(0);
    const [userConfig] = useContext(UserConfigContext)
    const isFocused = useIsFocused()
    // localizedStrings.setLanguage(userConfig.language)

    const [config , setConfig] = useState({
        sortBy:'ascending',
        isGridView:true,
        savedCars:cars,
        pinnedFilters:pinnedFilters
    })

    const [routes , setRoutes] = React.useState([]);

    useEffect(()=>{
        if(isFocused){
            setRoutes([
                // { key: 'first', title: localizedStrings.Tab.SavedCars },
                // { key: 'second', title: localizedStrings.Tab.PinnedFilters },
                { key: 'first', title: "Saved Cars" },
                { key: 'second', title: "Pinned Filter" },
            ])
        }
    },[isFocused])


    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <SavedCars config={config} setConfig={setConfig} {...props} 
                // localizedStrings={localizedStrings}
            />; // passing data as data prop
          case 'second':
            return <PinnedFilters config={config} setConfig={setConfig} {...props} 
                // localizedStrings={localizedStrings}
            />; 
          default:
            return null;
        }
    };

    return (
        <View style={{flex:1}}>
            <CustomHeader 
                // title={localizedStrings.StackNavHeader.Favorites}
                title="Favorites"
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={(props) => (
                    <TabBar 
                        {...props} 
                        style={{backgroundColor: theme.white}}
                        renderLabel={({ focused, route }) => {
                            return (
                                <Text
                                    style={{
                                        fontWeight:'500',
                                        color:focused?theme.primaryBlue:theme.black
                                    }}
                                >
                                    {route.title}
                                </Text>
                            );
                          }}
                        indicatorStyle={{backgroundColor:theme.primaryBlue}}
                    />
                )}
                
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.container}
            />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:theme.lightBlue
  },
  scene: {
    flex: 1,
  },
  sceneList:{
    //   padding:20
  }
});


export default BuyerFavorites;