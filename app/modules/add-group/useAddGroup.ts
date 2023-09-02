import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Strings, firestoreConstant} from '../../constants';
import type {User} from '../../type';

export interface AddGroupHookReturnType {
  data: User[];
  userCount: number;
  selectData: (item: User) => void;
  deSelectData: (item: User) => void;
  handleGroupName: (text: string) => void;
  isCreate: boolean;
  handleIsCreate: () => void;
  createGroup: () => Promise<void>;
  groupName: string;
  selectedList: string[];
}

const useAddGroup = (): AddGroupHookReturnType => {
  const [userCount, setUserCount] = useState<number>(0);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleIsCreate = (): void => setIsCreate(!isCreate);

  const initData = async (): Promise<void> => {
    const userData = (
      await firestore().collection(firestoreConstant.users).get()
    ).docs.map(instance => instance.data());
    setData(userData as User[]);
  };

  const handleGroupName = (text: string): void => setGroupName(text.trim());

  const selectData = (item: User): void => {
    setSelectedList(prevItem => [...prevItem, item.id]);
    setUserCount(userCount + 1);
  };

  const deSelectData = (item: User): void => {
    setSelectedList(prevItem =>
      prevItem.filter(instance => item.id !== instance),
    );
    setUserCount(userCount - 1);
  };

  const createGroup = async (): Promise<void> => {
    const idList: Partial<Array<string>> = [
      ...selectedList,
      auth().currentUser?.uid,
    ];
    const docId: string = idList.sort().join('-');
    let docExist: boolean = false;
    await firestore()
      .collection(firestoreConstant.groupChat)
      .get()
      .then(querySnap =>
        querySnap.docs.map(instance => {
          if (instance.data()?.id === docId) {
            docExist = true;
          }
        }),
      );
    if (docExist) {
      handleIsCreate();
      setTimeout(() => {
        navigation.pop();
        Alert.alert(Strings.groupExist, Strings.messageInGroup);
      }, 100);
    } else {
      await firestore()
        .collection(firestoreConstant.groupChat)
        .add({
          members: idList,
          name: groupName,
          id: docId,
          timeStamp: Date.now(),
        })
        .then(() => {
          handleIsCreate();
          setTimeout(() => {
            navigation.pop();
          }, 100);
        })
        .catch(() => {
          Alert.alert(Strings.error, Strings.retry);
          navigation.pop();
        });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return {
    selectedList,
    groupName,
    handleGroupName,
    createGroup,
    handleIsCreate,
    isCreate,
    selectData,
    deSelectData,
    userCount,
    data,
  };
};

export default useAddGroup;
