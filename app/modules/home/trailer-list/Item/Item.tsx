import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Images} from '../../../../assets';
import {Url} from '../../../../constants';
import {verticalScale} from '../../../../theme';
import type {MovieType} from '../../../../type';
import Styles from './Styles';
import useItem from './useItem';

export interface ItemProps {
  item: MovieType;
  index: number;
  currentIndex: React.MutableRefObject<number>;
}

const Item = ({item, currentIndex, index}: ItemProps): JSX.Element => {
  const {handleTrailer, handleImageLoad, trailer, isTrailer} = useItem({
    item,
    currentIndex,
    index,
  });

  return (
    <>
      <View
        style={StyleSheet.flatten([
          Styles.container,
          trailer ? Styles.trailerContainer : {},
        ])}>
        {trailer.length === 0 && (
          <View style={Styles.threeDotsContainer}>
            <Image source={Images.threeDots} style={Styles.threeDotsImage} />
          </View>
        )}
        {trailer.length ? (
          <YoutubePlayer
            height={verticalScale(500)}
            play={true}
            videoId={trailer}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={handleTrailer}
              style={Styles.buttonContainer}>
              <Image
                onLoadEnd={handleImageLoad}
                style={Styles.image}
                source={{uri: Url.imageFetchUrl + item?.poster_path}}
              />
              <Image source={Images.play} style={Styles.playImage} />
            </TouchableOpacity>
            <Text
              allowFontScaling={false}
              ellipsizeMode="clip"
              numberOfLines={2}
              style={Styles.movieText}>
              {item?.title}
            </Text>
          </>
        )}
      </View>
      {isTrailer && (
        <TouchableOpacity onPress={handleTrailer} style={Styles.crossButton}>
          <Image style={Styles.crossImage} source={Images.cross} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Item;
