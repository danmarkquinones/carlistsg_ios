import React , {useState , useEffect , useContext} from 'react'
import { ScrollView,  View , Text } from 'react-native'
import { Input } from 'react-native-elements'
import { theme } from '../../../contants/colors'
import { OffCancelButton, PrimaryButton } from '../../../custom_components/customButtons'
import CustomHeader from '../../../custom_components/customHeader';
import { updateProfile } from '../../../store/api_calls/user_api'
import { UserConfigContext } from '../../../store/context_api/userContext'
import { editFormStyles } from './editFormStyles';
// import LocalizedStrings from 'react-native-localization';
import { useToast } from "react-native-toast-notifications";

// var localFile = require('../../../languages/profileLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const EditForm = (props) => {

    const {navigation , route} = props
    const [userConfig , setUserConfig] = useContext(UserConfigContext)
    const [profileForm,setProfileForm] = useState({
        email:'',
        fname:'',
        lname:'',
        contact:''
    })
    // localizedStrings.setLanguage(userConfig.language)
    const toast = useToast();

    useEffect(() => {
        setProfileForm({
            ...profileForm,
            email:userConfig.userDetails.user_email,
            fname:userConfig.userDetails.user_first_name,
            lname:userConfig.userDetails.user_last_name,
            contact:userConfig.userDetails.user_contact_details.contact_numbers[0]
        })
    }, [])

    const handleProfileFieldChange = (name , value) => {
        setProfileForm({...profileForm,[name]:value})
    }

    const handleSubmit = () => {
        const obj = {
            // user_email:profileForm.email,
            user_first_name: profileForm.fname,
            user_last_name: profileForm.lname,
            contact_number: profileForm.contact
        }

        const updateInfo = updateProfile(obj)

        updateInfo.then((res)=>{
            if(res.status===200){
                setUserConfig({
                    ...userConfig,
                    userDetails:{
                        ...userConfig.userDetails,
                        user_email:profileForm.email,
                        user_first_name:profileForm.fname,
                        user_last_name:profileForm.lname,
                        user_contact_details:{
                            ...userConfig.userDetails.user_contact_details,
                            contact_numbers:[profileForm.contact]
                        }
                    }
                })
                console.log(res)
                toast.show('Profile Updated!' , {type: "success"})
                setTimeout(()=>navigation.goBack(),2000)
                
            }
        }).catch((e)=>{
            console.log(e)
            toast.show(e , {type: "error"})
        })

        
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
        >
            <View>
                <CustomHeader title="Edit Profile Informations"/>
            </View>
            
            <View style={editFormStyles.editFormContainer}>
                {/* <View style={editFormStyles.fieldContainer}>
                    <Input label="Username" value={data.username}/>
                </View> */}

                <View style={editFormStyles.headerLabel}>
                    <Text style={editFormStyles.headerLabelText}>Kindly fill out the fields you want to edit.</Text>
                </View>
                
                <View style={editFormStyles.fieldContainer}>
                    <Input onChangeText={(text)=>handleProfileFieldChange('fname',text)} label="First Name" value={profileForm.fname}/>
                </View>
                <View style={editFormStyles.fieldContainer}>
                    <Input onChangeText={(text)=>handleProfileFieldChange('lname',text)} label="Last Name" value={profileForm.lname}/>
                </View>
                {/* <View style={editFormStyles.fieldContainer}>
                    <Input onChangeText={(text)=>handleProfileFieldChange('email',text)} label="Email" value="Lorem Ipsum" value={profileForm.email}/>
                </View> */}
                <View style={editFormStyles.fieldContainer}>
                    <Input onChangeText={(text)=>handleProfileFieldChange('contact',text)} label="Mobile Number" value={profileForm.contact}/>
                </View>

                <View style={editFormStyles.fieldContainer}>
                    <PrimaryButton onPress={()=>handleSubmit()} title="Save changes" color={theme.primaryBlue}/>
                </View>
                <View style={editFormStyles.fieldContainer}>
                    <OffCancelButton title="Cancel" onPress={()=>navigation.goBack()}/>
                </View>
            </View>
        </ScrollView>
    )
}

export default EditForm
