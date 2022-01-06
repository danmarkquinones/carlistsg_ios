import { StyleSheet } from 'react-native';
import { theme } from '../contants/colors';

export const landingStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.primaryBlue,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNameView: {
    marginLeft: 10,
  },
  greetName: {
    color: theme.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listedCar: {
    color: theme.white,
  },
  searchContainer: {
    backgroundColor: theme.primaryBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  adsImage: {
    height: 50,
    width: '100%',
  },
  adContainer: {
    marginVertical: 10,
  },
  container: {
    backgroundColor: theme.lightBlue,
    flex: 1,
  },
  listHeaderContainer: {
    padding: 20,
  },
  listHeaders: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: theme.secondaryBlue,
  },
  listDealerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.secondaryBlue,
  },
  listDesc: {
    marginTop: 5,
    color: theme.black,
  },
  newBadge: {
    backgroundColor: theme.tertiaryBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: theme.white,
    fontWeight: 'bold',
  },
  locationListContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: theme.white,
  },
  locationText: {
    marginVertical: 10,
    fontSize: 20,
  },
  locationSeeMore: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: theme.secondaryBlue,
  },
  locationItemContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  locationCount:{
    fontSize:18,
    fontWeight:'bold',
    color:theme.primaryBlue
  }
});