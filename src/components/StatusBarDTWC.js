import React from 'react';
import {StatusBar} from 'react-native';

const StatusBarDTWC = ({Color}) => {
  return (
    <StatusBar
      barStyle={Color ? 'light-content' : 'dark-content'}
      backgroundColor={Color ? Color : 'white'}
    />
  );
};

export default StatusBarDTWC;
