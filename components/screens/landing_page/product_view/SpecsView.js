import React , {useState , useEffect} from 'react'
import { View , Text , Dimensions } from 'react-native'
import { productStyles } from '../../../styles/productStyle'
import { TabView, TabBar } from 'react-native-tab-view';
import { theme } from '../../../contants/colors';
import { sellersStyles } from '../../../styles/sellersStyles';

const initialLayout = { width: Dimensions.get('window').width };

const SpecsView = (props) => {

    const {item , localizedStrings , isFocused} = props 
    
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Text style={{paddingVertical:10 , paddingHorizontal:20}}>{item.product_description}</Text>; 
            case 'second':
                return <Text style={{paddingVertical:10 , paddingHorizontal:20}}>{item.vehicle_features}</Text>; 
            case 'third':
                return <Text style={{paddingVertical:10 , paddingHorizontal:20}}>{item.accessories}</Text>; 
            default:
                return null;
        }
    };

    useEffect(()=>{
        if(isFocused){
            setRoutes([
                // { key: 'first', title: localizedStrings.SingleProductView.Description },
                // { key: 'second', title: localizedStrings.SingleProductView.Features },
                // { key: 'third', title: localizedStrings.SingleProductView.Accessories },
                { key: 'first', title: "Description" },
                { key: 'second', title: "Features" },
                { key: 'third', title: "Accessories" },
            ])
        }
    },[isFocused])

    return (
        <View style={{height:300 , backgroundColor:theme.black}}>
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
                style={productStyles.tabContainer}
            />
        </View>
    )
}

export default SpecsView
