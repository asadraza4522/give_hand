import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Color from '../theme/color';
import Theme from '../theme/theme';
import RNVICustom from '../utilies/RNVICustom';
import Toast from 'react-native-simple-toast';

const LikeBtn = ({
  BtnSize,
  style,
  product,
  onPress,
  onBtnPress,
  loading,
  isLiked,
}) => {
  return (
    <>
      {
        <TouchableOpacity
          activeOpacity={1}
          style={[BtnSize && {flex: BtnSize}, style && style]}>
          <RNVICustom
            onPress={onBtnPress && onBtnPress.bind(this, product?._id)}
            Lib={'MaterialCommunityIcons'}
            style={{}}
            Cname={'heart-circle-outline'}
            Csize={30}
            Ccolor={isLiked ? Color.heart : Color.offWhite}
          />

          {/* <Text
            onPress={
              updateQty &&
              updateQty.bind(this, product?._id, product?.cartQty + 1)
            }
            style={{...Theme.PlusMinusBtnSt}}>
            +
          </Text> */}
        </TouchableOpacity>
      }
    </>
  );
};

const styles = StyleSheet.create({});

export default LikeBtn;
