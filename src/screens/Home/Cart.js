import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Theme from '../../theme/theme';
import ProductViewCart from '../../components/ProductViewCart';
import {Btn} from '../../components/btn';
import Color from '../../theme/color';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {useDispatch, useSelector} from 'react-redux';
import BorderBox from '../../components/BorderBox';
import RowText from '../../utilies/RowText';
import {fonts} from '../../theme/fonts';
import AlertBox from '../../components/AlertBox';
import {deleteUserCart, getProductsCart} from '../../utilies/api/apiCalls';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {cleanHomeCardQty, cleanHomeProductQty} from '../../redux/MainSlice';
import Loader from '../../components/Loader';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(state => state.main.cartList);
  console.log('🚀 ~ file: Cart.js:29 ~ Cart ~ cartProducts:', cartProducts);

  const [loading, setLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  let billDetails = {
    id: 1,
    title: `Items (${cartProducts?.products?.length || 0})`,
    amt: 'Rs. ' + (cartProducts?.amount || 0),
  };

  const renderProductList = ({index, item}) => (
    <ProductViewCart
      navigation={navigation}
      setLoading={setLoading}
      item={item}
      index={index}
      cartList={cartProducts}
    />
  );

  const deleteCartUser = async () => {
    const user = await get_data('@userData');

    setLoading(true);
    setDeleteAlert(false);

    try {
      if (await deleteUserCart(navigation)) {
        if (await getProductsCart(navigation, user.id, dispatch)) {
          dispatch(cleanHomeProductQty());
          dispatch(cleanHomeCardQty());
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        cartProducts?.products !== undefined &&
        cartProducts?.products?.length !== 0 ? (
          <Text
            onPress={() => {
              setDeleteAlert(true);
            }}
            style={Theme.CartDeleteBtn}>
            Delete Cart
          </Text>
        ) : null,
    });
  }, [navigation, cartProducts]);

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={loading} />

      {cartProducts?.products?.length !== 0 && cartProducts?.products ? (
        <FlatList
          style={{flex: 1}}
          data={cartProducts?.products}
          renderItem={renderProductList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../assets/emptyCart.png')}
            resizeMode="center"
            style={{alignSelf: 'center'}}
          />
        </View>
      )}

      <BorderBox>
        <RowText first={billDetails?.title} second={billDetails?.amt} />
      </BorderBox>

      <Btn
        onPress={() => {
          cartProducts?.products?.length != 0 &&
            cartProducts?.products &&
            navigation.navigate('ShippingDetails');
        }}
        text="Check Out"
        containerStyle={[
          styles.btnMainStyle,
          cartProducts?.products?.length != 0 &&
            cartProducts?.products == undefined && {
              backgroundColor: 'darkgrey',
              borderColor: 'darkgrey',
            },
        ]}
        textStyle={styles.btnTxtStyle}
      />
      <AlertBox
        heading={'Delete User Cart'}
        DoneFun={deleteCartUser}
        cancelFun={() => setDeleteAlert(false)}
        detail={'Are you sure you want to delete cart?'}
        visible={deleteAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnMainStyle: {...Theme.btnStyle, marginTop: '2%', marginBottom: '4%'},
  btnTxtStyle: {...Theme.btnTextstyle, paddingVertical: 10},
});

export default Cart;
