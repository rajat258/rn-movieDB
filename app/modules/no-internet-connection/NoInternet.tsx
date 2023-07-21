import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import styles from './Styles';

interface NoInternetProps {
  checkConnection: () => void;
}

const NoInternet = ({checkConnection}: NoInternetProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={Images.noInternet} style={styles.noInternetGif} />
      <TouchableOpacity
        style={styles.refreshContainer}
        onPress={checkConnection}>
        <Image source={Images.refresh} style={styles.refreshImage} />
      </TouchableOpacity>
    </View>
  );
};

export default NoInternet;
