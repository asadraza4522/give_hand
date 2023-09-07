import React from 'react';
import {SafeAreaView} from 'react-native';
import CreateViewTabs from '../../../components/CreateViewTabs';
import Theme from '../../../theme/theme';
import CreateUsers from './CreateUsers';
import ViewUsers from './ViewUsers';

const AUsers = ({navigation}) => {
  const routeData = {
    firstComp: ViewUsers,
    firstTitle: 'Users',
    secondComp: CreateUsers,
    secondTitle: 'Add Users',
  };

  return (
    <SafeAreaView style={Theme.containerOffWhite}>
      <CreateViewTabs navigation={navigation} routeData={routeData} />
    </SafeAreaView>
  );
};

export default AUsers;
