import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import {GradientText} from '../../../components';
import {Strings} from '../../../constants';
import {Colors} from '../../../theme';
import Styles from '../DropDownStyles';
import type {DropDownHookReturnType} from './useTrendingDropDown';
import useTrendingDropDown from './useTrendingDropDown';

const TrendingDropDown = (): JSX.Element => {
  const {
    today,
    week,
    trendingDropDownVisible,
    handleTrendingDropDown,
    loadTrendingData,
  }: DropDownHookReturnType = useTrendingDropDown();

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleTrendingDropDown}
        style={Styles.button}>
        <GradientText
          text={Strings.today}
          colors={[Colors.white, Colors.indicatorGreen]}
          style={Styles.buttonText}
          {...(today && {...{text: Strings.today}})}
          {...(week && {...{text: Strings.week}})}
        />
        <Image source={Images.downArrow} style={Styles.downArrow} />
      </TouchableOpacity>
      {trendingDropDownVisible && (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: -0.3, y: 1}}
          style={Styles.listContainer}
          colors={[Colors.indicatorGreen, Colors.white]}>
          {!today && (
            <TouchableOpacity onPress={() => loadTrendingData({today: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.today}
              </Text>
            </TouchableOpacity>
          )}
          {!week && (
            <TouchableOpacity onPress={() => loadTrendingData({week: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.week}
              </Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}
    </View>
  );
};

export default TrendingDropDown;
