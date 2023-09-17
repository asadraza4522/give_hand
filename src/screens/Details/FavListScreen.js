import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import Theme from '../../theme/theme';
import HomeHeader from '../../components/HomeHeader';
import ProductView1 from '../../components/ProductView1';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {useSelector} from 'react-redux';
import Color from '../../theme/color';

const FavListScreen = ({navigation}) => {
  const {height} = Dimensions.get('window');
  const likeProductsList = useSelector(state => state.main.likeProducts);
  console.log(
    '🚀 ~ file: FavListScreen.js:30 ~ FavListScreen ~ likeProductsList:',
    likeProductsList,
  );

  const renderProductList = ({index, item}) => (
    <ProductView1
      qtyLoading={true}
      index={index}
      key={item._id}
      data={item?.productID}
      navigation={navigation}
      type={1}
    />
  );

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <FlatList
        style={{flex: 1, marginHorizontal: '2%'}}
        numColumns={2}
        data={likeProductsList}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', height: height / 2}}>
            <Text
              style={{
                fontSize: 12,
                color: Color.neutralGray,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              There is Nothing To Show :(
            </Text>
          </View>
        }
        renderItem={renderProductList}
        showsVerticalScrollIndicator={false}
        // onEndReachedThreshold={0.4}
        // onEndReached={LoadMoreCards}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: '8%'},
  btnMainStyle: {...Theme.btnStyle, marginTop: '2%', marginBottom: '4%'},
  btnTxtStyle: {...Theme.btnTextstyle, paddingVertical: 10},
});

export default FavListScreen;
