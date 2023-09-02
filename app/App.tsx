import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {AppHookReturnType, useApp} from './hooks';
import {NoInternet} from './modules';
import {AppNavigator} from './navigation';
import {store} from './redux';
import {AppStyle} from './theme';

const App = (): JSX.Element => {
  const {isConnectionAvailable, checkConnection}: AppHookReturnType = useApp();

  return (
    <Provider store={store}>
      <View style={AppStyle.container}>
        <StatusBar barStyle="light-content" />
        {isConnectionAvailable ? (
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        ) : (
          <NoInternet {...{checkConnection}} />
        )}
      </View>
    </Provider>
  );
};

export default App;
