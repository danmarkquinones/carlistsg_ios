import React , {useState , useContext} from 'react'
import { View , ScrollView, Text , TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../styles/globalStyles'
import { tosStyles } from './tosStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../contants/colors';
import { Divider } from 'react-native-elements';
import CustomHeader from '../../../custom_components/customHeader';
import Collapsible from 'react-native-collapsible';
import {TOSContent} from './tosContent';
import {PPContent} from './ppContent'
// import LocalizedStrings from 'react-native-localization';
import { UserConfigContext } from '../../../store/context_api/userContext';

// var localFile = require('../../../languages/profileLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const TermsService = (props) => {

    const {navigation} = props
    const [userConfig] = useContext(UserConfigContext)
    const [isCollapsed , setIsCollapsed] = useState({
        tos:true,
        pp:true
    })
    // localizedStrings.setLanguage(userConfig.language)

    return (
        <View style={{display:'flex' , flex:1, backgroundColor:theme.white}}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <CustomHeader title="Privacy Policy & TOS"/>
                <View style={tosStyles.tosContainer}>
                    <TouchableOpacity
                        onPress={()=>setIsCollapsed({...isCollapsed , tos:!isCollapsed.tos})}
                    >
                        <View style={tosStyles.textContainer}>
                            <Text style={isCollapsed.tos? tosStyles.text:tosStyles.textActive}>Terms & Conditions of Use</Text>
                            <Icon name={isCollapsed.tos?"keyboard-arrow-down":"keyboard-arrow-up"} size={25}  color={theme.gray}/>
                        </View>
                    </TouchableOpacity>

                    <Collapsible collapsed={isCollapsed.tos}>
                        <TOSContent/>
                    </Collapsible>

                    <Divider style={{marginTop : isCollapsed.tos? 0:20}}/>

                    <TouchableOpacity
                        onPress={()=>setIsCollapsed({...isCollapsed , pp:!isCollapsed.pp})}
                    >
                        <View style={tosStyles.textContainer}>
                            <Text style={isCollapsed.pp? tosStyles.text:tosStyles.textActive}>Privacy Policy</Text>
                            <Icon name={isCollapsed.pp?"keyboard-arrow-down":"keyboard-arrow-up"} size={25}  color={theme.gray}/>
                        </View>
                    </TouchableOpacity>

                    <Collapsible collapsed={isCollapsed.pp}>
                        <PPContent/>
                    </Collapsible>

                    <Divider style={{marginTop : isCollapsed.pp? 0:20}}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default TermsService
