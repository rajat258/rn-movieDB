import firestore from '@react-native-firebase/firestore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Routes, Strings, firestoreConstant} from '../../constants';
import {getUser, killUser} from '../../services';
import type {User} from '../../type';

export interface ProfileHookReturnType {
  user?: Partial<User>;
}

const useProfile = (): ProfileHookReturnType => {
  const [user, setUser] = useState<Partial<User>>({});
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const initData = async (): Promise<void> => {
    const {id} = (await getUser()) as User;
    const firestoreUser = await firestore()
      .collection(firestoreConstant.users)
      .doc(id)
      .get();
    if (firestoreUser.data()) {
      setUser(firestoreUser.data() as User);
    } else {
      await killUser();
      Alert.alert(Strings.error, Strings.signInAgain);
      navigation.reset({routes: [{name: Routes.login}], index: 0});
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return {user};
};

export default useProfile;
