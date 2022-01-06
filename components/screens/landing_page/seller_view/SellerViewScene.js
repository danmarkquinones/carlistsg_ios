import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Rating, Overlay, Divider} from 'react-native-elements';
import {theme} from '../../../contants/colors';
import CustomAvatar from '../../../custom_components/customAvatar';
import {GridCard, ListCard} from '../../../custom_components/customCards';
import PrimaryInput from '../../../custom_components/customInput';
import CommentForm from '../../../reusable_components/commentForm';
import SorterComponent from '../../../reusable_components/sorterComponent';
import {get, getAdvert} from '../../../store/api_calls/authentication';
import {sellersStyles} from '../../../styles/sellersStyles';
import { useIsFocused } from '@react-navigation/native';
import { getAdvertiserReviews } from '../../../store/api_calls/seller_api';
import moment from 'moment';
import Pagination from '../../../reusable_components/pagination';

export const Listings = props => {
  const {config, setConfig, navigation} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const goToProduct = item => {
    navigation.navigate('ProductView', item);
  };

  useEffect(() => {
    fetchAdvertiserProducts();
  }, []);

  const fetchAdvertiserProducts = async () => {
    const params = {
      _id: '61ab43ee561db2167e58ccd2',
      page: 1,
      limit: 10,
    };
    const res = await getAdvert('/advertiser', params);

    if (res?.data?.success) {
      setProducts(res.data.data[0].advertiser_products);
      setIsLoading(false);
    } else {
      setProducts([]);
      setIsLoading(false);
    }

    // console.log(res.data.data[0].advertiser_products);
  };

  return (
    <View style={{flex: 1}}>
      <SorterComponent {...props} />
      <View>
        <FlatList
          data={products}
          key={config.isGridView}
          contentContainerStyle={{
            alignItems: config.isGridView ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            paddingBottom: 100,
          }}
          numColumns={config.isGridView ? 2 : 1}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => goToProduct(item)}>
              {config.isGridView ? (
                <GridCard car={item} />
              ) : (
                <ListCard car={item} />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export const About = props => {
  const {config, setConfig, setScrollY} = props;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 20,
        backgroundColor: theme.white,
        paddingTop: 10,
        paddingBottom: 20,
      }}>
      <Text style={{fontSize: 18, textAlign: 'justify'}}>
        According to statistics, about me pages are among the ten most visited
        by potential customers on your site. The “about us” page is a must-have
        page (this can be a page on your website, separate landing page or even
        “about me” website as a type of portfolio) used by all types of
        businesses to give customers more insight into who is involved with a
        given business and exactly what it does. Your “About me” page forms the
        first impression of a company or product, puts a name and a face to your
        business, and gives website visitor the opportunity to develop a
        connection with you (a good reason for a visitor to stay on your
        website!), and it is your best chance to convert more visits to
        enquiries/more enquiries to customers. About me page is a space for
        individuality and originality, it is an important marketing tool that
        should convince. Therefore, they are very different! Let’s get the best
        of the top About us samples and learn how to write about me page, that
        will pull your customers like a magnet
      </Text>
    </ScrollView>
  );
};

export const Reviews = props => {
  const {data} = props;

  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const isFocused = useIsFocused()
  const [pagination , setPagination] = useState({total:"", page:1 ,numOfPage:""})
  const [loading , setLoading] = useState(false)

  const getAverage = () => {
    const sum = reviews.reduce((a, b) => +a + +b.review_score, 0);
    const ave = parseFloat(sum / reviews.length).toFixed(1);
    return ave;
  };

  const generateRateColor = () => {
    if(getAverage() > 3.5){
        return theme.green
    }else if(getAverage() > 2 || getAverage() < 3.5){
        return theme.yellow
    }else{
        return theme.red
    }
  }

  const onCancel = () => {
    setShowForm(!showForm);
  };

  const onFetchReviews = () => {
    setLoading(true)
    const getReviews = getAdvertiserReviews(data.advertisement_contact_details._id , pagination.page)

    getReviews.then((res)=>{
        if(res.data){
            let sortedData = res.data.data
            // console.log('reviews' , sortedData)
            setPagination({
              ...pagination , 
              total:res.data.total_reviews_count,
              numOfPage:Math.ceil(res.data.total_reviews_count/10)
            })
            setReviews(sortedData)
            setLoading(false)
        }
    }).catch((e)=>{
        console.log('error reviews' , e)
        setLoading(false)
    })
  }

  useEffect(() => {
    if(isFocused || pagination.page){
      onFetchReviews()
    }
  }, [isFocused || pagination.page])

  return (
    <ScrollView
      style={sellersStyles.reviewContainer}
      stickyHeaderIndices={[2]}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={sellersStyles.ratingHeaderContainer}>
        {data ? (
          <View style={sellersStyles.sellerDetailsInProduct}>
            <CustomAvatar initial={data.advertisement_contact_details.user_first_name} color={theme.secondaryBlue} size={40} />
            <Text style={sellersStyles.sellerDetailsInProductName}>
              {`${data.advertisement_contact_details.user_first_name} ${data.advertisement_contact_details.user_last_name}`}
            </Text>
          </View>
        ) : (
          <Text style={sellersStyles.headerText}>Overall Rating :</Text>
        )}

        <View style={sellersStyles.ratingContainer}>
          <Text style={[sellersStyles.headerRate , {color:generateRateColor()}]}>{getAverage()}</Text>
          <Rating
            ratingColor={generateRateColor()}
            type='custom'
            imageSize={15}
            readonly
            startingValue={getAverage()}
            ratingCount={5}
          />
        </View>
      </View>
      <View>
        <Divider />
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <PrimaryInput
            borderColor={theme.gray}
            editable={false}
            placeholder="Add your review"
          />
        </TouchableOpacity>
        <Text style={{marginTop: 10}}>{reviews.length} review(s)</Text>
      </View>
      <View 
        // style={{flex: 1}}
      >
        {loading?<Text>Loading...</Text>
          :<FlatList
            contentContainerStyle={{paddingBottom: 40}}
            data={reviews}
            keyExtractor={item => item._id}
            renderItem={({item, i}) => (
              <View style={sellersStyles.commentContainer}>
                <View style={{flex: 0.95}}>
                  <View style={sellersStyles.commenterHeaderContainer}>
                      <Text style={sellersStyles.commenter}>
                          {item.is_anonymous?
                              // `#User.${i}`
                              'Anonymous User'
                              :`${item.first_name} ${item.last_name}`
                          }
                      </Text>
                      <Text style={sellersStyles.timeCommented}> - {moment(item.date_created).fromNow()}</Text>
                  </View>
                  <Text style={sellersStyles.commentText}>{item.comment.review_text}</Text>
                </View>
                <Text style={sellersStyles.commentRate}>{item.review_score}/5</Text>
              </View>
            )}
            ListFooterComponent={()=>(
              <Text>Hello</Text>
            )}
          />
        }  

{/* <Text>Hello</Text> */}
          {/* <Pagination pagination={pagination} setPagination={setPagination}/> */}

      </View>
                     
      <Overlay isVisible={showForm} onBackdropPress={onCancel}>
        <CommentForm
          type="seller"
          item={data}
          commentArray={reviews}
          setCommentArray={setReviews}
          onCancel={onCancel}
        />
      </Overlay>
    </ScrollView>
  );
};
