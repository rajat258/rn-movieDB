import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../../assets';
import {Url} from '../../../../constants';
import type {MovieType} from '../../../../type';
import Styles from './Styles';
import useItem from './useItem';

export interface ItemProps {
  item: MovieType;
}

const Item = ({item}: ItemProps): JSX.Element => {
  const {handleItem, handleItemSettings, handleImageLoad} = useItem({item});

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
          style={Styles.image}
          source={{uri: Url.imageFetchUrl + item?.poster_path}}
        />
        <Image source={Images.play} style={Styles.playImage} />
      </TouchableOpacity>
      <Text ellipsizeMode="clip" numberOfLines={2} style={Styles.movieText}>
        {item?.title}
      </Text>
    </View>
  );
};

export default Item;
