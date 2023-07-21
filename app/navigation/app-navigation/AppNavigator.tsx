import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import {Routes} from '../../constants';
import {DetailScreen, Home, Search} from '../../modules';
import Styles from './Styles';
import useHeader, {HeaderHookReturnType} from './useHeader';

const Stack = createStackNavigator();

const Header = ({
  handleGoBack,
  handleSearch,
  navigation,
}: HeaderHookReturnType): JSX.Element => {
  return (
    <View style={Styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack} style={Styles.iconContainer}>
        <Image
          source={navigation.canGoBack() ? Images.backArrow : Images.menu}
          style={Styles.icon}
        />
      </TouchableOpacity>
      <View style={Styles.logoContainer}>
        <Image source={Images.logo} style={Styles.logo} />
      </View>
      <TouchableOpacity onPress={handleSearch} style={Styles.iconContainer}>
        <Image source={Images.search} style={Styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const AppNavigator = (): JSX.Element => {
  const {handleGoBack, handleSearch, navigation}: HeaderHookReturnType =
    useHeader();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () =>
          Header({
            navigation,
            handleGoBack,
            handleSearch,
          }),
      }}>
      <Stack.Screen component={Home} name={Routes.home} />
      <Stack.Screen component={Search} name={Routes.search} />
      <Stack.Screen component={DetailScreen} name={Routes.detailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
