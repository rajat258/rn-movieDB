import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Styles from './Styles';

export const ImageSkeleton = (): JSX.Element => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={Styles.itemContainer} />
        <View style={Styles.column}>
          <View
            style={StyleSheet.flatten([Styles.textBig, Styles.marginTop])}
          />
          <View style={Styles.textSmall} />
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export default ImageSkeleton;
