import React from 'react';
import { StyleSheet} from 'react-native';
import {Tabs, SplashStack} from './Router';
import {createSwitchNavigator} from 'react-navigation';

const SwitchNav = createSwitchNavigator({
  Tabs,
  SplashStack
},
{
  initialRouteName:'SplashStack'
})


export default class App extends React.Component {
  render() {
    return (
      <SwitchNav/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
