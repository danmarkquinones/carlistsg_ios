import React, {useState , useEffect , useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {theme} from '../../contants/colors';

import CustomHeader from '../../custom_components/customHeader';
import PrimaryInput from '../../custom_components/customInput';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {CustomPicker , CustomPickerAsync, CustomPickerLocation} from '../../custom_components/customPicker';
import {PrimaryButton} from '../../custom_components/customButtons';
import Spacer from '../../custom_components/spacer';
import { addPinnedFilter } from '../../store/helpers/globalFunctions';
import { useToast } from "react-native-toast-notifications";
import { fetchBrands, fetchLocations } from '../../store/api_calls/cars_api';
import { FilterConfigContext } from '../../store/context_api/filterContext';
// import LocalizedStrings from 'react-native-localization';
import { UserConfigContext } from '../../store/context_api/userContext';

// var localFile = require('../../languages/filterLocale.json')
// let localizedStrings = new LocalizedStrings(localFile)

const FilterIndex = ({navigation}) => {

  const [filters,setFilters] = useContext(FilterConfigContext)
  const [userConfig] = useContext(UserConfigContext)
  // localizedStrings.setLanguage(userConfig.language)

  const toast = useToast();

  const [carBrands , setCarBrands] = useState([]);
  const [locations , setLocations] = useState([]);

  const carConditions = ['Brand new', 'Used', 'Repossesed'];

  const vehicleTypes = [
    'Hybrid',
    'Electric',
    'Hatchback',
    'Luxury Sedan',
    'MPV',
    'Mid-sized Sedan',
    'Sports Car',
    'Stationwagon',
    'SUV',
    'Commercial Vehicle',
    'Passenger Cars',
    'Any'
  ];
  const carColors = ['Black', 'White', 'Blue', 'Red'];
  const fuelTypes = ['Diesel', 'Petrol'];
  const drivenWheel = ['FWD(Front Wheel Drive)' , 'RWD(Rear Wheel Drive)']
  const transmissions = ['Manual' , 'Automatic'];

  useEffect(() => {
    const getBrands = fetchBrands()
    const getLocations = fetchLocations()

    getBrands.then((res)=>{
      if(res.data){
          // console.log(res.data.data)
          const displayBrands = res.data.data
          setCarBrands(displayBrands)
      }
    }).catch((e)=>{
        console.log('call failed' , e)
    })

    getLocations.then((res)=>{
      if(res.data){
          // console.log(res.data)
          const displayLocations = res.data.data
          setLocations(displayLocations)
      }
    }).catch((e)=>{
        console.log('call failed location' , e)
    })
  }, [])

  const handleFilterChange = (name,value) => {
    setFilters({...filters,[name]:value})
    console.log(filters)
  }

  const handleLocationsChange = (value) => {
    locations.forEach((el)=>{
      if(el._id===value){
        setFilters({
          ...filters,
          location:{
            id:el._id,
            city:el.city,
            region:el.region_name,
            country:"SG",
          }
        })
      }
    })
  }

  const onSaveFilter = () => {
    addPinnedFilter(filters)
    toast.show('Filter Saved!' , {type: "success"})
  }

  const onApplyFilter = () => {
    navigation.navigate('SearchResult')
  }

  return (
    <View style={{backgroundColor: theme.lightBlue, flex: 1}}>
      <CustomHeader 
        // title={localizedStrings.StackNavHeader.Search} 
        title="Search"
      />
      <ScrollView style={{padding: 24, flex: 1}}>
        <View>
          <PrimaryInput
            // placeholder={localizedStrings.Placeholders.Keyword}
            placeholder="Keyword"
            onChange={(value)=>handleFilterChange('keyword',value)}
            value={filters.keyword}
            editable
            Icon={() => <AntIcon name="search1" size={25} style={{marginRight:10}}/>}
          />
        </View>
        <Spacer bottom={16} />
        <View>
          <CustomPickerAsync
            // placeholder={localizedStrings.Placeholders.Brand}
            placeholder="Brand"
            items={carBrands}
            value={filters.brand}
            onChange={(value)=>handleFilterChange('brand',value)}
          />
        </View>
        <Spacer bottom={16} />
        <View>
          <CustomPicker
            // placeholder={localizedStrings.Placeholders.Condition}
            placeholder="Condition"
            items={carConditions}
            value={filters.condition}
            onChange={(value)=>handleFilterChange('condition',value)}
          />
        </View>
        <Spacer bottom={16} />

        <View>
          <CustomPickerLocation
            // placeholder={localizedStrings.Placeholders.Location}
            placeholder="Location"
            items={locations}
            value={filters.location.id}
            onChange={(value)=>handleLocationsChange(value)}
          />
        </View>
        <Spacer bottom={35} />

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
            {/* {localizedStrings.Labels.PriceRange} : */}
            Price Range :
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Min price"
                onChange={(value)=>handleFilterChange('min_price',value)}
                value={filters.min_price}
                Unit={()=><Text style={{marginRight:10}}>S$</Text>}
                editable
              />
            </View>
            <Spacer right={16} />
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Max price"
                onChange={(value)=>handleFilterChange('max_price',value)}
                value={filters.max_price}
                Unit={()=><Text style={{marginRight:10}}>S$</Text>}
                editable
              />
            </View>
          </View>
        </View>
        <Spacer bottom={16} />

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
            {/* {localizedStrings.Labels.ModelRange} : */}
            Model Range
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Min : YYYY"
                onChange={(value)=>handleFilterChange('model_from_year',value)}
                value={filters.model_from_year}
                editable
              />
            </View>
            <Spacer right={16} />
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Max : YYYY"
                onChange={(value)=>handleFilterChange('model_to_year',value)}
                value={filters.model_to_year}
                editable
              />
            </View>
          </View>
        </View>
        <Spacer bottom={16} />

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
              {/* {localizedStrings.Labels.RegistrationRange} : */}
              Registration Date Range :
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Min : YYYY"
                onChange={(value)=>handleFilterChange('reg_from_year',value)}
                value={filters.reg_from_year}
                editable
              />
            </View>
            <Spacer right={16} />
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Max : YYYY"
                onChange={(value)=>handleFilterChange('reg_to_year',value)}
                value={filters.reg_to_year}
                editable
              />
            </View>
          </View>
        </View>
        <Spacer bottom={16} />

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
            {/* {localizedStrings.Labels.MileageRange} : */}
            Mileage Range :
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Min"
                onChange={(value)=>handleFilterChange('min_mileage',value)}
                value={filters.min_mileage}
                editable
                Unit={()=><Text style={{marginRight:10}}>mpg</Text>}
              />
            </View>
            <Spacer right={16} />
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Max"
                onChange={(value)=>handleFilterChange('max_mileage',value)}
                value={filters.max_mileage}
                editable
                Unit={()=><Text style={{marginRight:10}}>mpg</Text>}
              />
            </View>
          </View>
        </View>
        <Spacer bottom={16} />

        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
            {/* {localizedStrings.Labels.ECRange} : */}
            Engine Cap Range
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Min"
                onChange={(value)=>handleFilterChange('min_cc',value)}
                value={filters.min_cc}
                editable
                Unit={()=><Text style={{marginRight:10}}>cc</Text>}
              />
            </View>
            <Spacer right={16} />
            <View style={{flex: 1}}>
              <PrimaryInput
                placeholder="Max"
                onChange={(value)=>handleFilterChange('max_cc',value)}
                value={filters.max_cc}
                editable
                Unit={()=><Text style={{marginRight:10}}>cc</Text>}
              />
            </View>
          </View>
        </View>
        <Spacer bottom={16} />

        <Text style={{fontWeight: 'bold', marginVertical: 20}}>
          {/* {localizedStrings.Labels.OtherFilters} :  */}
          Other Filters :
        </Text>

        <View>
          <CustomPicker
            // placeholder={localizedStrings.Placeholders.Transmission}
            placeholder="Transmission"
            items={transmissions}
            value={filters.transmission}
            onChange={(value)=>handleFilterChange('transmission',value)}
          />
        </View>
        <Spacer bottom={16} />

        <View>
          <CustomPicker
            // placeholder={localizedStrings.Placeholders.BodyType}
            placeholder="Body Type"
            items={vehicleTypes}
            value={filters.vehicle_type}
            onChange={(value)=>handleFilterChange('vehicle_type',value)}
          />
        </View>
        <Spacer bottom={16} />

        <View>
          <CustomPicker
            // placeholder={localizedStrings.Placeholders.Color}
            placeholder="Color"
            items={carColors}
            value={filters.color}
            onChange={(value)=>handleFilterChange('color',value)}
          />
        </View>
        <Spacer bottom={16} />

        <View>
          <CustomPicker
            // placeholder={localizedStrings.Placeholders.FuelType}
            placeholder="Fuel Type"
            items={fuelTypes}
            value={filters.fuel_type}
            onChange={(value)=>handleFilterChange('fuel_type',value)}
          />
        </View>
        <Spacer bottom={25} />

        {/* <View>
          <CustomPicker
            placeholder="Select driven wheel"
            items={drivenWheel}
            value={filters.driven_wheel}
            onChange={(value)=>handleFilterChange('driven_wheel',value)}
          />
        </View>
        <Spacer bottom={50} /> */}
        <View
          style={{
            // padding: 24,
            paddingBottom:50,
            marginHorizontal: -5,
            // shadowRadius: 1,
            // shadowOffset: {
            //   width: 0,
            //   height: -1,
            // },
            // shadowColor: '#000000',
            // elevation: 4,
          }}>
          <PrimaryButton
            color={'#20A8F4'}
            // title={localizedStrings.Buttons.Save}
            title="Save Filter"
            onPress={onSaveFilter}
          />
          <Spacer bottom={8} />
          <PrimaryButton
            color={'#254A7C'}
            // title={localizedStrings.Buttons.Apply}
            title="Apply Filter"
            onPress={onApplyFilter}
          />
        </View>
      </ScrollView>
      
    </View>
  );
};

export default FilterIndex;
