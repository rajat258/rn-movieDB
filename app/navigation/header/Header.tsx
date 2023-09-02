import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import {Routes} from '../../constants';
import {LogoutHookReturnType, useLogout} from '../../hooks';
import Styles from './Styles';
import type {HeaderHookReturnType} from './useHeader';

const Header = ({
  handleSearch,
  navigation,
  childScreen = false,
  profile = false,
}: HeaderHookReturnType): JSX.Element => {
  const {logout}: LogoutHookReturnType = useLogout();

  const profileFunction = (): void => {
    if (childScreen) {
      navigation.pop();
    } else {
      logout();
    }
  };

  return (
    <>
      {profile ? (
        <View style={Styles.headerContainer}>
          <TouchableOpacity
            onPress={profileFunction}
            style={Styles.iconContainer}>
            <Image
              source={childScreen ? Images.backArrow : Images.logout}
              style={Styles.icon}
            />
          </TouchableOpacity>
          <View style={Styles.logoContainer}>
            <Image source={Images.logo} style={Styles.logo} />
          </View>
          {childScreen && (
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.addGroup)}
              style={Styles.iconContainer}>
              <Image source={Images.group} style={Styles.icon} />
            </TouchableOpacity>
          )}
          {!childScreen && (
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.chat)}
              style={Styles.iconContainer}>
              <Image source={Images.chat} style={Styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={Styles.headerContainer}>
          <TouchableOpacity
            disabled={!childScreen}
            onPress={() => navigation.goBack()}
            style={Styles.iconContainer}>
            <Image
              source={childScreen ? Images.backArrow : Images.menu}
              style={Styles.icon}
            />
          </TouchableOpacity>
          <View style={Styles.logoContainer}>
            <Image source={Images.logo} style={Styles.logo} />
          </View>
          {!childScreen && (
            <TouchableOpacity
              onPress={handleSearch}
              style={Styles.iconContainer}>
              <Image source={Images.search} style={Styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default Header;
