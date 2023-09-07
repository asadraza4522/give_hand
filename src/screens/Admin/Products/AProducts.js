import React from 'react';
import {SafeAreaView} from 'react-native';
import CreateViewTabs from '../../../components/CreateViewTabs';
import Theme from '../../../theme/theme';
import CreateProduct from './CreateProduct';
import ViewProduct from './ViewProduct';

const AProducts = ({navigation}) => {
  const routeData = {
    firstComp: ViewProduct,
    firstTitle: 'Products',
    secondComp: CreateProduct,
    secondTitle: 'Add Product',
  };

  return (
    <SafeAreaView style={Theme.containerOffWhite}>
      <CreateViewTabs navigation={navigation} routeData={routeData} />
    </SafeAreaView>
  );
};

export default AProducts;
