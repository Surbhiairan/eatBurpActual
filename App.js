import { Navigation } from 'react-native-navigation';

import AuthScreen from './app/screens/Auth/Auth';
import Home from './app/screens/Home/Home.screen';
import DishDetail from './app/screens/DishDetail/DishDetail.screen';
import SideDrawer from './app/screens/SideDrawer/SideDrawer';
import SearchSuggestions from './app/screens/SearchSuggestions/SearchSuggestions.screen';
import UserProfileScreen from './app/screens/UserProfile/UserProfile.screen';
import RestaurantDetail from './app/screens/RestaurantDetail/RestaurantDetail.screen';
import ReviewDish from './app/screens/ReviewDish/ReviewDish.screen';
import SearchResults from './app/screens/SearchResults/SearchResults.screen';
import TopTenDish from './app/screens/TopTenDish/TopTenDish.screen';

import { Provider } from 'react-redux';
import store from './app/store/store';
import HomeScreen from './app/screens/Home/Home.screen';
// Register Screens
Navigation.registerComponent(
  "AuthScreen", 
  () => AuthScreen, 
  store, 
  Provider
); //you have to register a component before you can load it through react native navigation

Navigation.registerComponent(
  "HomeScreen", 
  () => HomeScreen, 
  store, 
  Provider
);

Navigation.registerComponent(
  "TopTenDishScreen", 
  () => TopTenDish, 
  store, 
  Provider
);

Navigation.registerComponent(
  "DishDetailScreen", 
  () => DishDetail, 
  store, 
  Provider
);

Navigation.registerComponent(
  "RestaurantDetailScreen", 
  () => RestaurantDetail, 
  store, 
  Provider
);

Navigation.registerComponent(
  "SearchSuggestionScreen", 
  () => SearchSuggestions, 
  store, 
  Provider
);

Navigation.registerComponent(
  "SearchResultScreen", 
  () => SearchResults, 
  store, 
  Provider
);

Navigation.registerComponent(
  "SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

Navigation.registerComponent(
  "UserProfileScreen",
  () => UserProfileScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "ReviewDishScreen",
  () => ReviewDish,
  store,
  Provider
);

// Start App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "RestaurantDetailScreen",
  }
});