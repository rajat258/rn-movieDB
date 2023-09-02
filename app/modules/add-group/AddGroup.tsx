import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../assets';
import {Strings} from '../../constants';
import {AppStyle, Colors} from '../../theme';
import type {User} from '../../type';
import {opaqueColor} from '../../utils';
import styles from './Styles';
import {Header} from './header';
import {Item} from './item';
import useAddGroup, {AddGroupHookReturnType} from './useAddGroup';

const AddGroup = (): JSX.Element => {
  const {
    data,
    userCount,
    selectData,
    deSelectData,
    isCreate,
    handleIsCreate,
    createGroup,
    handleGroupName,
    groupName,
  }: AddGroupHookReturnType = useAddGroup();

  const containerStyle = StyleSheet.flatten([
    styles.container,
    isCreate && {backgroundColor: opaqueColor(Colors.black, 0.5)},
  ]);
  const tickStyle = StyleSheet.flatten([
    styles.tickButton,
    groupName.length === 0 && {opacity: 0.3},
  ]);

  return (
    <View style={containerStyle}>
      <Header {...{userCount, handleIsCreate, isCreate}} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            {...{
              userCount,
              selectData,
              deSelectData,
            }}
            item={item as User}
          />
        )}
      />
      <Modal animationType="slide" visible={isCreate} transparent>
        <View style={styles.modalContainer}>
          <View style={AppStyle.row}>
            <TouchableOpacity
              onPress={handleIsCreate}
              style={styles.crossButton}>
              <Image source={Images.cross} style={styles.crossImage} />
            </TouchableOpacity>
            <View style={AppStyle.container} />
            <TouchableOpacity
              disabled={!(groupName.length > 0)}
              onPress={createGroup}
              style={tickStyle}>
              <Image source={Images.tick} style={styles.tickImage} />
            </TouchableOpacity>
          </View>
          <TextInput
            onChangeText={handleGroupName}
            placeholder={Strings.groupName}
            placeholderTextColor={Colors.grey}
            style={styles.textInput}
            allowFontScaling={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddGroup;
