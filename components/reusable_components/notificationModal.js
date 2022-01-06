import React from 'react'
import { Text , View ,StyleSheet, TouchableOpacity} from 'react-native'
import { PrimaryButton } from '../custom_components/customButtons'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { theme } from '../contants/colors';

const NotificationModal = (props) => {

    const {onConfirm , onCancel , localizedStrings} = props

    return (
        <View style={notifStyles.container}>
            <Text style={notifStyles.header}>Get Notified!</Text>

            <View
                style={notifStyles.iconContainer}
            >
                <FAIcon name='bell' size={100} color={theme.primaryBlue}/>
                <IonIcon style={notifStyles.alert} name='alert-circle' size={40} color={theme.red}/>
            </View>

            <Text style={notifStyles.paragraph}>
            Allow Carlist.SG to send you push notifications when you have new messages & offers.
            </Text>

            <View
                style={notifStyles.confirm}
            >
                <PrimaryButton
                    title="LET'S DO IT!"
                    onPress={onConfirm}
                    color={theme.primaryBlue}
                />
            </View>

            <View
                style={notifStyles.cancel}
            >
                <TouchableOpacity onPress={onCancel}>
                    <Text>No thanks , another time.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const notifStyles = StyleSheet.create({
    container:{
        borderRadius:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:25,
        paddingHorizontal:10,
    },
    header:{
        textAlign:'center',
        fontSize:35,
        color:theme.primaryBlue,
        fontWeight:'bold'
    },
    paragraph:{
        textAlign:'center',
        fontSize:18,
    },
    confirm:{
        marginTop:20,
        width:'100%'
    },
    iconContainer:{
        marginVertical:20,
        position:'relative'
    },
    alert:{
        position:'absolute',
        right:0
    },
    cancel:{
        marginTop:30,
        marginBottom:10
    }
})

export default NotificationModal
