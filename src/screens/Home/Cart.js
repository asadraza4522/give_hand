import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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
import {
  deleteUserCart,
  getProductsCart,
  updateDonation,
} from '../../utilies/api/apiCalls';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {cleanHomeCardQty, cleanHomeProductQty} from '../../redux/MainSlice';
import Loader from '../../components/Loader';
import {DonationList} from '../../utilies/Constants';
import {WP} from '../../utilies/responsives/responsive';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(state => state.main.cartList);
  console.log('🚀 ~ file: Cart.js:29 ~ Cart ~ cartProducts:', cartProducts);

  const [loading, setLoading] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
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

  const handleOnDonationPress = async item => {
    console.log('🚀 ~ file: Cart.js:92 ~ handleOnDonationPress ~ item:', item);
    if (selectedDonation && item.id === selectedDonation?.id) {
      setSelectedDonation(null);
      await updateDonation(0, navigation, dispatch, setLoading);
    } else {
      setSelectedDonation(item);
      await updateDonation(item?.amount, navigation, dispatch, setLoading);
    }
  };
  const setDonationAmount = value => {
    const item = DonationList.find(val => val.amount === value);
    console.log('🚀 ~ file: Cart.js:107 ~ setDonationAmount ~ item:', item);
    setSelectedDonation(item);
  };

  useEffect(() => {
    if (
      cartProducts?.products !== undefined &&
      cartProducts?.products?.length !== 0 &&
      cartProducts?.donationAmount
    ) {
      setDonationAmount(cartProducts?.donationAmount);
    }
  }, [cartProducts]);

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
      {cartProducts?.products?.length !== 0 && cartProducts?.products && (
        <View style={Theme.GeneralBorder}>
          <RowText first={'Add Donation'} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DonationList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.donationItem,
                  {
                    backgroundColor:
                      selectedDonation?.id === item.id
                        ? Color.ThemeColor
                        : 'transparent',
                  },
                ]}
                key={item.id}
                onPress={() => handleOnDonationPress(item)}>
                <Text
                  style={{
                    color:
                      selectedDonation?.id === item.id
                        ? Color.white
                        : Color.black,
                  }}>
                  {item.amount}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <BorderBox>
        {selectedDonation && (
          <RowText
            first={'Added Donation Amount'}
            second={selectedDonation?.amount}
          />
        )}
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
  donationItem: {
    padding: WP(2),
    width: WP(15),
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: WP(2),
    elevation: 5,
    borderWidth: 1,
    borderColor: Color.ThemeColor,
  },
});

export default Cart;
