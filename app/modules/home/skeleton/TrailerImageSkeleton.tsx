import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Styles from './Styles';

const TrailerImageSkeleton = (): JSX.Element => {
  return (
    <SkeletonPlaceholder>
      <View style={Styles.trailerContainer}>
        <View style={Styles.trailerImage} />
        <View style={Styles.trailerText} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default TrailerImageSkeleton;
