import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import {GradientText} from '../../../components';
import {Strings} from '../../../constants';
import {Colors} from '../../../theme';
import Styles from '../DropDownStyles';
import type {PopularHookReturnType} from './usePopularDropDown';
import usePopularDropDown from './usePopularDropDown';

const PopularDropDown = (): JSX.Element => {
  const {
    rent,
    streaming,
    tv,
    popularDropDown,
    handlePopularDropDown,
    loadPopularData,
  }: PopularHookReturnType = usePopularDropDown();

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePopularDropDown}
        style={Styles.button}>
        <GradientText
          text={Strings.streaming}
          colors={[Colors.white, Colors.indicatorGreen]}
          style={Styles.buttonText}
          {...(streaming && {...{text: Strings.streaming}})}
          {...(tv && {...{text: Strings.onTV}})}
          {...(rent && {...{text: Strings.forRent}})}
        />
        <Image source={Images.downArrow} style={Styles.downArrow} />
      </TouchableOpacity>
      {popularDropDown && (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: -0.3, y: 1}}
          style={Styles.listContainer}
          colors={[Colors.indicatorGreen, Colors.white]}>
          {!streaming && (
            <TouchableOpacity
              onPress={() => loadPopularData({streaming: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.streaming}
              </Text>
            </TouchableOpacity>
          )}
          {!tv && (
            <TouchableOpacity onPress={() => loadPopularData({tv: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.onTV}
              </Text>
            </TouchableOpacity>
          )}
          {!rent && (
            <TouchableOpacity onPress={() => loadPopularData({rent: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.forRent}
              </Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}
    </View>
  );
};

export default PopularDropDown;
