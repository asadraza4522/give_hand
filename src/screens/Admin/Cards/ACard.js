import React from 'react';
import {SafeAreaView} from 'react-native';
import CreateViewTabs from '../../../components/CreateViewTabs';
import Theme from '../../../theme/theme';
import CreateCard from './CreateCard';
import ViewCard from './ViewCard';

const ACard = ({navigation}) => {
  const routeData = {
    firstComp: ViewCard,
    firstTitle: 'Cards',
    secondComp: CreateCard,
    secondTitle: 'Add Card',
  };

  return (
    <SafeAreaView style={Theme.containerOffWhite}>
      <CreateViewTabs navigation={navigation} routeData={routeData} />
    </SafeAreaView>
  );
};

export default ACard;
