import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Platform,
  Linking,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import BorderBox from '../../components/BorderBox';
import {Btn} from '../../components/btn';
import {FormInput} from '../../components/FormInput';
import Loader from '../../components/Loader';
import ProductViewCart from '../../components/ProductViewCart';
import Color from '../../theme/color';
import Theme from '../../theme/theme';
import {updateOrderStatusApi} from '../../utilies/api/apiController';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import MenuHeader from '../../utilies/MenuHeader';
import RowText from '../../utilies/RowText';

const OrderDetails = ({navigation, route}) => {
  const {item, index, back, type} = route.params;
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [StatusList, setStatusList] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [ActiveStatusList, setActiveStatusList] = useState([]);
  // setProducts(item?.sellers?.filter(e => e?.seller_id == id)[0]?.products)

  const getUser = async () => {
    const user = await get_data('@userData');
    console.log(user);
    FillStatusList(user);
    setUser(user);
    getProducts(user);
  };

  const FillStatusList = ({id}) => {
    const status = item?.sellers?.filter(e => e?.seller_id == id)[0]?.status;
    setStatus(status);
    if (status === 'Pending Approval') {
      setActiveStatusList(['Order Confirmed', 'Cancel']);
    } else if (status === 'Order Confirmed') {
      setActiveStatusList(['Shipping', 'Cancel']);
    } else if (status === 'Shipping') {
      setActiveStatusList(['Complete', 'Cancel']);
    }
  };

  const getProducts = ({id}) => {
    if (type == 'seller') {
      setProducts(item?.sellers?.filter(e => e?.seller_id == id)[0]?.products);
    } else {
      let newProducts = [];
      for (let index = 0; index < item?.sellers.length; index++) {
        const element = item?.sellers[index];
        if (element.products) {
          newProducts = [...newProducts, ...element.products];
        }
      }
      setProducts(newProducts);
    }
  };

  const updateOrderStatus = async () => {
    setLoading(true);

    const users = {
      status: orderStatus,
      id: item?._id,
    };

    const resp = await updateOrderStatusApi(users, navigation);

    if (resp?.data?.error === false) {
      Toast.show('Status Updated', Toast.SHORT);
      setLoading(false);

      let indexSeller = null;

      for (let index = 0; index < item?.sellers?.length; index++) {
        const element = item?.sellers?.[index];
        if (element?.seller_id == user.id) {
          indexSeller = index;
        }
      }

      item.sellers[indexSeller] = {
        ...item.sellers[indexSeller],
        status: orderStatus,
      };

      back
        ? navigation.navigate(back, {item: item, index: index, type: type})
        : navigation.navigate('AHome', {item: item, index: index});
    } else {
      Toast.show(
        resp?.response?.data?.message
          ? resp?.response?.data?.message
          : resp.message
          ? resp.message
          : 'Something Went Wrong!',
        Toast.SHORT,
      );
      setLoading(false);
    }
  };

  const openMap = () => {
    if (item?.location != '') {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${item?.location?.coords?.latitude},${item?.location?.coords?.longitude}`;
      const label = 'Order Delievery Location';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.openURL(url);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={Theme.container}>
      <Loader animating={loading} />
      {user.type == 'seller' && status != 'Complete' ? (
        <>
          <MenuHeader
            first={'Order Status'}
            second={status}
            style={styles.marginsCustom}
          />
          <View style={{flexDirection: 'row', zIndex: 1}}>
            <FormInput
              ListData={StatusList}
              Component={Text}
              placeholder="Update Order Status"
              onPress={() => {
                setStatusList(StatusList.length > 0 ? [] : ActiveStatusList);
              }}
              ListOnPress={data => {
                setStatusList([]);
                setOrderStatus(data);
              }}
              textInputContainerStyle={Theme.InputView}
              style={Theme.TextInputStyle}
              containerStyle={{...Theme.TextInputContainer, flex: 1}}
              placeholderTextColor={Color.AuthInputsPlaceholder}
              leftIcon={{
                family: 'MaterialIcons',
                name: 'shopping-bag',
                color: Color.neutralGray,
                size: 18,
              }}
              value={orderStatus}
            />
            <Btn
              text="Update"
              onPress={() => {
                orderStatus != '' && updateOrderStatus();
              }}
              containerStyle={[
                styles.UpdateBtn,
                orderStatus == '' && {
                  backgroundColor: 'lightgrey',
                  borderColor: 'lightgrey',
                },
              ]}
              textStyle={styles.UpdateText}
            />
          </View>
        </>
      ) : (
        <MenuHeader
          first={'Progress'}
          second={status}
          style={styles.marginsCustom}
        />
      )}

      <View style={Theme.DashedBorder} />
      <MenuHeader
        first={`Products (${products?.length})`}
        style={styles.marginsCustom}
      />

      <FlatList
        style={{maxHeight: '40%', flexGrow: 0, marginVertical: '2%'}}
        data={products}
        renderItem={({item, index}) => (
          <ProductViewCart item={item} heart mode={'view'} />
        )}
      />

      <MenuHeader
        first={'Shipping Details'}
        style={styles.marginsCustom}
        secOnPress={openMap}
        second={
          user.type == 'admin' && item.location != ''
            ? 'See Map Location'
            : null
        }
      />

      <BorderBox>
        <RowText
          first={'Date Time'}
          second={new Date(item?.createdAt).toString().split('G')[0]}
        />
        <RowText first={'Phone #'} second={item?.mobile} />
        <RowText first={'Address'} second={item?.address} />
      </BorderBox>

      <MenuHeader first={'Shipping Details'} style={styles.marginsCustom} />
      <BorderBox>
        <RowText
          first={`Items (${item?.total_items})`}
          second={`Rs. ${item?.amount}`}
        />
        <RowText first={'Shipping'} second={0} />
        <View style={Theme.DashedBorder} />
        <MenuHeader
          first={'Total Price'}
          second={`Rs. ${item?.amount}`}
          style={{marginTop: '4%'}}
        />
      </BorderBox>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  marginsCustom: {marginHorizontal: '4.2%', marginTop: '2%'},
  UpdateText: {
    ...Theme.btnTextstyle,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  UpdateBtn: {...Theme.btnStyle, marginTop: 0, alignSelf: 'center'},
});

export default OrderDetails;
