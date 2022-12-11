import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import Loading from './components/molecules/Loading';
import store from './redux/store';
import Router from './router';
import {Provider as PaperProvider} from 'react-native-paper';
function MainApp() {
  const GlobalState: any = useSelector(state => state);
  // LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreAllLogs();
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {GlobalState.loading && <Loading />}
    </>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <MainApp />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
