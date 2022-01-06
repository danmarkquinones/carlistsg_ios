import {Linking, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const onCallUser = (number) => {
    let phoneNumber = number.toString();

    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phoneNumber}`;
    }else {
        phoneNumber = `tel:${phoneNumber}`;
    }

    Linking.canOpenURL(phoneNumber)
    .then(supported => {
        if (!supported) {
        Alert.alert('Phone number is not available');
        } else {
        return Linking.openURL(phoneNumber);
        }
    })
    .catch(err => console.log(err));
}

export const isInFavorites = async (id) => {
    try {
        const data = await AsyncStorage.getItem('savedCars')
        const parsedData = JSON.parse(data)
        const value = parsedData.some(el=>el._id === id)
        return value
    } catch(e) {
        console.log(e)
    }
}

export const addToSavedCars = async (item) => {
    try {
        const data = await AsyncStorage.getItem('savedCars')
        let sCars = JSON.parse(data)
        sCars.push(item)
        AsyncStorage.setItem('savedCars' , JSON.stringify(sCars))
    } catch(e) {
        console.log(e)
    }
}

export const removeToSavedCars = async (item) => {
    try {
        const data = await AsyncStorage.getItem('savedCars')
        let sCars = JSON.parse(data)
        let filteredData = sCars.filter(car=>car._id!==item._id)
        AsyncStorage.setItem('savedCars' , JSON.stringify(filteredData))
    } catch(e) {
        console.log(e)
    }
}

export const addPinnedFilter = async (filter) => {
    // AsyncStorage.setItem('pinnedFilters' , '[]')
    try {
        const data = await AsyncStorage.getItem('pinnedFilters')
        let filters = JSON.parse(data)
        filter.id = `filter_0${filters.length+1}_${filter.keyword}`

        filters.push(filter)

        console.log(filters,filters.length)
        AsyncStorage.setItem('pinnedFilters' , JSON.stringify(filters))
    } catch(e) {
        console.log(e)
    }
}

export const removePinnedFilter = async (filter) => {
    try {
        const data = await AsyncStorage.getItem('pinnedFilters')
        let filters = JSON.parse(data)
        let filteredData = filters.filter(item=>item.id!==filter.id)
        AsyncStorage.setItem('pinnedFilters' , JSON.stringify(filteredData))
    } catch(e) {
        console.log(e)
    }
}