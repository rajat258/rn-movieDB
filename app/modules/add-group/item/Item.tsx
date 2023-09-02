import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../assets';
import type {User} from '../../../type';
import styles from './Styles';
import useItem, {ItemHookReturnType} from './useItem';

export interface ItemProps {
  item: User;
  userCount: number;
  selectData: (item: User) => void;
  deSelectData: (item: User) => void;
}

const Item = ({
  item,
  userCount,
  selectData,
  deSelectData,
}: ItemProps): JSX.Element => {
  const {handleSelected, isSelected}: ItemHookReturnType = useItem({
    item,
    userCount,
    selectData,
    deSelectData,
  });
  const buttonStyle = StyleSheet.flatten([
    styles.selectButton,
    isSelected && styles.selectedButton,
  ]);

  if (auth().currentUser?.uid === item?.id) {
    return <View />;
  }

  return (
    <>
      <View style={styles.itemContainer}>
        <Image source={Images.profilePicture} style={styles.profilePicture} />
        <View style={styles.itemDetailContainer}>
          <Text style={styles.name} allowFontScaling={false}>
            {item?.name}
          </Text>
          <Text style={styles.email} allowFontScaling={false}>
            {item?.email}
          </Text>
        </View>
        <TouchableOpacity style={buttonStyle} onPress={handleSelected}>
          {isSelected && (
            <Image source={Images.tick} style={styles.selectImage} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </>
  );
};

export default Item;
