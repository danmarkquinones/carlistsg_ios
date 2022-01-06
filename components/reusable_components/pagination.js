import React from 'react'
import { Text, View , TouchableOpacity } from 'react-native'
import { theme } from '../contants/colors'

const Pagination = (props) => {

    const {pagination , setPagination} = props

    return (
        <View
            style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'center' , marginVertical:10}}
        >
            {pagination.numOfPage > 1 ? 
                [...Array(pagination.numOfPage)].map((el,i)=>
                <TouchableOpacity key={i} onPress={()=>setPagination({...pagination,page:i+1})}>
                    <View
                        style={{
                            paddingHorizontal:10,
                            paddingVertical:5,
                            backgroundColor:i+1===pagination.page?theme.primaryBlue:theme.white,
                            borderRadius:5
                        }}
                    >
                        <Text style={{
                            color:i+1===pagination.page?theme.white:theme.black,
                            fontWeight:i+1===pagination.page?'bold':'normal'
                        }}>{i+1}</Text>
                    </View>
                </TouchableOpacity>
            ):null}
        </View>
    )
}

export default Pagination
