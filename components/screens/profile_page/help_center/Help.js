import React , {useContext} from 'react'
import { View , Text, Linking, Alert, Platform } from 'react-native'
import { globalStyles } from '../../../styles/globalStyles'
import { helpStyles } from './helpStyles'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../../contants/colors';
import { PrimaryButton } from '../../../custom_components/customButtons';
import CustomHeader from '../../../custom_components/customHeader';
import { onCallUser } from '../../../store/helpers/globalFunctions';
// import LocalizedStrings from 'react-native-localization';
import { UserConfigContext } from '../../../store/context_api/userContext';

// var localFile = require('../../../languages/profileLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const Help = () => {

    const [userConfig] = useContext(UserConfigContext)
    // localizedStrings.setLanguage(userConfig.language)

    const onEmailLaunch = () => {
        const email = 'enquiries@sgcarlist.com'
        const subject = 'Carlist.SG Enquiries'
        const body = 'To report any fraud or misconduct that such employees or parties suspect is happening in Client organisation.%0D%0A%0D%0AAll reports received will be referred to Client organisation for follow-up actions or investigations.%0D%0A%0D%0AWhile you are encouraged to disclose your identity, this is not mandatory. We respect your desire for anonymity, and to preserve the confidentiality of the information you provide. However, our ability to contact you if required to seek further clarification or information may play a role in determining the effectiveness of any investigation.%0D%0A%0D%0A1.1 About who would you like to make this report?%0D%0AEmployee name:%0D%0A%0D%0A%0D%0A1.2 Please indicate date, time of conversation and subject :%0D%0ADepartment:%0D%0ADate & Time :%0D%0ASubject (s) :%0D%0A%0D%0A1.3Would you like to provide your name and contact details?%0D%0AName :%0D%0AContact information :%0D%0AEmail :'
        Linking.openURL(
            `mailto:${email}?subject=${subject}&body=${body}`
        )
    }

    return (
        <View
            style={globalStyles.container}
        >
            <CustomHeader title="Help & Feedback"/>
            
            <View style={helpStyles.helpContainer}>
                <View
                    style={helpStyles.iconContainer}
                >
                    <FAIcon style={helpStyles.groupIcon} name="group" size={100} color={theme.secondaryBlue}/>
                    <MatIcon style={helpStyles.callIcon} name="call" size={50} color={theme.primaryBlue}/>
                    {/* <FA5Icon style={helpStyles.mailIcon} name="mail-bulk" size={40} color={theme.primaryBlue}/> */}
                </View>

                <View style={helpStyles.textContainer}>
                    <Text style={helpStyles.textHeader}>We are here to assist you</Text>
                    <Text style={helpStyles.textParagraph}>If you required help with listings or have general enquiries , call or send us an email.</Text>

                    <View style={helpStyles.buttons}>
                        <PrimaryButton
                            color={theme.primaryBlue}
                            title={`call us : 65-67177933`}
                            onPress={()=>onCallUser('65-67177933')}
                            Icon={()=><MatIcon name="call" size={20} color={theme.white}/>}
                        />
                    </View>
                    <View style={helpStyles.buttons}>
                        <PrimaryButton
                            color={theme.primaryBlue}
                            title={`email us : enquiries@sgcarlist.com`}
                            onPress={onEmailLaunch}
                            Icon={()=><MatIcon name="mail" size={20} color={theme.white}/>}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Help
