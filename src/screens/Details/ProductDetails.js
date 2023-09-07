import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Theme from '../../theme/theme';
import Color from '../../theme/color';
import RNVICustom from '../../utilies/RNVICustom';
import PlusMinusQty from '../../components/PlusMinusQty';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {baseURL} from '../../utilies/api/instance';
import {addToCartHome, updateQty} from '../../utilies/api/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from '../../components/BottomSheet';
import CommentBottomSheet from '../../components/comment/CommentBottomSheet';
import CommentView from '../../components/comment/CommentView';

const ProductDetails = ({route, navigation}) => {
  const CartProduct = useSelector(state => state.main.cartList);

  const {data, index, checkCart} = route.params;

  const [product, setProduct] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);

  useEffect(() => {
    let Product = Object.assign({}, data);

    if (checkCart) {
      for (let index = 0; index < CartProduct?.products?.length; index++) {
        if (CartProduct.products[index].productID._id == Product._id) {
          Product.cartQty = CartProduct.products[index].cartQty;
          break;
        }
      }
    }

    setProduct(Product);
  }, []);

  let dispatch = useDispatch();

  const getPercentage = (price, discount) => {
    let percentage = 0;

    if (price != 0 && (discount !== undefined || discount != 0)) {
      percentage = (((price - discount) / price) * 100).toFixed(0);

      return percentage + '% Off';
    }
  };

  const handleAddToCart = ProID => {
    let tempProduct = Object.assign({}, product);
    addToCartHome(ProID, product, navigation, dispatch, index);
    tempProduct.cartQty = 1;
    setProduct(tempProduct);

    if (index == undefined) {
      data.cartQty = 1;
    }
  };

  const handleUpdateQty = (ProID, qty) => {
    let tempProduct = Object.assign({}, product);

    updateQty(ProID, qty, product, navigation, dispatch, index);
    tempProduct.cartQty = qty;
    setProduct(tempProduct);

    if (index == undefined) {
      data.cartQty = qty;
    }
  };

  const handleOnCommentPress = () => {
    setShowCommentModal(!showCommentModal);
    navigation.navigate('CommentView', {productID: product._id});
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.Imagestyle}>
          <Image
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
            source={{
              uri:
                product?.image !== undefined
                  ? product.image
                  : baseURL + '/assets/noimage.png',
            }}
          />
        </View>
        <View style={{marginHorizontal: '4%', flex: 1}}>
          <View style={Theme.TitleContainer}>
            <Text numberOfLines={2} style={Theme.ProdetailsTitlte}>
              {product.name}
            </Text>
            <RNVICustom
              onPress={handleOnCommentPress}
              style={{}}
              Lib={'MaterialIcons'}
              Cname={'insert-comment'}
              Csize={23}
              Ccolor={Color.ThemeColor}
            />
          </View>

          <Text style={{...styles.MainPrice, height: null}}>
            Rs.{' '}
            {product?.discountPrice ? product.discountPrice : product?.price}
          </Text>
          {product.discountPrice && (
            <Text style={styles.margin5}>
              <Text style={{...Theme.ProductView1OrignalPrice, fontSize: 12}}>
                Rs. {product?.price}
              </Text>
              <Text style={{...Theme.ProductView1Percent, fontSize: 12}}>
                {' '}
                {getPercentage(product?.price, product?.discountPrice)}
              </Text>
            </Text>
          )}
          <PlusMinusQty
            updateQty={handleUpdateQty}
            addToCart={handleAddToCart}
            style={Theme.AddCartProDetails}
            product={product}
          />
        </View>
        {/* <CommentBottomSheet
          width={'100%'}
          height={'70%'}
          modalVisible={showCommentModal}
          setModalVisibility={setShowCommentModal}>
          <CommentView productID={product._id} navigation={navigation} />
        </CommentBottomSheet> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Imagestyle: {
    flex: 1,
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
  MainPrice: {
    ...Theme.ProductView1Title,
    marginTop: 10,
    color: Color.ThemeColor,
    fontSize: 18,
  },
  margin5: {
    marginTop: 5,
  },
});

export default ProductDetails;
