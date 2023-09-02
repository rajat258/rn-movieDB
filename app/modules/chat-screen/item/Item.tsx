import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import {Strings} from '../../../constants';
import {Colors, horizontalScale} from '../../../theme';
import type {ChatType, GroupType} from '../../../type';
import styles from '../Styles';
import useItem, {ItemHookReturnType} from './useItem';

export interface ItemProps {
  item: ChatType | GroupType;
  group?: boolean;
}

const Item = ({item, group = false}: ItemProps): JSX.Element => {
  const {handleDetailScreen, message, isSent, isRead}: ItemHookReturnType =
    useItem({
      item,
      group,
    });
  const messageContainerStyle = StyleSheet.flatten([
    styles.messageContainer,
    isSent && {paddingLeft: horizontalScale(10)},
  ]);

  if (auth().currentUser?.uid === item?.id) {
    return <></>;
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleDetailScreen}
        style={styles.itemContainer}>
        <Image
          source={group ? Images.groupProfile : Images.profilePicture}
          style={styles.profilePicture}
        />
        <View style={styles.itemDetailContainer}>
          <Text style={styles.name} allowFontScaling={false}>
            {item?.name}
          </Text>
          {message.length !== 0 ? (
            <View style={messageContainerStyle}>
              {isSent && isRead && (
                <Image
                  source={Images.doubleTick}
                  style={styles.readDoubleTick}
                />
              )}
              {isSent && !isRead && (
                <Image
                  source={Images.doubleTick}
                  style={styles.unreadDoubleTick}
                />
              )}
              {(message === Strings.image || message === Strings.video) && (
                <Image source={Images.camera} style={styles.camera} />
              )}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.message}
                allowFontScaling={false}>
                {message}
              </Text>
            </View>
          ) : (
            <>
              {!group && (
                <Text style={styles.email} allowFontScaling={false}>
                  {(item as ChatType)?.email}
                </Text>
              )}
            </>
          )}
        </View>
        {!isRead && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.unreadContainer}
            colors={[Colors.primary, Colors.accent200]}
          />
        )}
      </TouchableOpacity>
      <View style={styles.line} />
    </>
  );
};

export default Item;
