import React , {useState , useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { getAsyncStorageData } from '../api_calls/user_api';

export const UserConfigContext = React.createContext();

export const UserConfigContextProvider = (props) => {
  const [userConfig, setUserConfig] = useState({
    isLaunched: 0,
    isLoggedIn: 0,
    isSellMode: 0,
    isNotificationOn: 0,
    language: 'en',
    userDetails: {},
  });

  const getUserInfo = async () => {
    try {
      let value = await AsyncStorage.getItem('userDetails');
      if (value !== null) {
        // We have data!!
        value = JSON.parse(value);
        console.log(value);
        if (Object.keys(value).length > 0) {
          setUserConfig({
            ...userConfig,
            isLoggedIn: 1,
            userDetails: value,
          });
        } else {
          setUserConfig({...userConfig, isLoggedIn: 0, userDetails: {}});
        }
      } else {
        setUserConfig({...userConfig, isLoggedIn: 0, userDetails: {}});
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  useEffect(() => {
    getUserInfo();
    getAsyncStorageData('language', 'en');

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <UserConfigContext.Provider value={[userConfig, setUserConfig]}>
      {props.children}
    </UserConfigContext.Provider>
  );
}
