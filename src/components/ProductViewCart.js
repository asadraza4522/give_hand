import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Theme from '../theme/theme';
import Color from '../theme/color';
import RNVICustom from '../utilies/RNVICustom';
import PlusMinusQty from './PlusMinusQty';
import {baseURL} from '../utilies/api/instance';
import {updateCartQty} from '../utilies/api/apiController';
import {get_data} from '../utilies/AsyncStorage/AsyncStorage';
import {useDispatch} from 'react-redux';
import {updateCartList, updateProductAllOver} from '../redux/MainSlice';
import Toast from 'react-native-simple-toast';
import Badge from './Badge';

const ProductViewCart = ({
  item,
  setLoading,
  navigation,
  mode,
  heart,
  index,
  cartList,
}) => {
  console.log(
    '🚀 ~ file: ProductViewCart.js:23 ~ cartList:',
    cartList?.products[index]?.productID?.productType === 'card',
    index,
    cartList?.products[index]?.cardItem,
  );
  let isCardType = cartList?.products[index]?.productID?.productType === 'card';
  let isCardTypeIndex =
    cartList?.products[index]?.productID?.productType === 'card' && index;
  const dispatch = useDispatch();

  const handleUpdateQty = async (productID, qty) => {
    setLoading(true);

    const userID = await get_data('@userData');

    const body = {
      user: userID.id,
      productID,
      qty,
    };

    const resp = await updateCartQty(body, navigation);

    if (resp?.data?.error === false) {
      dispatch(updateCartList({p_id: productID, q_ty: qty}));
      dispatch(updateProductAllOver({p_id: productID, q_ty: qty}));
      setLoading(false);
    } else {
      Toast.show(
        resp?.data?.message
          ? resp?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
      setLoading(false);
    }
  };

  return (
    <View style={Theme.ProductViewCartMain}>
      <Image
        resizeMode="center"
        style={Theme.ProductViewCartImage}
        source={{
          uri:
            item?.productID?.image !== undefined
              ? item?.productID?.image
              : baseURL + '/assets/noimage.png',
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.titleIconContainer}>
          <Text style={styles.itemText}>{item?.productID?.name}</Text>
          {!heart ? (
            <RNVICustom
              onPress={handleUpdateQty.bind(null, item?.productID?._id, 0)}
              Ccolor={Color.neutralGray}
              Cname={'trash'}
              Csize={24}
              Lib={'Octicons'}
            />
          ) : (
            // <RNVICustom onPress={()=>{}} Ccolor={Color.neutralGray} Cname={'hearto'} Csize={24} Lib={'AntDesign'} />
            <></>
          )}
        </View>
        <View style={styles.priceButtonContainer}>
          <Text style={styles.priceText}>
            Rs.{' '}
            {item?.productID?.discountPrice
              ? item?.productID?.discountPrice
              : item?.productID?.price
              ? item?.productID?.price
              : item?.price}
          </Text>
          {mode != 'view' && !isCardType && (
            <PlusMinusQty
              updateQty={handleUpdateQty}
              product={{_id: item?.productID?._id, cartQty: item?.cartQty}}
              BtnSize={0.6}
            />
          )}
        </View>
        {isCardType && (
          <View>
            <Text>
              Title :{' '}
              {cartList?.products[index]?.cardItem[isCardTypeIndex]?.title}
            </Text>
            <Text>Descp : {cartList?.products[index]?.cardItem[0]?.descp}</Text>
            <FlatList
              keyboardShouldPersistTaps="handled"
              style={{marginHorizontal: '3%'}}
              data={cartList?.products[index].cardItem[0]?.productID}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Badge
                  item={`${item?.name}\n${
                    item?.discountPrice ? item.discountPrice : item?.price
                  }`}
                  index={index}
                  showRemoveTag={false}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {...Theme.rowBetween, paddingHorizontal: '3%'},
  titleIconContainer: {...Theme.rowBetween, flexDirection: 'row'},
  itemText: {
    width: '90%',
    color: Color.headingColor,
    fontFamily: 'Metropolis-Medium',
    fontWeight: '700',
    fontSize: 12,
  },
  priceButtonContainer: {
    ...Theme.rowBetween,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {color: Color.ThemeColor, fontSize: 12, fontWeight: '700'},
});

export default ProductViewCart;
