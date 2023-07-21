import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {Strings, Url} from '../../constants';
import {Colors, moderateScale} from '../../theme';
import {opaqueColor, percentageColor} from '../../utils';
import Styles from './Styles';
import useDetailScreen, {DetailHookReturnType} from './useDetailScreen';

const DetailScreen = (): JSX.Element => {
  const {item, year, genres, director, _playTrailer}: DetailHookReturnType =
    useDetailScreen();

  return (
    <ScrollView
      bounces={false}
      style={Styles.container}
      showsVerticalScrollIndicator={false}>
      <Image
        resizeMode="cover"
        source={{
          uri: item?.backdrop_path
            ? Url.imageFetchUrl + item?.backdrop_path
            : Images.noPosterImage,
        }}
        style={Styles.backgroundImage}
      />
      <LinearGradient
        start={{x: 0.2, y: 1}}
        end={{x: 1, y: 1}}
        style={Styles.gradientLayer}
        colors={[Colors.black + 99, Colors.white + '00']}
      />
      <Image
        resizeMode="cover"
        source={{
          uri: item?.poster_path
            ? Url.imageFetchUrl + item?.poster_path
            : Images.noPosterImage,
        }}
        style={Styles.posterImage}
      />
      <Text style={Styles.title} numberOfLines={2} ellipsizeMode="tail">
        {item?.title ?? item?.name}
        <Text style={Styles.releaseDate}>{` (${year.getFullYear()})`}</Text>
      </Text>
      <View style={Styles.scoreTrailerContainer}>
        <View style={Styles.detailContainer}>
          <CircularProgress
            valueSuffix={'%'}
            valueSuffixStyle={{fontSize: moderateScale(6)}}
            activeStrokeWidth={moderateScale(4)}
            circleBackgroundColor={Colors.primary}
            inActiveStrokeWidth={moderateScale(4)}
            inActiveStrokeColor={opaqueColor(
              percentageColor(item?.vote_average ?? 0),
              0.5,
            )}
            activeStrokeColor={percentageColor(item?.vote_average ?? 0)}
            progressValueColor={Colors.white}
            progressValueFontSize={moderateScale(16)}
            radius={moderateScale(24)}
            value={(item?.vote_average ?? 0) * 10}
          />
          <Text style={Styles.userText}>{Strings.userScore}</Text>
        </View>
        <View style={Styles.line} />
        <TouchableOpacity onPress={_playTrailer} style={Styles.detailContainer}>
          <Image source={Images.play} style={Styles.playImage} />
          <Text style={Styles.userText}>{Strings.playTrailer}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.infoContainer}>
        <View style={Styles.infoChildContainer}>
          <Text style={Styles.userText}>{`${
            item?.release_date ?? item?.first_air_date
          } (${
            item?.production_companies?.[0]?.origin_country ?? Strings.us
          }) • ${Math.floor((item?.runtime ?? 60) / 60)}h${Math.floor(
            (item?.runtime ?? 60) % 60,
          )}m`}</Text>
          <Text style={Styles.userText}>{genres}</Text>
        </View>
      </View>
      <Text style={Styles.headerText}>{Strings.overview}</Text>
      <Text style={Styles.detailText}>
        {item?.overview ? item?.overview : Strings.notAvailable}
      </Text>
      <Text style={Styles.headerText}>{Strings.director}</Text>
      <Text
        style={StyleSheet.flatten([Styles.detailText, Styles.paddingBottom])}>
        {director?.original_name ?? Strings.notAvailable}
      </Text>
    </ScrollView>
  );
};

export default DetailScreen;
