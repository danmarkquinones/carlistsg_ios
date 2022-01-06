import React , {useState , useEffect} from 'react'

export const FilterConfigContext = React.createContext();

export const FilterConfigContextProvider = (props) => {

    const [filters,setFilters] = useState({
        keyword:'',
        min_price:'',
        max_price:'',
        max_mileage:'',
        min_mileage:'',
        min_cc:'',
        max_cc:'',
        model_from_year:'',
        model_to_year:'',
        reg_from_year:'',
        reg_to_year:'',
        location:{id:"",city:"",region:"",country:"SG"},
        color:'',
        brand:'',
        condition:'',
        transmission:'',
        fuel_type:'',
        vehicle_type:'',
        driven_wheel:'',
        sort:'desc-price'
    })

    return (
        <FilterConfigContext.Provider value={[filters , setFilters]}>
            {props.children}
        </FilterConfigContext.Provider>
    )
}
