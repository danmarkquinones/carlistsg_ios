import React,{useState , useEffect} from 'react'
import { View , Text} from 'react-native'
import { theme } from '../contants/colors'

const CustomAvatar = (props) => {
    const {initial , color , size}  = props

    const [text , setText] = useState("")

    useEffect(() => {
        generateInitial(initial)
    }, [])

    const generateInitial = (string) => {
        const letter = string?.substring(0, 1);
        setText(letter)
    }

    return (
        <View
            style={{
                backgroundColor:color,
                height:size,
                width:size,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:50
            }}
        >
            <Text
                style={{
                    color:theme.white,
                    fontWeight:'500',
                    fontSize:size*0.5
                }}
            >
                {text.toUpperCase()}
            </Text>
        </View>
    )
}

export default CustomAvatar
