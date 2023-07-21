import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {useApp} from './hooks';
import {NoInternet} from './modules';
import {AppNavigator} from './navigation';
import {store} from './redux';
import {AppStyle} from './theme';

const App = (): JSX.Element => {
  const {isConnectionAvailable, checkConnection} = useApp();

  return (
    <Provider store={store}>
      <SafeAreaView style={AppStyle.appContainer} />
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
