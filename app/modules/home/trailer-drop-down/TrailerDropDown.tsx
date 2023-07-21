import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import {Strings} from '../../../constants';
import {Colors} from '../../../theme';
import Styles from '../DropDownStyles';
import type {TrailerHookReturnType} from './useTrailerDropDown';
import usePopularDropDown from './useTrailerDropDown';

export interface TrailerProps {
  handleBackgroundImage: (image: string) => void;
}

const TrailerDropDown = ({
  handleBackgroundImage,
}: TrailerProps): JSX.Element => {
  const {
    streaming,
    topRated,
    trailerDropDown,
    handleTrailerDropDown,
    loadStreamingData,
    loadTopRatedData,
  }: TrailerHookReturnType = usePopularDropDown({handleBackgroundImage});

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleTrailerDropDown}
        style={Styles.button}>
        <LinearGradient
          colors={[Colors.indicatorGreen, Colors.white]}
          start={{x: 1, y: 0}}
          end={{x: -0.3, y: 1}}
          style={Styles.button}>
          <Text style={Styles.buttonText}>
            {streaming ? Strings.streaming : Strings.topRated}
          </Text>
          <Image
            source={Images.downArrow}
            style={StyleSheet.flatten([Styles.downArrow, Styles.tintColor])}
          />
        </LinearGradient>
      </TouchableOpacity>
      {trailerDropDown && (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: -0.3, y: 1}}
          style={Styles.listContainer}
          colors={[Colors.indicatorGreen, Colors.white]}>
          {!streaming && (
            <TouchableOpacity onPress={loadStreamingData}>
              <Text style={Styles.text}>{Strings.streaming}</Text>
            </TouchableOpacity>
          )}
          {!topRated && (
            <TouchableOpacity onPress={loadTopRatedData}>
              <Text style={Styles.text}>{Strings.topRated}</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}
    </View>
  );
};

export default TrailerDropDown;
