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
  ScrollView,
  FlatList,
} from 'react-native';
import Theme from '../../theme/theme';
import Color from '../../theme/color';
import RNVICustom from '../../utilies/RNVICustom';
import PlusMinusQty from '../../components/PlusMinusQty';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {baseURL} from '../../utilies/api/instance';
import {
  addCardToCartHome,
  addToCartHome,
  updateQty,
} from '../../utilies/api/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from '../../components/BottomSheet';
import CommentBottomSheet from '../../components/comment/CommentBottomSheet';
import CommentView from '../../components/comment/CommentView';
import {Btn} from '../../components/btn';
import {FormInput} from '../../components/FormInput';
import Toast from 'react-native-simple-toast';
import ViewUsers from '../Admin/Users/ViewUsers';
import Badge from '../../components/Badge';
import ViewProduct from '../Admin/Products/ViewProduct';

const CardDetails = ({route, navigation}) => {
  const CartProduct = useSelector(state => state.main.cartList);

  const {data, index, checkCart} = route.params;

  const [product, setProduct] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescp, setCardDescp] = useState('');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [errortext, setErrortext] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [searchModalVisible, setsearchModalVisible] = useState(false);
  const [working, setWorking] = useState('');

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
  const selectUser = (index, item) => {
    console.log('🚀 ~ file: CardDetails.js:67 ~ selectUser ~ item:', item);
    let result = user ? user._id == item._id : false;

    if (!result) {
      setUser(item);
    } else {
      Toast.show(`User ${item.name} Already selected`, Toast.SHORT);
    }

    setsearchModalVisible(false);
  };
  const RemoveProduct = index => {
    let array = [...products];
    array.splice(index, 1);
    setProducts(array);
  };

  const selectProduct = (index, item) => {
    console.log('🚀 ~ file: CardDetails.js:82 ~ selectProduct ~ item:', item);
    let productsTemp = [...products];

    let result = productsTemp.findIndex(val => val._id == item._id);

    if (result == -1) {
      setProducts([...products, item]);
    } else {
      Toast.show(`Product ${item.name} Already selected`, Toast.LONG);
    }
    setsearchModalVisible(false);
  };

  const handleAddToCart = ProID => {
    let productIDList =
      products?.length > 0
        ? products.map(item => {
            return item._id;
          })
        : [];
    console.log(
      '🚀 ~ file: CardDetails.js:102 ~ handleAddToCart ~ productIDList:',
      productIDList,
    );
    let tempProduct = Object.assign({}, product);
    tempProduct.title = cardTitle;
    tempProduct.descp = cardDescp;
    tempProduct.productIDList = productIDList;
    tempProduct.sendToUserId = user ? user._id : null;
    console.log(
      '🚀 ~ file: CardDetails.js:102 ~ handleAddToCart ~ tempProduct:',
      tempProduct,
    );
    addCardToCartHome(ProID, tempProduct, navigation, dispatch, index);
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

  const RemoveUser = index => {
    setUser();
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <ScrollView
        style={Theme.ScrollViewMargins}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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
            <FormInput
              Title={'Title :'}
              placeholder="Title to show on card"
              onChangeText={val => {
                setCardTitle(val);
                setErrortext('');
              }}
              textInputContainerStyle={Theme.InputView}
              style={Theme.TextInputStyle}
              containerStyle={Theme.TextInputContainer}
              placeholderTextColor={Color.AuthInputsPlaceholder}
              leftIcon={{
                family: 'MaterialCommunityIcons',
                name: 'charity',
                color: Color.neutralGray,
                size: 18,
              }}
              value={cardTitle}
              error={
                errortext === 'Please Enter Card Name'
                  ? 'Please Enter Card Name'
                  : null
              }
            />
            <FormInput
              Title={'Description :'}
              placeholder="Enter description to show on card"
              onChangeText={val => {
                setCardDescp(val);
                setErrortext('');
              }}
              textInputContainerStyle={Theme.InputView}
              style={Theme.TextInputStyle}
              containerStyle={Theme.TextInputContainer}
              placeholderTextColor={Color.AuthInputsPlaceholder}
              leftIcon={{
                family: 'MaterialCommunityIcons',
                name: 'charity',
                color: Color.neutralGray,
                size: 18,
              }}
              value={cardDescp}
              error={
                errortext === 'Please Enter Card Name'
                  ? 'Please Enter Card Name'
                  : null
              }
            />
            {user && (
              <View
                style={{
                  marginHorizontal: '3%',
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={Theme.FormInputTitle}>
                  {'Send donation to User : '}
                </Text>
                <Badge RemoveTag={RemoveUser} item={user?.name} index={0} />
              </View>
            )}
            {products?.length > 0 && (
              <View
                style={{
                  marginHorizontal: '3%',
                  marginTop: '3%',
                }}>
                <Text style={Theme.FormInputTitle}>
                  {'Send products to User : '}
                </Text>
              </View>
            )}
            <FlatList
              keyboardShouldPersistTaps="handled"
              style={{marginHorizontal: '3%'}}
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <Badge
                  RemoveTag={RemoveProduct}
                  item={item?.name}
                  index={index}
                />
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Btn
                onPress={() => {
                  setsearchModalVisible(true);
                  setWorking('product');
                }}
                text="Add Product"
                containerStyle={[styles.btnMainStyle]}
                textStyle={styles.btnTxtStyle}
              />
              <Btn
                onPress={() => {
                  setsearchModalVisible(true);
                  setWorking('user');
                }}
                text="Add User"
                containerStyle={[styles.btnMainStyle]}
                textStyle={styles.btnTxtStyle}
              />
            </View>
            <Btn
              onPress={() => handleAddToCart(product?._id)}
              text={product?.cartQty == 1 ? 'Added' : 'Add To Cart'}
              containerStyle={[styles.btnMainStyle, {marginHorizontal: '6%'}]}
              textStyle={styles.btnTxtStyle}
            />
            <BottomSheet
              width={'90%'}
              height={'80%'}
              middle
              modalVisible={searchModalVisible}
              setModalVisibility={setsearchModalVisible}>
              {working === 'user' ? (
                <ViewUsers getData={selectUser} HideBackground={false} />
              ) : (
                <ViewProduct getData={selectProduct} HideBackground={false} />
              )}
            </BottomSheet>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  btnMainStyle: {
    ...Theme.btnStyle,
    marginTop: '2%',
    marginBottom: '4%',
    minWidth: '40%',
  },
  btnTxtStyle: {
    ...Theme.btnTextstyle,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default CardDetails;
