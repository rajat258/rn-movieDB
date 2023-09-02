import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../assets';
import {Strings} from '../../constants';
import {AppStyle} from '../../theme';
import styles from './Styles';
import {Item} from './item';
import useChat, {ChatHookReturnType} from './useChat';
import {GroupType} from '../../type';
import {ChatSkeleton} from '../../components';

const ListFooterComponent = (): JSX.Element => {
  return (
    <View style={styles.listFooterContainer}>
      <Image source={Images.lock} style={styles.lockImage} />
      <Text style={styles.personalMessagesText} allowFontScaling={false}>
        {Strings.personalMessages}
        <Text style={styles.encryptedText} allowFontScaling={false}>
          {Strings.encrypted}
        </Text>
      </Text>
    </View>
  );
};

const ListHeaderComponent = ({group}: {group: GroupType[]}): JSX.Element => {
  return (
    <FlatList
      style={AppStyle.backgroundColor}
      data={group}
      renderItem={({item}) => <Item group {...{item}} />}
    />
  );
};

const Chat = (): JSX.Element => {
  const {data, group}: ChatHookReturnType = useChat();

  return (
    <>
      {data.length === 0 ? (
        <View
          style={StyleSheet.flatten([
            AppStyle.container,
            AppStyle.backgroundColor,
          ])}>
          <ChatSkeleton />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={<ListHeaderComponent {...{group}} />}
          style={AppStyle.backgroundColor}
          data={data}
          renderItem={({item}) => <Item {...{item}} />}
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </>
  );
};

export default Chat;
