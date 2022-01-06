import React, {useState} from 'react';

export const CarConfigContext = React.createContext();

export const CarConfigContextProvider = props => {
  const initialValue = {
    product_name: '',
    contact_no: '',
    display_contact: '',
    email: '',
    inquiry_via_email: '',
    location: '',
    street: '',
    price: '',
    date: '',
    title: '',
    description: '',
    plate_number: '',
    owner_id_type: '',
    owner_id: '',
    registration_date: '',
    engine_capacity: '',
    omv: '',
    arf: '',
    coe: '',
    coe_expiry_date: '',
    number_of_owners: '',
    type_of_vehicle: '',
    car_brand: '',
    car_model: '',
    car_condition: '',
    product_brand_id: '1',
    asking_price: '',
    transmission: '',
    fuel_type: '',
    mileage: '',
    features: '',
    accessories: '',
    description: '',
    offPeak: '',
    images: [],
    details_type: true,
    product_image_id: [],
    isLoading: false,
  };
  const [carDetails, setCarDetails] = useState(initialValue);

  const onReset = () => {
    setCarDetails(initialValue);
  };
  return (
    <CarConfigContext.Provider value={[carDetails, setCarDetails, onReset]}>
      {props.children}
    </CarConfigContext.Provider>
  );
};
