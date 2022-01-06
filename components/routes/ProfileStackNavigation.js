import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileIndex from '../screens/profile_page/ProfileIndex';
import TermsService from '../screens/profile_page/tos/TermsService';
import Help from '../screens/profile_page/help_center/Help';
import { theme } from '../contants/colors';
import EditForm from '../screens/profile_page/form/EditForm';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

// Edit HEADERS of Stack Navigators under Landing Page

const Stack = createNativeStackNavigator();

export const ProfileStackNavigation = ({navigation , route}) => {

    const tabHiddenRoutes = ["Help","TOS","EditProfile"];

    if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
       navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }

    return(
        <Stack.Navigator 
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Profile" component={ProfileIndex} />
            <Stack.Screen name="EditProfile" component={EditForm} />
            <Stack.Screen name="TOS" component={TermsService} />
            <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
    )
}