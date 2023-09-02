import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncKeys} from '../constants';
import {User} from '../type';

/**
 * fetch ActiveUser
 * @returns {Promise<boolean | User>}
 * returns an Active user if Exist or returns false
 */
export const getUser = async (): Promise<boolean | User> => {
  const user = await AsyncStorage.getItem(AsyncKeys.user);
  if (user) {
    return JSON.parse(user);
  } else {
    return false;
  }
};

export const setUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(AsyncKeys.user, JSON.stringify(user));
};

/**
 * Kill only Async-Storage ActiveUser
 * @returns {Promise<void>}
 */
export const killUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncKeys.user);
};
