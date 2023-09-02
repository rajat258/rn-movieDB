import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Routes} from '../constants';
import {getUser} from '../services';

const useSplash = (): void => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const initData = async (): Promise<void> => {
    if (await getUser()) {
      navigation.reset({routes: [{name: Routes.tab}], index: 0});
    } else {
      navigation.reset({routes: [{name: Routes.login}], index: 0});
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  };

  useEffect(() => {
    initData();
  }, []);
};

export default useSplash;
