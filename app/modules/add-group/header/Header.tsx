import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../assets';
import Styles from './Styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface HeaderProps {
  userCount: number;
  handleIsCreate: () => void;
  isCreate: boolean;
}

const Header = ({
  userCount,
  handleIsCreate,
  isCreate,
}: HeaderProps): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const createStyle = StyleSheet.flatten([
    Styles.createContainer,
    userCount > 1 && !isCreate && {opacity: 1},
  ]);

  return (
    <View style={Styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={Styles.iconContainer}>
        <Image source={Images.backArrow} style={Styles.icon} />
      </TouchableOpacity>
      <View style={Styles.logoContainer}>
        <Image source={Images.logo} style={Styles.logo} />
      </View>
      <TouchableOpacity
        disabled={!(userCount > 1) || isCreate}
        onPress={handleIsCreate}
        style={createStyle}>
        <Image source={Images.tick} style={Styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
