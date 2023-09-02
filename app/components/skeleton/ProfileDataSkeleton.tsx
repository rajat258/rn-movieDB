import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../theme';
import {opaqueColor} from '../../utils';
import styles from './Styles';

const ProfileDataSkeleton = (): JSX.Element => {
  return (
    <SkeletonPlaceholder backgroundColor={opaqueColor(Colors.black, 0.4)}>
      <View style={styles.text} />
    </SkeletonPlaceholder>
  );
};

export default ProfileDataSkeleton;
