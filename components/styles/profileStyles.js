import { StyleSheet } from 'react-native';
import { theme } from '../contants/colors';

export const profileStyles = StyleSheet.create({
    container :{
        backgroundColor:theme.lightBlue,
        display:'flex',
        flex:1
    },
    headerContainer:{
        backgroundColor:theme.white,
        paddingVertical:20,
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    headerName:{
        fontSize:20,
        marginHorizontal:10
    },
    infoContainer:{
        backgroundColor:theme.white,
        marginTop:20,
        paddingHorizontal:20,
        paddingVertical:20,
    },
    infoHead:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:10
    },
    infoHeadTitle:{
        color:theme.black,
        fontWeight:'bold',
        fontSize:20
    },
    infoDetailsContainer:{
        marginVertical:5
    },
    infoDetailsType:{
        color:theme.gray,
        fontSize:15
    },  
    infoDetailsText:{
        color:theme.black,
        marginBottom:10,
        fontSize:18,
    },
    othersContainer:{
        backgroundColor:theme.white,
        marginTop:20,

        paddingHorizontal:20,
        paddingVertical:20,
    },
    otherDetailsContainer:{
        marginVertical:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },  
    othersDetailsText:{
        color:theme.black,
        fontSize:18,
        marginVertical:10
    },
    logoutBtn : {
        margin:20
    },
    line:{
        backgroundColor:theme.gray
    },
    versionText:{
        color:theme.black,
        fontSize:10,
        textAlign:'center',
        marginTop:10
    },
    editContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },

    languageOverlay:{
        height:80,
        width:200,
        padding:10,
        display:'flex',
        justifyContent:'space-between'
        
    }
})

