import firestore from '@react-native-firebase/firestore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useRef, useState} from 'react';
import {Routes, Strings, firestoreConstant} from '../../../constants';
import {getUser} from '../../../services';
import type {User} from '../../../type';
import type {ItemProps} from './Item';

export interface ItemHookReturnType {
  handleDetailScreen: () => void;
  message: string;
  isSent: boolean;
  isRead: boolean;
}

const useItem = ({item, group}: ItemProps): ItemHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const user = useRef<User>();
  const docId = useRef<string>();
  const [message, setMessage] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(true);

  const initData = async (): Promise<void> => {
    user.current = (await getUser()) as User;
    if (group) {
      docId.current = item.id;
    } else {
      docId.current =
        user.current.id > item?.id
          ? user.current.id + '-' + item?.id
          : item?.id + '-' + user.current.id;
    }
    // Fetching Last message of chat on Chat Screen
    // Checking if message is sent or received
    firestore()
      .collection(firestoreConstant.chat)
      .doc(docId.current)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnap => {
        const instance = querySnap.docs?.[0];
        if (instance?.exists) {
          if (instance.data()?.image) {
            setMessage(Strings.image);
          } else if (instance.data()?.video) {
            setMessage(Strings.video);
          } else {
            setMessage(instance.data()?.text);
          }
          setIsSent(instance.data()?.sentBy === user.current?.id);
        }
      });
  };

  useEffect(() => {
    // Checking if message is read or not
    const unsubscribe = firestore()
      .collection(firestoreConstant.chat)
      .onSnapshot(() => {
        firestore()
          .collection(firestoreConstant.chat)
          .doc(docId.current)
          .get()
          .then(chatData => {
            if (chatData.exists) {
              setIsRead(chatData.data()?.unread?.[user.current?.id as string]);
            }
          });
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    initData();
  }, []);

  const handleDetailScreen = (): void =>
    navigation.navigate(Routes.chatDetail, {item, group, docId: docId.current});

  return {handleDetailScreen, message, isSent, isRead};
};

export default useItem;
