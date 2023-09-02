import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Images} from '../../assets';
import {Strings, Url} from '../../constants';
import {Colors, moderateScale, verticalScale} from '../../theme';
import {opaqueColor, percentageColor} from '../../utils';
import Styles from './Styles';
import type {DetailHookReturnType} from './useDetailScreen';

const DetailComponent = ({
  item,
  year,
  genres,
  director,
  trailer,
  handleTrailer,
  isLoading,
  isTrailer,
}: DetailHookReturnType): JSX.Element => {
  return (
    <>
      <ActivityIndicator
        style={Styles.activityIndicator}
        animating={isLoading}
      />
      {trailer.length ? (
        <YoutubePlayer
          height={verticalScale(250)}
          play={true}
          videoId={trailer}
        />
      ) : (
        <>
          <Image
            resizeMode="cover"
            source={
              item?.backdrop_path
                ? {uri: Url.imageFetchUrl + item?.backdrop_path}
                : Images.noPosterImage
            }
            style={Styles.backgroundImage}
          />
          <LinearGradient
            start={{x: 0.2, y: 1}}
            end={{x: 1, y: 1}}
            style={Styles.gradientLayer}
            colors={[
              opaqueColor(Colors.black, 0.99),
              opaqueColor(Colors.white, 0),
            ]}
          />
          <Image
            resizeMode="cover"
            source={
              item?.poster_path
                ? {uri: Url.imageFetchUrl + item?.poster_path}
                : Images.noPosterImage
            }
            style={Styles.posterImage}
          />
        </>
      )}
      <Text
        style={Styles.title}
        numberOfLines={2}
        ellipsizeMode="tail"
        allowFontScaling={false}>
        {item?.title ?? item?.name}
        <Text
          style={Styles.releaseDate}
          allowFontScaling={false}>{` (${year.getFullYear()})`}</Text>
      </Text>
      <View style={Styles.scoreTrailerContainer}>
        <View style={Styles.detailContainer}>
          <CircularProgress
            allowFontScaling={false}
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
          <Text style={Styles.userText} allowFontScaling={false}>
            {Strings.userScore}
          </Text>
        </View>
        <View style={Styles.line} />
        <TouchableOpacity
          onPress={handleTrailer}
          style={Styles.detailContainer}>
          <Image
            source={isTrailer ? Images.pause : Images.play}
            style={Styles.playImage}
          />
          <Text style={Styles.userText} allowFontScaling={false}>
            {isTrailer ? Strings.stopTrailer : Strings.playTrailer}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.infoContainer}>
        <View style={Styles.infoChildContainer}>
          <Text style={Styles.userText} allowFontScaling={false}>{`${
            item?.release_date ?? item?.first_air_date
          } (${
            item?.production_companies?.[0]?.origin_country ?? Strings.us
          }) • ${Math.floor((item?.runtime ?? 60) / 60)}h${Math.floor(
            (item?.runtime ?? 60) % 60,
          )}m`}</Text>
          <Text style={Styles.userText} allowFontScaling={false}>
            {genres}
          </Text>
        </View>
      </View>
      <Text style={Styles.headerText} allowFontScaling={false}>
        {Strings.overview}
      </Text>
      <Text style={Styles.detailText} allowFontScaling={false}>
        {item?.overview ? item?.overview : Strings.notAvailable}
      </Text>
      <Text style={Styles.headerText} allowFontScaling={false}>
        {Strings.director}
      </Text>
      <Text
        style={StyleSheet.flatten([Styles.detailText, Styles.paddingBottom])}
        allowFontScaling={false}>
        {director?.original_name ?? Strings.notAvailable}
      </Text>
    </>
  );
};

export default DetailComponent;
