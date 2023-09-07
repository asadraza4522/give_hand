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
import SliderCarousal from '../../components/Carousal';
import MenuHeader from '../../utilies/MenuHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconText from '../../components/IconText';
import ProductView1 from '../../components/ProductView1';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCardsUser,
  getLikeProducts,
  getProductsUser,
} from '../../utilies/api/apiCalls';
import Loader from '../../components/Loader';
import Color from '../../theme/color';
import {createStripeAccount} from '../../utilies/api/apiController';
import {Btn} from '../../components/btn';

const CardListScreen = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const homeCards = useSelector(state => state.main.homeCard);
  const dispatch = useDispatch();

  const renderProductList = ({index, item}) => (
    <ProductView1
      qtyLoading={true}
      index={index}
      key={item._id}
      data={item}
      navigation={navigation}
      type={2}
    />
  );

  const renderListHeader = () => (
    <>
      <MenuHeader
        style={{marginHorizontal: '2%', marginTop: 20}}
        first={'Donation Cards'}
      />
    </>
  );

  const LoadMoreCards = () => {
    if (homeCards.page <= homeCards.totalPages) {
      getCardsUser(navigation, homeCards.page + 1, '', dispatch);
      getLikeProducts(navigation, '', dispatch);
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <HomeHeader Component={Text} navigation={navigation} />

      <FlatList
        ListHeaderComponent={renderListHeader()}
        style={{flex: 1, marginHorizontal: '2%'}}
        numColumns={2}
        data={homeCards.docs}
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
        onEndReachedThreshold={0.4}
        onEndReached={LoadMoreCards}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: '8%'},
  btnMainStyle: {...Theme.btnStyle, marginTop: '2%', marginBottom: '4%'},
  btnTxtStyle: {...Theme.btnTextstyle, paddingVertical: 10},
});

export default CardListScreen;
