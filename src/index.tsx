import React, { useEffect } from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer'
import MainScreen from './screens/main-screen';
import AboutScreen from './screens/about-screen';
import LoginScreen from './screens/login-screen';
import Sidebar from './components/sidebar';
import { useAppSelector } from './hooks/redux.hooks';
import {
  createStackNavigator
} from '@react-navigation/stack'
import RegisterScreen from './screens/register-screen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
};

export default App;