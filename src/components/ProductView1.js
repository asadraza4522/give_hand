import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Theme from '../theme/theme';
import Color from '../theme/color';
import PlusMinusQty from './PlusMinusQty';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {baseURL} from '../utilies/api/instance';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCartHome,
  likeProducts,
  unLikeProducts,
  updateQty,
} from '../utilies/api/apiCalls';
import {updateProductAllOver, setHomeLoader} from '../redux/MainSlice';
import LikeBtn from './LikeBtn';

const ProductView1 = ({
  navigation,
  data,
  index,
  addToCart,
  updateQtyFun,
  qtyLoading,
  type = 1,
}) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  console.log('isLiked', isLiked);
  const likeProductsList = useSelector(state => state.main.likeProducts);

  let dispatch = useDispatch();

  const moveToDetails = () => {
    type == 1
      ? navigation.navigate('ProductDetails', {data: data, index: index})
      : navigation.navigate('CardDetails', {data: data, index: index});
  };

  const getPercentage = (price, discount) => {
    let percentage = 0;

    if (price != 0 && (discount !== undefined || discount != 0)) {
      percentage = (((price - discount) / price) * 100).toFixed(0);

      return percentage + '% Off';
    }
  };

  const handleAddToCart = async ProID => {
    if (index !== undefined) {
      const results = await addToCartHome(
        ProID,
        data,
        navigation,
        dispatch,
        index,
      );

      if (results === 'Product Already Exists!') {
        dispatch(updateProductAllOver({p_id: ProID}));
        dispatch(setHomeLoader(false));
      }
    }
  };

  const handleUpdateQty = (ProID, qty) => {
    updateQty(ProID, qty, data, navigation, dispatch, index, setLoading);
  };
  const onHandleLikeClick = async ProID => {
    if (index !== undefined) {
      if (isLiked) {
        let findValue = likeProductsList.find(item => item.productID === ProID);
        const results = await unLikeProducts(
          findValue,
          navigation,
          dispatch,
          index,
        );
      } else {
        const results = await likeProducts(ProID, navigation, dispatch, index);
      }
    }
  };

  useEffect(() => {
    console.log('likeProducts', likeProductsList);
    if (likeProductsList && likeProductsList.length > 0) {
      let findValue = likeProductsList.findIndex(
        item => item.productID === data._id,
      );
      setIsLiked(findValue > -1 ? true : false);
    } else {
      setIsLiked(false);
    }
  }, [likeProductsList]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={moveToDetails}
      style={Theme.ProductView1Container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={Theme.ProductView1Image}
          source={{
            uri:
              data?.image !== undefined
                ? data.image
                : baseURL + '/assets/noimage.png',
          }}
        />
      </View>
      <View style={Theme.ProductView1Like}>
        <LikeBtn
          product={data}
          loading={loading}
          onBtnPress={onHandleLikeClick}
          isLiked={isLiked}
        />
      </View>
      <View style={styles.productBody}>
        <Text numberOfLines={2} style={{...Theme.ProductView1Title}}>
          {data.name}
        </Text>
        <Text style={{...styles.MainPrice, height: null}}>
          Rs. {data.discountPrice ? data.discountPrice : data?.price}{' '}
          {data?.discountPrice !== undefined && data?.discountPrice !== 0 && (
            <Text>
              <Text style={{...Theme.ProductView1OrignalPrice}}>
                {data?.price}
              </Text>
              <Text style={{...Theme.ProductView1Percent}}>
                {' '}
                {getPercentage(data?.price, data?.discountPrice)}
              </Text>
            </Text>
          )}
        </Text>
        {type == 1 && (
          <PlusMinusQty
            loading={loading}
            cartAdd
            product={data}
            updateQty={updateQtyFun ? updateQtyFun : handleUpdateQty}
            addToCart={addToCart ? addToCart : handleAddToCart}
            style={styles.margin5}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {width: '100%', height: hp('14%')},
  MainPrice: {
    ...Theme.ProductView1Title,
    marginTop: 10,
    color: Color.ThemeColor,
  },
  margin5: {
    marginTop: 5,
  },
  productBody: {padding: '4%'},
});

export default ProductView1;
