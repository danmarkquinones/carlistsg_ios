import React, {useState , useContext , useEffect} from 'react';
import {View , Image, Dimensions, TouchableOpacity} from 'react-native';
import { Overlay } from 'react-native-elements';
import {UserConfigContext} from '../../store/context_api/userContext';
import {landingStyles} from '../../styles/landingStyles';
import BuyerLanding from './buyer_landing/buyerLanding';
import PostAds from './seller_landing/PostAds';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../contants/colors';
import { cars, dealers } from '../../contants/dummyCarData';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LandingIndex = props => {
  const {navigation} = props;
  const [userConfig] = useContext(UserConfigContext);
  const [showAdModal , setShowAdModal] = useState(false);

  useEffect(()=>{
    toggleOverlay() 
  },[])

  const toggleOverlay = () => {
    setShowAdModal(!showAdModal)
  }

  return (
    <View style={landingStyles.container}>
      {/* if !isSellMode */}
      {userConfig.isSellMode === 0 ? (
        <View>
          <Overlay isVisible={showAdModal} onBackdropPress={toggleOverlay}>
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                onPress={() => toggleOverlay()}
                style={{position: 'absolute', right: -20, top: -20, zIndex: 2}}>
                <AntIcon
                  name="closecircle"
                  size={30}
                  color={theme.secondaryBlue}
                />
              </TouchableOpacity>
              <Image
                style={{height: 350, width: width * 0.8}}
                source={require('../../../assets/images/main_ad.jpg')}
              />
            </View>
          </Overlay>
          <BuyerLanding
            items={cars}
            navigation={navigation}
            dealers={dealers}
          />
        </View>
      ) : (
        <PostAds />
      )}

      {/* if isSellMode at AsyncStorage */}
    </View>
  );
};

export default LandingIndex;
