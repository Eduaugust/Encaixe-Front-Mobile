import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/navigators/MainTab';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab></MainTab>
    </NavigationContainer>
  );
}

export default App;