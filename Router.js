import React from 'react';
import {createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';

import DetailsScreen from './screens/DetailsScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import MapScreen from './screens/MapScreen';
import SplashScreen from './screens/SplashScreen';
import SearchCoffeeScreen from './screens/SearchCoffeeScreen';
import ChatScreen from './screens/ChatScreen';


const HomeStack = createStackNavigator({
    Home: SearchCoffeeScreen,
    Details:DetailsScreen
});


const MapStack = createStackNavigator({
    MapScreen:MapScreen,
    Details:DetailsScreen
});

const FavoritesStack = createStackNavigator({
    Favorites:FavoriteScreen,
    Details:DetailsScreen
});

const ChatStack = createStackNavigator({
    Chat:ChatScreen
});

export const Tabs = createBottomTabNavigator({
    HomeStack,
    MapStack,
    FavoritesStack,
    ChatStack
})