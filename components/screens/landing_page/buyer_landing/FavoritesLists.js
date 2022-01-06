import React , {useEffect , useState} from 'react'
import { FlatList , Text , View} from 'react-native'
import { SquareCard, WhiteCard } from '../../../custom_components/customCards'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../../contants/colors';
import { SkeletonSquareCard } from '../../../custom_components/customCardLoaders';
import { FetchFailed } from '../../../custom_components/customFallbacks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const FavoritesLists = (props) => {

    const {navigation , handleSeeMore , refreshing , localizedStrings} = props 

    const [data , setData] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    const isFocused = useIsFocused()

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const data = await AsyncStorage.getItem('savedCars')
            const parsedData = JSON.parse(data)
            if(parsedData.length>5){
                setData(parsedData.slice(0,5))
            }else{
                setData(parsedData)
            }
            setIsLoading(false)
        } catch(e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(isFocused){
            fetchData()
        }
    }, [isFocused])

    // useEffect(() => {
    //     if(refreshing){
    //         fetchData()
    //     }
    // }, [refreshing])

    return (
        isLoading?
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[...Array(3)]}
                keyExtractor={(item,index)=>index}
                renderItem={({item})=>
                    <SkeletonSquareCard width={150} height={150} borderRadius={5} marginLeft={10}/>
                }
            />
        :!isLoading&&data.length===0?
            <FetchFailed 
                // message={localizedStrings.Fallbacks.NoFavorites}
                message="You do not have saved cars in your list. You can add a favorite by clicking the star icon."
            />
        :<FlatList
            horizontal
            data={data}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item , index})=>(
                index!==5 ?
                <SquareCard
                    onPress={()=>navigation.navigate('ProductView', item)}
                    car={item} 
                    Icon={()=><FontAwesome5 name='star' size={20} solid color={theme.yellow}/>}
                />
                :<WhiteCard onPress={()=>handleSeeMore('FavoriteStacks')} options={{width:150}}/>
            )}
        />
    )
}

export default FavoritesLists
