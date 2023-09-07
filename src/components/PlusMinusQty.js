import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';
import {Btn} from './btn';

const PlusMinusQty = ({
  BtnSize,
  style,
  product,
  addToCart,
  updateQty,
  cartAdd,
  loading,
}) => {
  return (
    <>
      {product?.cartQty && product?.cartQty != 0 ? (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            Theme.PlusMinusMainStyle,
            BtnSize && {flex: BtnSize},
            style && style,
          ]}>
          <Text
            onPress={
              updateQty &&
              updateQty.bind(this, product?._id, product?.cartQty - 1)
            }
            style={{...Theme.PlusMinusBtnSt}}>
            -
          </Text>

          {loading ? (
            <ActivityIndicator animating={true} color={Color.ThemeColor} />
          ) : (
            <Text style={styles.QtyTextStyle}>{product?.cartQty}</Text>
          )}

          <Text
            onPress={
              updateQty &&
              updateQty.bind(this, product?._id, product?.cartQty + 1)
            }
            style={{...Theme.PlusMinusBtnSt}}>
            +
          </Text>
        </TouchableOpacity>
      ) : (
        <Btn
          onPress={addToCart?.bind(null, product?._id)}
          text={cartAdd ? '+' : 'Add To Cart'}
          containerStyle={[
            styles.btnContainer,
            BtnSize && {flex: BtnSize},
            style && style,
            cartAdd && {width: '20%', alignSelf: 'flex-end'},
          ]}
          textStyle={styles.btnTextStyle}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    ...Theme.PlusMinusMainStyle,
    marginTop: '3%',
    marginHorizontal: 0,
    backgroundColor: Color.ThemeColor,
    justifyContent: 'center',
    elevation: 5,
  },
  btnTextStyle: {...Theme.btnTextstyle, paddingVertical: 3, fontSize: 12},
  QtyTextStyle: {
    ...Theme.PlusMinusBtnSt,
    backgroundColor: Color.ThemeColor,
    elevation: 5,
    color: 'white',
  },
});

export default PlusMinusQty;
