import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Styles from './Styles';

const TrailerSkeleton = (): JSX.Element => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.trailerContainer}>
        <View
          style={StyleSheet.flatten([Styles.textContainer, Styles.marginTop])}>
          <View style={Styles.headerText} />
          <View style={Styles.button} />
        </View>
        <View style={Styles.trailerImage} />
        <View style={Styles.trailerText} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default TrailerSkeleton;
