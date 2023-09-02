import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Images} from '../../assets';
import {Routes} from '../../constants';
import {AppStyle} from '../../theme';
import {HomeStackNavigator, ProfileStackNavigator} from '../stack-navigation';
import Styles from './Styles';

const Tab = createBottomTabNavigator();

interface IconProp {
  navigation: BottomTabNavigationProp<ParamListBase>;
  imageFocused: ImageSourcePropType;
  image: ImageSourcePropType;
  routes: string;
}

const tabBarIcon = ({
  image,
  imageFocused,
  navigation,
  routes,
}: IconProp): JSX.Element => {
  const textStyle = StyleSheet.flatten([
    Styles.text,
    navigation.isFocused() ? Styles.textFocused : {},
  ]);
  const iconStyle = StyleSheet.flatten([
    Styles.icon,
    navigation.isFocused() ? Styles.iconFocused : {},
  ]);
  return (
    <View style={Styles.tabContainer}>
      <Image
        style={iconStyle}
        source={navigation.isFocused() ? imageFocused : image}
      />
      <Text style={textStyle} allowFontScaling={false}>
        {routes}
      </Text>
    </View>
  );
};

const TabNavigator = (): JSX.Element => {
  return (
    <>
      <SafeAreaView style={AppStyle.appContainer} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: Styles.tabBarStyle,
        }}>
        <Tab.Screen
          options={({navigation: nav}) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () =>
              tabBarIcon({
                image: Images.home,
                imageFocused: Images.homeFocused,
                navigation: nav,
                routes: Routes.home,
              }),
          })}
          component={HomeStackNavigator}
          name={Routes.homeStack}
        />
        <Tab.Screen
          options={({navigation: nav}) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () =>
              tabBarIcon({
                image: Images.user,
                imageFocused: Images.userFocused,
                navigation: nav,
                routes: Routes.profile,
              }),
          })}
          component={ProfileStackNavigator}
          name={Routes.profileStack}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
