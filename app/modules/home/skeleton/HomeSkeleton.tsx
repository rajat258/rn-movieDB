import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppStyle} from '../../../theme';
import Styles from './Styles';

const HomeSkeleton = (): JSX.Element => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={Styles.container}>
          <View style={Styles.textContainer}>
            <View style={Styles.headerText} />
            <View style={Styles.button} />
          </View>
          <View style={AppStyle.row}>
            <View style={Styles.itemContainer} />
            <View style={Styles.itemContainer} />
            <View style={Styles.itemContainer} />
          </View>
          <View style={Styles.infoContainer}>
            <View style={Styles.column}>
              <View style={Styles.textBig} />
              <View style={Styles.textSmall} />
            </View>
            <View style={Styles.column}>
              <View style={Styles.textBig} />
              <View style={Styles.textSmall} />
            </View>
            <View style={Styles.column}>
              <View style={Styles.textBig} />
              <View style={Styles.textSmall} />
            </View>
          </View>
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export default HomeSkeleton;
