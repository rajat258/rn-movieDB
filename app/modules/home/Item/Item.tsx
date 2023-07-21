import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Images} from '../../../assets';
import {Strings, Url} from '../../../constants';
import {Colors, globalMetrics, moderateScale} from '../../../theme';
import type {MovieType} from '../../../type';
import {ImageSkeleton} from '../skeleton';
import Styles from './Styles';
import useItem from './useItem';

const Item = ({item}: {item: MovieType}): JSX.Element => {
  const {
    isLoaded,
    handleItem,
    handleItemSettings,
    percentageColor,
    handleImageLoad,
  } = useItem({item});

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={handleItemSettings}
        style={Styles.threeDotsContainer}>
        <Image source={Images.threeDots} style={Styles.threeDotsImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleItem} style={Styles.buttonContainer}>
        <Image
          onLoadEnd={handleImageLoad}
          // Works for Android only
          // if used for iOS, onLoadEnd is not fired because of display: 'none'
          style={StyleSheet.flatten([
            Styles.image,
            globalMetrics.isAndroid && !isLoaded && Styles.hideImage,
          ])}
          source={{
            uri: item?.poster_path
              ? Url.imageFetchUrl + item?.poster_path
              : Images.noPosterImage,
          }}
        />
        {!isLoaded && globalMetrics.isAndroid && <ImageSkeleton />}
        {isLoaded && (
          <View style={Styles.progressContainer}>
            <CircularProgress
              valueSuffix={'%'}
              valueSuffixStyle={{fontSize: moderateScale(5)}}
              activeStrokeWidth={moderateScale(2)}
              circleBackgroundColor={Colors.primary}
              inActiveStrokeWidth={moderateScale(2)}
              inActiveStrokeColor={percentageColor() + '50'}
              activeStrokeColor={percentageColor()}
              progressValueColor={Colors.white}
              progressValueFontSize={moderateScale(12)}
              radius={moderateScale(18)}
              value={item?.vote_average * 10}
            />
          </View>
        )}
      </TouchableOpacity>
      {isLoaded && (
        <View style={Styles.detailsContainer}>
          <Text ellipsizeMode="clip" numberOfLines={2} style={Styles.movieText}>
            {item?.name ?? item?.title ?? Strings.notAvailable}
          </Text>
          <Text style={Styles.dateText}>
            {item?.first_air_date ?? item?.release_date ?? Strings.notAvailable}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Item;
