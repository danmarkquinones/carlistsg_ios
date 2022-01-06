import React , {useEffect} from 'react'
import { View , Text , Image} from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import { theme } from '../contants/colors';

const LoaderScreen = (props) => {

    const {navigation} = props

    const isFocused = useIsFocused()

    useEffect(()=>{
        if(isFocused){
            setTimeout(()=>{
                navigation.navigate('TabNav')
            },3000)
        }
    },[isFocused])

    return (
        <View
            style={{
                backgroundColor:theme.primaryBlue,
                display:'flex',
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <Image source={require('../../assets/images/loader1.gif')}/>
            <Text>CARLIST.MY</Text>
            <Text>LOADING...</Text>
        </View>
    )
}

export default LoaderScreen
