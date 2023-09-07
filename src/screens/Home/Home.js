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
import {getLikeProducts, getProductsUser} from '../../utilies/api/apiCalls';
import Loader from '../../components/Loader';
import Color from '../../theme/color';
import {createStripeAccount} from '../../utilies/api/apiController';

const Home = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const homeProducts = useSelector(state => state.main.homeProducts);
  const homeLoader = useSelector(state => state.main.homeLoader);

  const dispatch = useDispatch();

  const renderProductList = ({index, item}) => (
    <ProductView1
      qtyLoading={true}
      index={index}
      key={item._id}
      data={item}
      navigation={navigation}
    />
  );

  React.useEffect(() => {
    // testing();
  }, []);

  const testing = async () => {
    const resposne = await createStripeAccount(navigation);
    console.log(resposne, 'adkadiaodaikdoadkoakdoakd');
  };
  const renderListHeader = () => (
    <>
      <SliderCarousal size={hp('15%')} />

      <MenuHeader
        style={{marginHorizontal: '2%', marginTop: 20}}
        first={'Flash Sale'}
      />
    </>
  );

  const LoadMoreProducts = () => {
    if (homeProducts.page <= homeProducts.totalPages) {
      getProductsUser(navigation, homeProducts.page + 1, '', dispatch);
      getLikeProducts(navigation, '', dispatch);
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={homeLoader} />
      <HomeHeader Component={Text} navigation={navigation} />

      <FlatList
        ListHeaderComponent={renderListHeader()}
        style={{flex: 1, marginHorizontal: '2%'}}
        numColumns={2}
        data={homeProducts.docs}
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
        onEndReached={LoadMoreProducts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topMargin: {marginTop: '8%'},
});

export default Home;
