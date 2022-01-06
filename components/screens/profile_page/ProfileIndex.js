import React , {useState , useEffect , useContext} from 'react'
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native'
import { Divider, Overlay } from 'react-native-elements'
import { profileStyles } from '../../styles/profileStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../contants/colors';
import { globalStyles } from '../../styles/globalStyles';
import { PrimaryButton } from '../../custom_components/customButtons';
import { Switch } from 'react-native-elements/dist/switch/switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from "react-native-switch-selector";
import NotificationModal from '../../reusable_components/notificationModal';
import CustomAvatar from '../../custom_components/customAvatar';
import { UserConfigContext } from '../../store/context_api/userContext';
import { useIsFocused } from '@react-navigation/core';
import { logout } from '../../store/api_calls/authentication';
// import PushNotification from "react-native-push-notification";
// import LocalizedStrings from 'react-native-localization';
// import messaging from '@react-native-firebase/messaging'
import { updateNotification } from '../../store/api_calls/user_api';

// var localFile = require('../../languages/profileLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const ProfileIndex = (props) => {

    const {navigation} = props
    const [userConfig , setUserConfig] = useContext(UserConfigContext)
    const isFocused = useIsFocused()
    // localizedStrings.setLanguage(userConfig.language)


    //overlays
    const [NotifOverlayVisible, setNotifOverlayVisible] = useState(false);
    const [languageOverlayVisible,setLanguageOverlayVisible] = useState(false);

    const [information , setInformation] = useState([])
    const [deviceToken , setDeviceToken] = useState("")

    useEffect(()=>{
        if(isFocused || userConfig.language){
            // console.log(userConfig.userDetails)

            // messaging().getToken().then(token => {
            //     console.log('token' , token)
            //     setDeviceToken(token)
            // });

            if(userConfig.isLoggedIn){
                const infoArray = [
                    // {type:'Email' , text:userConfig.userDetails.user_email},
                    {type:"Full Name" , text:`${userConfig.userDetails.user_first_name} ${userConfig.userDetails.user_last_name}`},
                    {type:"Mobile Number" , text:userConfig.userDetails.user_contact_details.contact_numbers[0]}
                ]
                setInformation(infoArray)
            }

            // onCreateChannel()
        }
    },[isFocused , userConfig.language])

    const options = [
        { label: "Buy", value: "0" },
        { label: "Sell", value: "1" },
    ];

    const onClick = () => {
        logout()
        setUserConfig({
            ...userConfig,
            isLoggedIn:0,
            userDetails:{}
        })
        navigation.navigate('TabNav') 
    };

    const toggleNotifOverlay = () => {
        setNotifOverlayVisible(!NotifOverlayVisible);
    };
    const toggleLanguageOverlay = () => {
        setLanguageOverlayVisible(!languageOverlayVisible)
    };

    const onUpdateNotif = (value) => {
        const data = {
            notif_switch: value,
            device_token: deviceToken
        }
        updateNotification(data).then((res)=>{
            console.log(res.data)
        }).catch((e)=>{
            console.log('error updateing notifs' , e)
        })
    }

    const toggleSwitchNotif = () => {
        if(userConfig.isNotificationOn===1){
            setUserConfig({...userConfig, isNotificationOn:0}) 
            AsyncStorage.setItem('isNotify' , '0')
            onUpdateNotif(false)
        }else{
            toggleNotifOverlay()
        }
    };

    const handleSellModeChange = (value) => {
      navigation.navigate('LandingIndex');
      AsyncStorage.setItem('isSellMode', value.toString());
      setUserConfig({...userConfig, isSellMode: +value});
    }


    const onConfirmNotif = () => {
        setUserConfig({...userConfig, isNotificationOn:1}) 
        AsyncStorage.setItem('isNotify' , '1')
        onUpdateNotif(true)
        toggleNotifOverlay()
    }

    const onCancelNotif = () => {
        toggleNotifOverlay()
    }

    const handleLanguageChange = (language) => {
        setUserConfig({...userConfig , language})
        toggleLanguageOverlay()
    }

    const onShare = async () => {
        try{
            const result = await Share.share({
                title :'Carlist.SG',
                message : 'Find your dream car with Carlist.SG. Download the App Now : https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
            });

            if(result.action === Share.sharedAction){
                if(result.activityType){
                    // shared with activity type of result.activityType
                    console.log('shared result' , result.activityType)
                }else{
                    console.log('else shared')
                }
            }else if (result.action === Share.dismissedAction) {
                console.log('dismissed')
            }
        }catch(err){
            alert(err.message)
        }
    }


    // const onCreateChannel = () => {
    //     PushNotification.createChannel({
    //         channelId:'test-channel',
    //         channelName:'Test Channel'
    //     })
    // }
    // const handleNotif = () => {
    //     PushNotification.localNotification({
    //         channelId:"test-channel",
    //         title:"You clicke me",
    //         message:"HEY YOYW!!!!"
    //     })
    // }

    return (
      <>
        {!userConfig.isLoggedIn ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 30,
              backgroundColor: theme.lightBlue,
            }}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {/* {localizedStrings.NoAccess.Message} */}
              You don't have access to this feature, please login to continue.
            </Text>
            <View style={{width: 200, marginTop: 50}}>
              <PrimaryButton
                onPress={() => navigation.navigate('Login')}
                title="Go to Login"
                color={theme.primaryBlue}
              />
              {/* <PrimaryButton title="push notif" onPress={handleNotif} color={theme.primaryBlue}/> */}
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={globalStyles.container}>
              <View style={profileStyles.headerContainer}>
                <CustomAvatar
                  initial={userConfig.userDetails.user_email}
                  size={40}
                  color={theme.gray}
                />
                <Text style={profileStyles.headerName}>
                  {userConfig.userDetails.user_email}
                </Text>
              </View>

              <View style={profileStyles.infoContainer}>
                <View style={profileStyles.infoHead}>
                  <Text style={profileStyles.infoHeadTitle}>
                    Profile Informations
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: userConfig.userDetails,
                        callback: setInformation,
                      })
                    }>
                    <View style={profileStyles.editContainer}>
                      <Icon name="edit" size={15} />
                      <Text style={{fontSize: 15, marginLeft: 5}}>
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {information.map((info, i) => (
                  <View key={i} style={profileStyles.infoDetailsContainer}>
                    <Text style={profileStyles.infoDetailsType}>
                      {info.type}
                    </Text>
                    <Text style={profileStyles.infoDetailsText}>
                      {info.text}
                    </Text>

                    <Divider style={profileStyles.line} />
                  </View>
                ))}
              </View>

              <View style={profileStyles.othersContainer}>
                <View style={profileStyles.otherDetailsContainer}>
                  <Text style={profileStyles.othersDetailsText}>
                    {/* {localizedStrings.ProfileIndex.SwitchToSelling} */}
                    Switch to selling
                  </Text>
                  <SwitchSelector
                    style={{width: 120}}
                    options={options}
                    initial={+userConfig.isSellMode}
                    value={+userConfig.isSellMode}
                    onPress={value => handleSellModeChange(value)}
                    textColor={theme.primaryBlue}
                    selectedColor={theme.white}
                    buttonColor={theme.primaryBlue}
                    borderColor={theme.primaryBlue}
                    hasPadding
                    valuePadding={3}
                    height={35}
                  />
                </View>

                <Divider style={profileStyles.line} />

                <View style={profileStyles.otherDetailsContainer}>
                  <Text style={profileStyles.othersDetailsText}>
                    Notification
                  </Text>
                  <Switch
                    trackColor={{false: theme.gray, true: theme.secondaryBlue}}
                    thumbColor={
                      +userConfig.isNotificationOn === 1
                        ? theme.primaryBlue
                        : theme.white
                    }
                    ios_backgroundColor={theme.gray}
                    onValueChange={toggleSwitchNotif}
                    value={+userConfig.isNotificationOn === 1 ? true : false}
                  />
                </View>

                <Divider style={profileStyles.line} />

                <TouchableOpacity onPress={toggleLanguageOverlay}>
                  <View style={profileStyles.otherDetailsContainer}>
                    <Text style={profileStyles.othersDetailsText}>
                      Language
                    </Text>
                    <Text>
                      {userConfig.language === 'en' ? 'English' : 'Chinese'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <Divider style={profileStyles.line} />

                <TouchableOpacity onPress={() => navigation.navigate('TOS')}>
                  <View style={profileStyles.otherDetailsContainer}>
                    <Text style={profileStyles.othersDetailsText}>
                      Privacy Policy & Terms of use
                    </Text>
                    <Icon
                      name="keyboard-arrow-right"
                      size={25}
                      color={theme.gray}
                    />
                  </View>
                </TouchableOpacity>

                <Divider style={profileStyles.line} />

                <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                  <View style={profileStyles.otherDetailsContainer}>
                    <Text style={profileStyles.othersDetailsText}>
                      Help & Feedback
                    </Text>
                    <Icon
                      name="keyboard-arrow-right"
                      size={25}
                      color={theme.gray}
                    />
                  </View>
                </TouchableOpacity>

                <Divider style={profileStyles.line} />

                <TouchableOpacity onPress={onShare}>
                  <View style={profileStyles.otherDetailsContainer}>
                    <Text style={profileStyles.othersDetailsText}>
                      Share this App
                    </Text>
                  </View>
                </TouchableOpacity>

                <Divider style={profileStyles.line} />
              </View>

              <View style={profileStyles.logoutBtn}>
                <PrimaryButton
                  title="Log out"
                  onPress={onClick}
                  color={theme.primaryBlue}
                />
                <Text style={profileStyles.versionText}>
                  version 1.1.0
                </Text>
              </View>
            </View>

            <Overlay
              isVisible={NotifOverlayVisible}
              onBackdropPress={toggleNotifOverlay}>
              <NotificationModal
                onConfirm={onConfirmNotif}
                onCancel={onCancelNotif}
                // localizedStrings={localizedStrings}
              />
            </Overlay>

            <Overlay
              isVisible={languageOverlayVisible}
              onBackdropPress={toggleLanguageOverlay}>
              <View style={profileStyles.languageOverlay}>
                <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                  <Text>English</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLanguageChange('zh')}>
                  <Text>Chinese</Text>
                </TouchableOpacity>
              </View>
            </Overlay>
          </ScrollView>
        )}
      </>
    );
}

export default ProfileIndex
