import React, { useEffect } from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer'
import MainScreen from './screens/main-screen';
import AboutScreen from './screens/about-screen';
import LoginScreen from './screens/login-screen';
import Sidebar from './components/sidebar';
import { useAppSelector } from './hooks/redux.hooks';

const Drawer = createDrawerNavigator();

const App = () => {

  const [isLogged, setIsLogged] = React.useState(false);

  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.username) { // change this for api call
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  return isLogged ? (
    <Drawer.Navigator 
    initialRouteName='Main' 
    drawerContent={props => <Sidebar {...props} />}
    screenOptions={{
      headerShown: false,
      drawerType: 'back',
      overlayColor: '#00000000',
    }}>
      <Drawer.Screen name='Main' component={MainScreen} />
      <Drawer.Screen name='About' component={AboutScreen} />
    </Drawer.Navigator>
  ) : (
    <Drawer.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}>
      <Drawer.Screen name='Login' component={LoginScreen} />
    </Drawer.Navigator>
  )
};

export default App;