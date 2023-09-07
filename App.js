import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/navigation/index'
import store from './src/redux/Store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>

  );
}

export default App;
