import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { theme } from '../contants/colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SimpleFallback = ({message}) => {

    return (
        <View
            style={{
                display:'flex',
                height:windowHeight*0.7,
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <Text style={{color:theme.gray , fontSize:20 , fontWeight:'500'}}>{message}</Text>
        </View>
    )
}

export const FetchFailed = ({message}) => {
    return (
        <View
            style={{
                paddingHorizontal:10
            }}
        >
            <Text style={{color:theme.gray , fontSize:20 , fontWeight:'500' , textAlign:'center'}}>{message}</Text>
        </View>
    )
}
