import { StyleSheet } from 'react-native';
import { theme } from '../../../contants/colors';

export const helpStyles = StyleSheet.create({
    helpContainer :{
        backgroundColor:theme.white,
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    iconContainer:{
        position:'relative',
        borderWidth:5,
        borderColor:theme.primaryBlue,
        borderRadius:100,
        paddingVertical:20,
        paddingHorizontal:20,
    },
    callIcon:{
        position:'absolute',
        left:30,
        bottom:30
    },
    mailIcon:{
        position:'absolute',
        right:0,
        bottom:20
    },
    textContainer:{
        margin:20,
    },
    textHeader:{
        textAlign:'center',
        color:theme.black,
        fontSize:25,
        fontWeight:'bold'
    },
    textParagraph:{
        textAlign:'center',
        color:theme.gray,
        fontSize:15,
        marginBottom:10
    },
    buttons:{
        marginTop:10
    }
})

