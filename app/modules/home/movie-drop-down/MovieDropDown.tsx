import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import {GradientText} from '../../../components';
import {Strings} from '../../../constants';
import {Colors} from '../../../theme';
import Styles from '../DropDownStyles';
import type {DropDownHookReturnType} from './useMovieDropDown';
import useMovieDropDown from './useMovieDropDown';

const MovieDropDown = (): JSX.Element => {
  const {
    nowPlaying,
    topRated,
    upcoming,
    movieDropDownVisible,
    handleMovieDropDown,
    loadMovieData,
  }: DropDownHookReturnType = useMovieDropDown();

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleMovieDropDown}
        style={Styles.button}>
        <GradientText
          text={Strings.nowPlaying}
          colors={[Colors.white, Colors.indicatorGreen]}
          style={Styles.buttonText}
          {...(nowPlaying && {...{text: Strings.nowPlaying}})}
          {...(topRated && {...{text: Strings.topRated}})}
          {...(upcoming && {...{text: Strings.upcoming}})}
        />
        <Image source={Images.downArrow} style={Styles.downArrow} />
      </TouchableOpacity>
      {movieDropDownVisible && (
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: -0.3, y: 1}}
          style={Styles.listContainer}
          colors={[Colors.indicatorGreen, Colors.white]}>
          {!nowPlaying && (
            <TouchableOpacity onPress={() => loadMovieData({nowPlaying: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.nowPlaying}
              </Text>
            </TouchableOpacity>
          )}
          {!topRated && (
            <TouchableOpacity onPress={() => loadMovieData({topRated: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.topRated}
              </Text>
            </TouchableOpacity>
          )}
          {!upcoming && (
            <TouchableOpacity onPress={() => loadMovieData({upcoming: true})}>
              <Text allowFontScaling={false} style={Styles.text}>
                {Strings.upcoming}
              </Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      )}
    </View>
  );
};

export default MovieDropDown;
