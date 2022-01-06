import React from 'react'
import { Text, View ,Image , Button, TouchableOpacity} from "react-native"
import { customCardStyles } from '../styles/customCardStyles'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { theme } from '../contants/colors';
import Spacer from './spacer';
import PropTypes from 'prop-types';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import EntIcon from 'react-native-vector-icons/Entypo';
import { PrimaryButton, SmallButton } from './customButtons';
import { onCallUser } from '../store/helpers/globalFunctions';
import CustomAvatar from './customAvatar';
import moment from 'moment'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const SquareCard = props => {
  const {car, Icon, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={customCardStyles.squareCardContainer}>
        {Icon && (
          <View style={customCardStyles.iconSquareContainer}>
            <Icon />
          </View>
        )}
        <View style={customCardStyles.imageSquareContainer}>
          {car.product_image_urls.length ? (
            <Image
              style={customCardStyles.carSquareImage}
              source={{uri: car.product_image_urls[0].metadata.thumb_url}}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={customCardStyles.textBodyContainer}>
          <Text numberOfLines={2} style={customCardStyles.carName}>
            {car.product_name}
          </Text>
          <Text style={customCardStyles.carPrice}>S$ {car.product_price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WhiteCard = ({options, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          customCardStyles.whiteCard,
          {height: options.height, width: options.width},
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.secondaryBlue,
            fontSize: 20,
          }}>
          See More
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ListCard = props => {
  const {
    car,
    Icon,
    sellerMode,
    inFavorites,
    onPress,
    deleteProduct,
    onMarkAsSold,
  } = props;

  console.log(car);

  return (
    <View style={customCardStyles.listCardContainer}>
      <View style={customCardStyles.imageListContainer}>
        {car?.product_image_urls?.length ? (
          <Image
            style={customCardStyles.listCarImage}
            source={{uri: car.product_image_urls[0].metadata.thumb_url}}
          />
        ) : (
          <View style={customCardStyles.listCarImage} />
        )}
      </View>
      <View style={customCardStyles.textListBodyContainer}>
        <View style={customCardStyles.listCardHeader}>
          <View>
            <Text style={customCardStyles.listCarName}>{car.product_name}</Text>
            {/* <Text>{car.location}</Text> */}
            <Text>{moment(car.date_verified).fromNow()}</Text>
          </View>
          {Icon && (
            <View style={customCardStyles.iconSquareContainer}>
              {inFavorites ? (
                <TouchableOpacity onPress={onPress}>
                  <Icon />
                </TouchableOpacity>
              ) : (
                <Menu>
                  <MenuTrigger>
                    <Icon />
                  </MenuTrigger>
                  <MenuOptions>
                    {/* <MenuOption onSelect={() => alert(`Edit`)} text="Edit" /> */}
                    <MenuOption
                      onSelect={() => deleteProduct(car._id)}
                      text="Remove"
                    />
                    <MenuOption
                      onSelect={() => onMarkAsSold(car._id)}
                      text="Mark as Sold"
                    />
                  </MenuOptions>
                </Menu>
              )}
            </View>
          )}
        </View>

        <Divider style={customCardStyles.line} />

        <View style={customCardStyles.listTextContainer}>
          <Text style={customCardStyles.listCarPrice}>
            S$ {car.product_price}
          </Text>
          {!sellerMode && (
            <SmallButton
              onPress={() => onCallUser('092347832643')}
              title="Contact"
              options={{
                color: theme.primaryBlue,
                textColor: theme.white,
                height: 30,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export const GridCard = props => {
  const {car, Icon, inFavorites, onPress, deleteProduct, onMarkAsSold} = props;
  return (
    <View style={customCardStyles.gridCardContainer}>
      {Icon && (
        <View style={customCardStyles.iconSquareContainer}>
          {inFavorites ? (
            <TouchableOpacity onPress={onPress}>
              <Icon />
            </TouchableOpacity>
          ) : (
            <Menu>
              <MenuTrigger>
                <Icon />
              </MenuTrigger>
              <MenuOptions>
                {/* <MenuOption onSelect={() => alert(`Edit`)} text="Edit" /> */}
                <MenuOption
                  onSelect={() => deleteProduct(car._id)}
                  text="Remove"
                />
                <MenuOption
                  onSelect={() => onMarkAsSold(car._id)}
                  text="Mark as Sold"
                />
              </MenuOptions>
            </Menu>
          )}
        </View>
      )}
      <View style={customCardStyles.imageSquareContainer}>
        <Image style={customCardStyles.gridCarImage} source={car.url} />
      </View>
      <View style={customCardStyles.textBodyContainer}>
        <Text numberOfLines={1} style={customCardStyles.listCarName}>
          {car.product_name}
        </Text>
        {/* <Text>{car.date_verified.$date.$numberLong}</Text> */}
        <Text style={customCardStyles.listCarPrice}>
          S$ {car.product_price}
        </Text>
        {/* <Text>{car.location}</Text> */}

        <Divider style={customCardStyles.line} />

        <SmallButton
          title="Contact Dealer"
          onPress={() => onCallUser('09354734378')}
          options={{
            color: theme.primaryBlue,
            textColor: theme.white,
            height: 30,
          }}
        />

        {/* <View style={customCardStyles.gridTextContainer}>
          <Text style={customCardStyles.listCarPrice}>{car.product_price}</Text>
          <SmallButton title="Contact" options={{color:theme.primaryBlue , textColor:theme.white , height:30}}/>
        </View> */}
      </View>
    </View>
  );
};

export const DealerCard = props => {
  const {dealer, onPress} = props;

  // console.log('dealer',dealer.number_of_product_sold)

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={customCardStyles.squareCardContainer}>
        <View style={customCardStyles.dealerContainer}>
          
          {dealer.advertisement_contact_details.users_profile_url?
            <View style={customCardStyles.dealerImageContainer}>
              <Image style={customCardStyles.dealerImage} source={dealer.url} />
            </View>
            :
            <View style={{marginVertical:10}}>
              <CustomAvatar
                initial={dealer.advertisement_contact_details.user_first_name}
                size={60}
                color={theme.gray}
              />
            </View>
            
          }
          
          <Text style={customCardStyles.dealerName}>
            {dealer.advertisement_contact_details.user_first_name} {dealer.advertisement_contact_details.user_last_name}
          </Text>
          <View 
            style={{
              backgroundColor:dealer.advertisement_contact_details.is_advertiser?theme.green:theme.tertiaryBlue,
              borderRadius:50,
              paddingHorizontal:10,
              paddingVertical:2,
              marginVertical:5
            }}
          >
            <Text style={{color:theme.white}}>{dealer.advertisement_contact_details.is_advertiser?"Advertiser":"Dealer"}</Text>
          </View>
          <Text style={customCardStyles.dealerDeals}>{dealer.advertisement_contact_details.number_of_product_sold} deals</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PinnedFilterCard = props => {
  const {filter , onPress , onUnpin , index} = props

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={customCardStyles.filterContainer}>

        <TouchableOpacity onPress={onUnpin}>
          <EntIcon name="pin" size={25} color={theme.green}/>
        </TouchableOpacity>

        <View style={customCardStyles.filterNameContainer}>
          <Text style={customCardStyles.filterBrand}>{filter.keyword?filter.keyword:`Filter #${index+1}`}</Text>
          {/* <Text style={customCardStyles.filterLocation}>{filter.location}</Text> */}
        </View>

        <View style={customCardStyles.filterPriceContainer}>
          <Text style={customCardStyles.filterMinPrice}>min : $ {filter.min_price}</Text>
          <Text style={customCardStyles.filterMaxPrice}>max : $ {filter.max_price}</Text>
        </View>

        <MatIcon name="keyboard-arrow-right" size={25} color={theme.black}/>
      </View>
      <Divider/>
    </TouchableOpacity>
  );
}

ListCard.prototypes = {
  sellerMode: PropTypes.bool,
};

ListCard.defaultProps = {
  sellerMode: false,
};