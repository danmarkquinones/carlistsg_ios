import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLanguage = async () =>{
    try{
        let language = await AsyncStorage.getItem('language')
        if(language&&language.length>0){
            return language
        }else{
            return 'en'
        }
    }
    catch(e){
        return 'en'
    }
}

export const updateLanguage = (language) => {
    try{
        AsyncStorage.setItem('language' , language)
    }catch(e){
        console.log(e)
    }
}