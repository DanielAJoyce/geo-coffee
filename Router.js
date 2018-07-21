import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Platform} from 'react-native';

import DetailsScreen from './screens/DetailsScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import MapScreen from './screens/MapScreen';
import SplashScreen from './screens/SplashScreen';
import SearchCoffeeScreen from './screens/SearchCoffeeScreen';
import ChatScreen from './screens/ChatScreen';
import TabBarIcon from './components/ui/TabBarIcon'


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


HomeStack.navigationOptions={
    tabBarLabel:'Home',
    tabBarIcon:({focused}) => (
        // The icon will change based on platform and focused.
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios'
            ? `ios-home${focused ? '' : '-outline'}`
            : 'md-home'
        }
        />
    )};

MapStack.navigationOptions={
    tabBarLabel:'Map',
    tabBarIcon:({focused}) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios' 
            ? `ios-map${focused ? '' : `-outline`}`
            : 'md-map'
    }
    />
)};

FavoritesStack.navigationOptions={
    tabBarLabel:'Favorites',
    tabBarIcon:({focused}) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios' 
            ? `ios-heart${focused ? '' : `-outline`}`
            : `md-heart${focused ? '' : '-outline'}`
    }
    />
)};

ChatStack.navigationOptions={
    tabBarLabel:'Chat',
    tabBarIcon:({focused}) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios' 
            ? `ios-chatbubbles${focused ? '' : `-outline`}`
            : 'md-chatbubbles'
    }
    />
)};

export const SplashStack = createStackNavigator({
    Splash:SplashScreen
},{
    header: { visible:false },
    headerMode: 'none'
    }
);


export const Tabs = createBottomTabNavigator({
    HomeStack,
    MapStack,
    FavoritesStack,
    ChatStack
},
{
    initialRouteName:'HomeStack',
    activeTintColor:'#3f3f3f',
    inactiveTintColor:'#e5e5e5',
    barStyle:{
      backgroundColor:'#f0edf6'
    }
});