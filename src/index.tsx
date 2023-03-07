import React from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer'
import MainScreen from './screens/main-screen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator initialRouteName='Main'>
      <Drawer.Screen name='Main' component={MainScreen} />
    </Drawer.Navigator>
  )
};

export default App;