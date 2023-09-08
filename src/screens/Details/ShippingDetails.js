import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Btn} from '../../components/btn';
import {FormInput} from '../../components/FormInput';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Color from '../../theme/color';
import {fonts} from '../../theme/fonts';
import Theme from '../../theme/theme';
import Toast from 'react-native-simple-toast';
import {
  creteOrderApi,
  getUserInfo,
  EditUserApi,
} from '../../utilies/api/apiController';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {getProductsCart, getProductsUser} from '../../utilies/api/apiCalls';
import {useDispatch} from 'react-redux';
import {clearHomeCard, clearHomeProduct} from '../../redux/MainSlice';
import RNVICustom from '../../utilies/RNVICustom';
import {hasLocationPermission} from '../../utilies/Location';
import Geolocation from 'react-native-geolocation-service';
import Loader from '../../components/Loader';

const ShippingDetails = ({navigation}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [createShipping, setCreateShipping] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [location, setLocation] = useState('');

  const UpdateAddress = async () => {
    setLoading(true);

    let user_data = await get_data('@userData');
    let previousAddress = addressList;

    previousAddress.unshift({mobile: phone, address: address});

    let body = {
      id: user_data.id,
      userData: {
        address: previousAddress,
      },
    };

    const resp = await EditUserApi(body, navigation);

    if (resp?.data.error === false) {
      console.log(resp?.data);
      Toast.show('Address Added', Toast.SHORT);
      setLoading(false);
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

  const getAddress = async () => {
    setLoading(true);

    let user_data = await get_data('@userData');

    let resp = await getUserInfo(navigation, user_data.id);

    if (resp?.data.error === false) {
      setAddressList(resp?.data?.data?.address);

      resp?.data?.data?.address.length == 1 && setSelected(0);

      setLoading(false);
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

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeTabs'}],
    });
  };

  const createOrder = async () => {
    if (selected == -1) {
      Toast.show('Please Choose Address', Toast.SHORT);
    } else {
      let user_data = await get_data('@userData');

      let body = {
        userID: user_data.id,
        address: addressList[selected].address,
        mobile: addressList[selected].mobile,
        location: location,
      };

      setLoading(true);
      let resp = await creteOrderApi(body, navigation);
      if (resp?.data?.error === false) {
        console.log(resp.data, 'adadanidajidjaidjaid');
        dispatch(clearHomeProduct());
        dispatch(clearHomeCard());
        getProductsCart(navigation, user_data.id, dispatch);
        if (getProductsUser(navigation, 1, '', dispatch)) {
          setLoading(false);

          if (resp.data.data?.payment == false) {
            navigation.navigate('CardPayment', {
              order_id: resp.data?.data?._id,
            });
          } else {
            setSuccessModal(true);
          }
        }
      } else {
        dispatch(clearHomeProduct());
        dispatch(clearHomeCard());
        getProductsCart(navigation, user_data.id, dispatch);
        setLoading(false);
        Toast.show(
          resp?.data?.message
            ? resp?.data?.message
            : resp.message
            ? resp.message
            : 'Something Went Wrong!',
          Toast.SHORT,
        );
        if (getProductsUser(navigation, 1, '', dispatch)) {
          goToHome();
        }
      }
    }
  };

  const getCurrentLocation = async () => {
    if (await hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
        },
        error => {
          console.log(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    getAddress();

    setTimeout(() => {
      getCurrentLocation();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={loading} />

      {!createShipping && (
        <Btn
          onPress={() => setCreateShipping(true)}
          text="Add New Shpping "
          containerStyle={{
            ...styles.btnMainStyle,
            marginTop: '5%',
            marginVertical: 0,
          }}
          textStyle={styles.btnTxtStyle}
        />
      )}

      {createShipping && (
        <>
          <Text style={styles.topHeading}>Add New Shipping</Text>
          <FormInput
            placeholder="Phone Number / Mobile"
            textInputContainerStyle={Theme.InputView}
            style={[Theme.TextInputStyle]}
            containerStyle={Theme.TextInputContainer}
            placeholderTextColor={Color.AuthInputsPlaceholder}
            leftIcon={{
              family: 'AntDesign',
              name: 'mobile1',
              color: Color.neutralGray,
              size: 18,
            }}
            onChangeText={data => {
              setPhone(data);
            }}
            value={phone}
            // error={errortext === 'Please Enter UserName' ? 'Please Enter UserName' : errortext === 'Email format is invalid' ? 'Email format is invalid' : null}
          />

          <FormInput
            placeholder="Address"
            textInputContainerStyle={Theme.InputView}
            style={Theme.TextInputStyle}
            containerStyle={Theme.TextInputContainer}
            placeholderTextColor={Color.AuthInputsPlaceholder}
            leftIcon={{
              family: 'AntDesign',
              name: 'home',
              color: Color.neutralGray,
              size: 18,
            }}
            multiline
            onChangeText={data => {
              setAddress(data);
            }}
            value={address}
            // error={errortext === 'Please Enter UserName' ? 'Please Enter UserName' : errortext === 'Email format is invalid' ? 'Email format is invalid' : null}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Btn
              onPress={() => setCreateShipping(false)}
              text="Cencel "
              containerStyle={{
                ...styles.btnMainStyle,
                marginTop: '1%',
                marginVertical: 0,
                flex: 1,
                backgroundColor: 'lightgrey',
                borderColor: 'lightgrey',
              }}
              textStyle={styles.btnTxtStyle}
            />
            <Btn
              onPress={UpdateAddress}
              text="Create "
              containerStyle={{
                ...styles.btnMainStyle,
                marginTop: '1%',
                marginVertical: 0,
                flex: 1,
              }}
              textStyle={styles.btnTxtStyle}
            />
          </View>
        </>
      )}

      <Text style={styles.topHeading}>Previous Address</Text>

      <FlatList
        data={addressList}
        renderItem={({index, item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(index);
            }}
            style={[
              styles.mainAddressView,
              index == selected && {
                borderColor: 'lightgrey',
                backgroundColor: 'lightgrey',
              },
            ]}>
            <View style={{...Theme.rowbetween, marginHorizontal: 0}}>
              <Text
                style={{...Theme.ListBetweenText, color: Color.neutralGray}}>
                Mobile #
              </Text>
              <Text
                style={{
                  ...Theme.ListBetweenText,
                  color: Color.headingColor,
                  textAlign: 'right',
                }}>
                {item?.mobile}
              </Text>
            </View>
            <View
              style={{...Theme.rowbetween, marginHorizontal: 0, marginTop: 10}}>
              <Text
                style={{...Theme.ListBetweenText, color: Color.neutralGray}}>
                Address
              </Text>
              <Text
                style={{
                  ...Theme.ListBetweenText,
                  color: Color.headingColor,
                  textAlign: 'right',
                  width: '60%',
                }}>
                {item?.address}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Btn
        onPress={createOrder}
        text="Place Order"
        containerStyle={styles.btnMainStyle}
        textStyle={styles.btnTxtStyle}
      />

      <Modal onRequestClose={goToHome} visible={successModal}>
        <View style={styles.successModal}>
          <RNVICustom
            Lib={'Ionicons'}
            Ccolor={Color.ThemeColor}
            Cname={'checkmark-done-circle'}
            Csize={100}
          />
          <Text style={styles.successModalHeading}>Success</Text>
          <Text style={styles.successModalSubHeading}>
            Thank Your For Shopping At Give Hand
          </Text>
          <Btn
            onPress={goToHome}
            text="Continue Shopping"
            containerStyle={[styles.btnMainStyle, {width: '75%'}]}
            textStyle={styles.btnTxtStyle}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    marginHorizontal: '4%',
    marginTop: '5%',
    color: 'black',
    fontFamily: fonts.medium,
  },
  btnMainStyle: {...Theme.btnStyle, marginTop: 0, marginVertical: '3.5%'},
  btnTxtStyle: {...Theme.btnTextstyle, paddingVertical: 10},
  successModalHeading: {fontFamily: fonts.bold, fontSize: 24, color: 'black'},
  successModalSubHeading: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'grey',
    marginBottom: 16,
    marginTop: 8,
  },
  successModal: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mainAddressView: {
    ...Theme.GeneralBorder,
    marginHorizontal: '4%',
    marginVertical: '2%',
    padding: '2%',
  },
});

export default ShippingDetails;
