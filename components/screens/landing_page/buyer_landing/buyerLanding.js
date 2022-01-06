import React , {useContext , useState , useEffect} from 'react'
import { Text, View , ScrollView , Image, TouchableOpacity , RefreshControl } from 'react-native'
import { theme } from '../../../contants/colors'
import { landingStyles } from '../../../styles/landingStyles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomAvatar from '../../../custom_components/customAvatar'
import PrimaryInput from '../../../custom_components/customInput'
import FavoritesLists from './FavoritesLists'
import QualifiedLists from './QualifiedLists'
import HotDealsLists from './HotDealsLists'
import NewCarLists from './NewCarLists'
import TopDealersLists from './TopDealersLists'
import TopLocations from './TopLocations'
import { useIsFocused } from '@react-navigation/core';
import { UserConfigContext } from '../../../store/context_api/userContext';
import { fetchTotalVerifiedCars } from '../../../store/api_calls/cars_api';
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../../../languages/landingLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const BuyerLanding = (props) => {

    const {navigation} = props
    const [userConfig , setUserConfig] = useContext(UserConfigContext)

    const [refreshing, setRefreshing] = useState(false);
    const [totalVerifiedCars , setTotalVerifiedCars] = useState(0)
    const isFocused = useIsFocused()
    // localizedStrings.setLanguage(userConfig.language)

    const getTotal = () => {
        const total = fetchTotalVerifiedCars()
        total.then((res)=>{
            if(res.status===200){
                // console.log(res.data.data.total_verified)
                setTotalVerifiedCars(res.data.data.total_verified)
            }
        }).catch(e=>console.log(e))
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTotal()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const handleSeeMore = (route , type) => {
        const filter = {
            type
        }
        navigation.navigate(route , filter)
    }

    useEffect(() => {
        getTotal()
    }, [])

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={userConfig.isLoggedIn?[1]:[0]}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }
        >
            {userConfig.isLoggedIn && userConfig.userDetails?
                <View style={landingStyles.headerContainer}>
                    <CustomAvatar initial={userConfig.userDetails?.user_email} color={theme.secondaryBlue} size={50}/>
                    <View style={landingStyles.headerNameView}>
                        <Text style={landingStyles.greetName}>
                            {/* {userConfig.isLoggedIn?`${localizedStrings.BuyerLanding.Greeting.Header} , ${userConfig.userDetails.user_first_name} ${userConfig.userDetails.user_last_name}`:'Hi There!'} */}

                            {userConfig.isLoggedIn?`Hello , ${userConfig.userDetails.user_first_name} ${userConfig.userDetails.user_last_name}`:'Hi There!'}
                        </Text>
                        <Text style={landingStyles.listedCar}>
                            {/* {localizedStrings.BuyerLanding.Greeting.WeHave} {totalVerifiedCars} {localizedStrings.BuyerLanding.Greeting.CarsListed} */}
                            We have {totalVerifiedCars} cars listed
                        </Text>
                    </View>
                </View>
            :null}

            <View style={landingStyles.searchContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('FilterIndex')}>
                    <PrimaryInput 
                        editable={false} 
                        // placeholder={localizedStrings.BuyerLanding.Search.InputPlaceholder}
                        placeholder="Find your dream car now!"
                        Icon={()=><FontAwesome5 name='search' size={20}/>}
                    />
                </TouchableOpacity>
            </View>

            <View style={landingStyles.adContainer}>
                <Image style={landingStyles.adsImage} source={require('../../../../assets/images/ad_3.png')}/>
            </View>

            <View style={landingStyles.listHeaderContainer}>
                <View style={landingStyles.listHeaders}>
                    <FontAwesome5 name='star' size={20} solid color={theme.yellow}/>
                    <Text style={landingStyles.listHeaderText}>
                        {/* {localizedStrings.BuyerLanding.Categories.Favorite} */}
                        Your Favorites
                    </Text>
                </View>
                {/* <Text style={landingStyles.listDesc}>The cars are thoroughly inspected and protected with an extended warranty endorsed by Warranty Smart</Text> */}
            </View>

            <View>
                <FavoritesLists 
                    // localizedStrings={localizedStrings} 
                    refreshing={refreshing} handleSeeMore={handleSeeMore} {...props}/>
            </View>
            

            <View style={landingStyles.listHeaderContainer}>
                <View style={landingStyles.listHeaders}>
                    <FontAwesome5 name='check-circle' size={20} solid color={theme.green}/>
                    <Text style={landingStyles.listHeaderText}>
                        {/* {localizedStrings.BuyerLanding.Categories.Qualified} */}
                        Carlist Qualified
                    </Text>
                </View>
                {/* <Text style={landingStyles.listDesc}>The cars are thoroughly inspected and protected with an extended warranty endorsed by Warranty Smart</Text> */}
            </View>

            <View>
                <QualifiedLists 
                    // localizedStrings={localizedStrings} 
                    refreshing={refreshing} {...props} handleSeeMore={handleSeeMore}/>
            </View>
            

            <View style={landingStyles.listHeaderContainer}>
                <View style={landingStyles.listHeaders}>
                    <FontAwesome5 name='hotjar' size={20} solid color={theme.red}/>
                    <Text style={landingStyles.listHeaderText}>
                        {/* {localizedStrings.BuyerLanding.Categories.Popular} */}
                        Popular Deals
                    </Text>
                </View>
                {/* <Text style={landingStyles.listDesc}>The cars are thoroughly inspected and protected with an extended warranty endorsed by Warranty Smart</Text> */}
            </View>

            <View>
                <HotDealsLists 
                    // localizedStrings={localizedStrings} 
                    refreshing={refreshing} {...props} handleSeeMore={handleSeeMore}/>
            </View>

            <View style={landingStyles.listHeaderContainer}>
                <View style={landingStyles.listHeaders}>
                    <Text style={landingStyles.newBadge}>
                        {/* {localizedStrings.BuyerLanding.Categories.New} */}
                        New
                    </Text>
                    <Text style={landingStyles.listHeaderText}>
                        {/* {localizedStrings.BuyerLanding.Categories.Listings} */}
                        Listings
                    </Text>
                </View>
                {/* <Text style={landingStyles.listDesc}>The cars are thoroughly inspected and protected with an extended warranty endorsed by Warranty Smart</Text> */}
            </View>
            
            <View>
                <NewCarLists 
                    // localizedStrings={localizedStrings} 
                    refreshing={refreshing} {...props} handleSeeMore={handleSeeMore}/> 
            </View>

            <View style={landingStyles.adContainer}>
                <Image style={landingStyles.adsImage} source={require('../../../../assets/images/ad_2.png')}/>
            </View>

            <View style={landingStyles.listHeaderContainer}>
                <View style={landingStyles.listHeaders}>
                    <Text style={landingStyles.listDealerText}>
                        {/* {localizedStrings.BuyerLanding.Categories.TopSellers} */}
                        Top Sellers
                    </Text>
                </View>
                {/* <Text style={landingStyles.listDesc}>The cars are thoroughly inspected and protected with an extended warranty endorsed by Warranty Smart</Text> */}
            </View>
            
            <View>
                <TopDealersLists refreshing={refreshing} {...props} handleSeeMore={handleSeeMore}/>
            </View>
            
            <View style={landingStyles.locationListContainer}>

                <View style={landingStyles.listHeaders}>
                    <Text refreshing={refreshing} style={landingStyles.listDealerText}>
                        {/* {localizedStrings.BuyerLanding.Categories.TopLocations} */}
                        Top Locations
                    </Text>
                </View>

                <TopLocations refreshing={refreshing} {...props} handleSeeMore={handleSeeMore}/>
            </View>
            
            
        </ScrollView>
    )
}

export default BuyerLanding
