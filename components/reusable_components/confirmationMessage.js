import React from 'react'
import { View ,Text ,StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from '../contants/colors'
import { PrimaryButton } from '../custom_components/customButtons'

const ConfirmationMessage = (props) => {

    const {message , onConfirm , onCancel} = props

    return (
        <View style={confirmStyles.container}>
            <Text style={confirmStyles.header}>{message}</Text>

            <View style={confirmStyles.btnContainer}>
                <View
                    style={confirmStyles.cancel}
                >
                    <TouchableOpacity onPress={onCancel}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={confirmStyles.confirm}
                >
                    <PrimaryButton
                        title="Confirm" 
                        onPress={onConfirm}
                        color={theme.primaryBlue}
                    />
                </View>                
            </View>
            
        </View>
    )
}

export const confirmStyles = StyleSheet.create({
    container:{
        borderRadius:5,
        display:'flex',
        justifyContent:'center',
        paddingVertical:15,
        paddingHorizontal:10,
    },
    btnContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    header:{
        fontSize:20,
        color:theme.primaryBlue,
    },
    confirm:{
        marginTop:20,
        width:100
    },
    cancel:{
        marginTop:20,
        width:100
    }
})

export default ConfirmationMessage
