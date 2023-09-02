import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export interface AppHookReturnType {
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
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnection(state.isConnected as boolean);
    });
    unsubscribe();
  }, []);

  return {
    isConnectionAvailable,
    checkConnection,
  };
};

export default useApp;
