import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {Routes} from '../../constants';
import {DetailScreen, Home, Search} from '../../modules';
import {HeaderHookReturnType, header, useHeader} from '../header';

const Stack = createStackNavigator();

const HomeStackNavigator = (): JSX.Element => {
  const {handleSearch, navigation}: HeaderHookReturnType = useHeader();

  const childOptions: StackNavigationOptions = {
    header: () =>
      header({
        navigation,
        handleSearch,
        childScreen: true,
      }),
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () =>
            header({
              navigation,
              handleSearch,
            }),
        }}
        component={Home}
        name={Routes.home}
      />
      <Stack.Screen
        options={childOptions}
        component={Search}
        name={Routes.search}
      />
      <Stack.Screen
        options={childOptions}
        component={DetailScreen}
        name={Routes.detailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
