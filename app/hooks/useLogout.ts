import auth from '@react-native-firebase/auth';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';
import {Routes, Strings} from '../constants';
import {killUser} from '../services';

export interface LogoutHookReturnType {
  logout: () => void;
}

const useLogout = (): LogoutHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const logoutFunction = async (): Promise<void> => {
    await killUser();
    await auth()
      .signOut()
      .then(() => navigation.reset({routes: [{name: Routes.login}], index: 0}))
      .catch(() => {
        Alert.alert(Strings.error, Strings.signInAgain);
        navigation.reset({routes: [{name: Routes.login}], index: 0});
      });
  };

  const logout = (): void => {
    Alert.alert(Strings.logout, Strings.confirmLogout, [
      {text: Strings.cancel},
      {onPress: logoutFunction, text: Strings.logout},
    ]);
  };

  return {
    logout,
  };
};

export default useLogout;
