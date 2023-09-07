import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Theme from '../../theme/theme';
import {FormInput} from '../../components/FormInput';
import ThemeRect from '../../components/ThemeRect';
import Color from '../../theme/color';
import {Btn} from '../../components/btn';
import Or from '../../components/Or';
import TwoTextFV from '../../utilies/TwoTextFV';
import {changeScreens} from '../../redux/MainSlice';
import {useDispatch} from 'react-redux';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {loginValidation} from '../../utilies/validation';
import Loader from '../../components/Loader';
import {LoginApi} from '../../utilies/api/apiController';
import {get_data, save_data} from '../../utilies/AsyncStorage/AsyncStorage';
import Toast from 'react-native-simple-toast';
import {
  getCardsUser,
  getProductsCart,
  getProductsCategories,
  getProductsUser,
  saveFCMtoken,
} from '../../utilies/api/apiCalls';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const Submit = async () => {
    let validate = loginValidation({email, password});
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true);
      const user = {
        email,
        password,
      };
      const resp = await LoginApi(user, navigation);
      if (resp?.data?.error === false) {
        await save_data('@userData', resp.data.data);

        const FCMtoken = await get_data('FCM');
        await saveFCMtoken(navigation, FCMtoken?.token);

        if (resp.data.data.type === 'user') {
          if (
            (await getProductsCart(navigation, resp.data.data.id, dispatch)) ==
            true
          ) {
            getProductsUser(navigation, 1, '', dispatch);
            getCardsUser(navigation, 1, '', dispatch);
            getProductsCategories(navigation, 1, 10, dispatch);
            setTimeout(() => {
              Toast.show('Login successfully', Toast.SHORT);
              dispatch(changeScreens(resp.data.data.type));
            }, 1000);
          }
        } else {
          Toast.show('Login successfully', Toast.SHORT);
          if (resp.data.data.is_stripe_connected) {
            dispatch(changeScreens(resp.data.data.type));
          } else {
            navigation.replace('StripeAccount');
          }
        }
      } else {
        setTimeout(() => {
          Toast.show(
            resp?.response?.data?.message
              ? resp?.response?.data?.message
              : resp.message
              ? resp.message
              : 'Something Went Wrong!',
            Toast.SHORT,
          );
        }, 1000);
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={loading} />

      <View style={[Theme.container, styles.center]}>
        <ThemeRect
          style={styles.selfAlign}
          front={'white'}
          back={Color.ThemeColor}
        />
        <Text style={Theme.Authheading}>Welcome to Give Hand</Text>
        <Text style={Theme.subHeading}>Sign in to continue</Text>

        <FormInput
          placeholder="Your Email"
          onChangeText={data => {
            setErrortext(''), setEmail(data);
          }}
          textInputContainerStyle={[Theme.InputView]}
          style={[Theme.TextInputStyle]}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'FontAwesome',
            name: 'envelope-o',
            color: Color.neutralGray,
            size: 18,
          }}
          value={email}
          error={
            errortext === 'Please Enter Email'
              ? 'Please Enter Email'
              : errortext === 'Email format is invalid'
              ? 'Email format is invalid'
              : null
          }
        />

        <FormInput
          placeholder="Password"
          onChangeText={data => {
            setErrortext(''), setPassword(data);
          }}
          textInputContainerStyle={[Theme.InputView]}
          style={Theme.TextInputStyle}
          containerStyle={[Theme.TextInputContainer, {marginTop: '2%'}]}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Feather',
            name: 'lock',
            color: Color.neutralGray,
            size: 18,
          }}
          value={password}
          error={
            errortext === 'Please Enter Your Password'
              ? 'Please Enter Your Password'
              : null
          }
        />

        <Btn
          onPress={Submit}
          text="Sign In"
          containerStyle={[Theme.btnStyle]}
          textStyle={Theme.btnTextstyle}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 30,
            marginBottom: -20,
          }}>
          <Text
            onPress={() => {
              setEmail('seller@gmail.com');
              setPassword('123456');
            }}>
            Seller Login Details
          </Text>
          <Text
            onPress={() => {
              setEmail('customer2@gmail.com');
              setPassword('123456');
            }}>
            User Login Details
          </Text>
        </View>

        <Or />

        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <TwoTextFV
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={{textAlign: 'center', marginTop: '2%'}}
          first="Don’t have a account?"
          second={'Register'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {justifyContent: 'center'},
  selfAlign: {alignSelf: 'center'},
  forgotPass: {
    color: Color.ThemeColor,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '4%',
  },
});

export default Login;
