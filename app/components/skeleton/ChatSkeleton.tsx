import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './Styles';
import {AppStyle} from '../../theme';

const Component = (): JSX.Element => {
  const detailContainer = StyleSheet.flatten([
    AppStyle.column,
    AppStyle.justifyContent,
  ]);

  return (
    <SkeletonPlaceholder>
      <View style={styles.chatContainer}>
        <View style={styles.profilePicture} />
        <View style={detailContainer}>
          <View style={styles.chatLongText} />
          <View style={styles.chatSmallText} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const ChatSkeleton = (): JSX.Element[] => {
  const ComponentArray: JSX.Element[] = [];
  for (let i: number = 0; i < 8; i++) {
    ComponentArray.push(<Component key={i} />);
  }
  return ComponentArray;
};

export default ChatSkeleton;
