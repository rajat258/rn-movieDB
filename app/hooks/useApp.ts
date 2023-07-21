import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

interface AppHookReturnType {
  isConnectionAvailable: boolean;
  checkConnection: () => void;
}

const useApp = (): AppHookReturnType => {
  const [isConnectionAvailable, setIsConnectionAvailable] =
    useState<boolean>(true);

  const handleConnection = (val: boolean): void =>
    setIsConnectionAvailable(val);

  const checkConnection = (): void => {
    NetInfo.addEventListener(state => {
      handleConnection(state.isConnected as boolean);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnection(state.isConnected as boolean);
    });

    // Unsubscribe
    unsubscribe();
  }, []);

  return {
    isConnectionAvailable,
    checkConnection,
  };
};

export default useApp;
