import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';

import { StackParamList } from '../types/commons';

const Stack = createStackNavigator<StackParamList>();

const AppRoot = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AppRoot;
