import { StyleSheet } from 'react-native';
import { theme } from '../../../contants/colors';

export const editFormStyles = StyleSheet.create({
    editFormContainer :{
        display:'flex',
        flex:1,
        backgroundColor:theme.white,
        paddingVertical:20,
        paddingHorizontal:20
    },
    fieldContainer:{
        marginTop:15
    },
    headerLabel:{
        marginVertical:20,
        marginHorizontal:10
    },
    headerLabelText:{
        fontSize:20
    }
})

