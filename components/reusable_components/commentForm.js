import React , {useState , useContext , useEffect} from 'react'
import { StyleSheet, View , Text, Dimensions, Switch } from 'react-native'
import { Divider} from 'react-native-elements'
import { theme } from '../contants/colors'
import { OffCancelButton, PrimaryButton } from '../custom_components/customButtons'
import PrimaryInput from '../custom_components/customInput'
import { Rating } from 'react-native-ratings';
import { UserConfigContext } from '../store/context_api/userContext'
import { addProductReview } from '../store/api_calls/cars_api'
import { addAdvertiserReview } from '../store/api_calls/seller_api'
// import LocalizedStrings from 'react-native-localization';

// var localFile = require('../languages/productLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const windowWidth = Dimensions.get('window').width;

const CommentForm = (props) => {

    const {type , item , onCancel , commentArray , setCommentArray} = props 
    const [userConfig , setUserConfig] = useContext(UserConfigContext)
    const [rating , setRating] = useState(3)
    // localizedStrings.setLanguage(userConfig.language)
    const [form , setForm] = useState({
        comment:'',
        itemId:type==="product"?item._id:item.advertisement_contact_details._id,
        anonymous:true,
        fname:'',
        lname:'',
        userId:'',
    })

    // console.log(form)

    useEffect(()=>{
        if(!form.anonymous){
            setForm({...form , fname:"",lname:""})
        }
    },[form.anonymous])

    useEffect(()=>{
        if(userConfig.isLoggedIn){
            setForm({
                ...form, 
                userId:userConfig.userDetails.user_id , 
                fname:userConfig.userDetails.user_first_name,
                lname:userConfig.userDetails.user_last_name,
                anonymous:false
            })
        }
    },[userConfig.isLoggedIn])

    const onChange = (name , value) => {
        setForm({...form , [name] : value})
    }

    const onRating = (rating) => {
        setRating(rating)
    }

    const toggleAnonymity = () => {
        setForm({...form , anonymous:!form.anonymous})
        
    }

    const onSubmit = () => {
        if(type==="product"){
            addProductReview(form , rating).then((res)=>{
                if(res.data){
                    setCommentArray([res.data.data, ...commentArray])
                    onCancel()
                    console.log(res.data.data)
                }
            }).catch((e)=>{
                console.log('error adding review' , e)
            })
        }else if(type==="seller"){
            addAdvertiserReview(form , rating).then((res)=>{
                if(res.data){
                    setCommentArray([res.data.data, ...commentArray])
                    onCancel()
                    console.log(res.data.data)
                }
            }).catch((e)=>{
                console.log('error adding review' , e)
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>
                    {/* {localizedStrings.CommentForm.HeaderAdd} */}
                    Add a review
                </Text>
            </View>
            <Divider/>

            {!userConfig.isLoggedIn?
                <View>
                    <View
                        style={styles.anonymityContainer}
                    >
                        <Text style={styles.commentLabel}>
                            {/* {localizedStrings.CommentForm.Hide} :  */}
                            Hide my name? :
                        </Text>
                        <Switch
                            trackColor={{ false: theme.gray, true: theme.secondaryBlue }}
                            thumbColor={form.anonymous? theme.primaryBlue : theme.white}
                            ios_backgroundColor={theme.gray}
                            onValueChange={toggleAnonymity}
                            value={form.anonymous?true:false}
                        />
                    </View>

                    {!form.anonymous?
                        <View>
                            <View style={{marginVertical:5}}>
                                <PrimaryInput 
                                    value={form.fname} 
                                    onChange={(text)=>onChange('fname',text)} 
                                    // placeholder={localizedStrings.CommentForm.Fname} 
                                    placeholder="First Name"
                                    borderColor={theme.gray}
                                />
                            </View>
                            <View style={{marginVertical:5}}>
                                <PrimaryInput 
                                    value={form.lname} 
                                    onChange={(text)=>onChange('lname',text)} 
                                    // placeholder={localizedStrings.CommentForm.Lname} 
                                    placeholder="Last Name"
                                    borderColor={theme.gray}
                                />
                            </View>
                        </View>
                    :null}
                </View>
            :null}
            
            <View style={styles.rateContainer}>
                <Text style={styles.ratelabel}>
                    {/* {localizedStrings.CommentForm.Rate} :  */}
                    Rate :
                </Text>
                <Rating imageSize={20} onFinishRating={onRating}/>
            </View>
            <View>
                <Text style={styles.commentLabel}>
                    {/* {localizedStrings.CommentForm.Comment} :  */}
                    Comment :
                </Text>
                <PrimaryInput value={form.comment} onChange={(text)=>onChange('comment',text)} multiline={true} borderColor={theme.gray} editable={true} height={100} textAlignVertical="top"/>
            </View>
            <View style={styles.btnContainer}>
                <PrimaryButton 
                    // title={localizedStrings.CommentForm.Submit} 
                    title="Submit"
                    onPress={onSubmit} 
                    color={theme.primaryBlue} 
                />
                <OffCancelButton 
                    // title={localizedStrings.CommentForm.Cancel} 
                    title="Cancel"
                    onPress={onCancel}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        padding:10,
        width:windowWidth*0.9
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:theme.primaryBlue,
        marginBottom:10
    },
    rateContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    ratelabel:{
        fontSize:20,
    },
    commentLabel:{
        fontSize:20,
        marginBottom:10,
    },
    btnContainer:{
        marginTop:10
    },
    anonymityContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default CommentForm
