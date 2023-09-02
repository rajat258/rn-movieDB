import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Routes} from '../../constants';
import {useSplash} from '../../hooks';
import {Login, SignUp} from '../../modules';
import {TabNavigator} from '../tab-navigation';

const Stack = createStackNavigator();

const AppNavigator = (): JSX.Element => {
  useSplash();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Login} name={Routes.login} />
      <Stack.Screen component={SignUp} name={Routes.signUp} />
      <Stack.Screen component={TabNavigator} name={Routes.tab} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
