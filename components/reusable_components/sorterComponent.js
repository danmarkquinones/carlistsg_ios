import React , {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../contants/colors'
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';

const SorterComponent = (props) => {

    const {config , setConfig , sortBy , setSortBy, onChange} = props
    const [isFocus, setIsFocus] = useState(false);

    // const renderLabel = () => {
    //   if (sortBy.sort || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };

    const toggleSwitchView = () => {
        setConfig({...config,isGridView:!config.isGridView})
    }
    
    return (
        <View
            style={styles.container}
        >
            <View 
                style={styles.sortContainer}
            >
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={sortBy.options}
                    // search
                    maxHeight={sortBy.height}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={sortBy.sort}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        onChange(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
            <View>
                <TouchableOpacity onPress={toggleSwitchView}>
                    {config.isGridView?
                        <MatIcon name='grid-view' color={theme.black} size={20}/>
                        :<MatIcon name='list' color={theme.black} size={20}/>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:theme.white,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:20
    },
    sortContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    sortText:{
        marginHorizontal:10,
        color:theme.black
    },
    dropdown: {
        height: 40,
        width:150,
        // borderColor: 'gray',
        // borderWidth: 0.5,
        // borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
        selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
        inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

export default SorterComponent
