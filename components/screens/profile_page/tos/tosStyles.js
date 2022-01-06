import { StyleSheet } from 'react-native';
import { theme } from '../../../contants/colors';

export const tosStyles = StyleSheet.create({
    tosContainer :{
        backgroundColor:theme.white,
        display:'flex',
        flex:1,
        paddingVertical:20,
        paddingHorizontal:20
    },
    textContainer:{
        marginVertical:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },  
    text:{
        color:theme.black,
        fontSize:18,
        marginVertical:10
    },
    textActive:{
        color:theme.primaryBlue,
        fontSize:18,
        marginVertical:10,
        fontWeight:'bold'
    },

    ppQuestion:{
        marginBottom:10,
        fontWeight:'500',
        fontSize:15
    },
    ppSubTitle:{
        fontWeight:'300',
        marginLeft:10,
        marginTop:5
    },
    ppBullets:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        marginLeft:20,
        marginVertical:5
    },
    ppHeader:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:5
    },
    ppContent:{
        marginBottom:5
    }
})

