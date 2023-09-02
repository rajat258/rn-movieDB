import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {Routes} from '../../constants';
import {AddGroup, Chat, ChatDetail, Profile} from '../../modules';
import {HeaderHookReturnType, header, useHeader} from '../header';

const Stack = createStackNavigator();

const ProfileStackNavigator = (): JSX.Element => {
  const {handleSearch, navigation}: HeaderHookReturnType = useHeader();

  const childOptions: StackNavigationOptions = {
    header: () =>
      header({
        navigation,
        handleSearch,
        childScreen: true,
        profile: true,
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
              profile: true,
            }),
        }}
        component={Profile}
        name={Routes.profile}
      />
      <Stack.Screen
        options={childOptions}
        component={Chat}
        name={Routes.chat}
      />
      <Stack.Screen
        options={{headerShown: false, presentation: 'modal'}}
        component={AddGroup}
        name={Routes.addGroup}
      />
      <Stack.Screen
        options={{headerShown: false}}
        component={ChatDetail}
        name={Routes.chatDetail}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
