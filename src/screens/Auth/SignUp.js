import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import Theme from '../../theme/theme';
import {FormInput} from '../../components/FormInput';
import ThemeRect from '../../components/ThemeRect';
import Color from '../../theme/color';
import TwoTextFV from '../../utilies/TwoTextFV';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {Signup_validation} from '../../utilies/validation';
import {SignUpApi} from '../../utilies/api/apiController';
import Loader from '../../components/Loader';
import {get_data, save_data} from '../../utilies/AsyncStorage/AsyncStorage';
import {useDispatch} from 'react-redux';
import {changeScreens} from '../../redux/MainSlice';
import {
  getCardsUser,
  getProductsCategories,
  getProductsUser,
  saveFCMtoken,
} from '../../utilies/api/apiCalls';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);
  const [thirdFocus, setThirdFocus] = useState(false);
  const [fourFocus, setFourFocus] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const Submit = async type => {
    let validate = Signup_validation({
      fullName,
      userEmail,
      password,
      againPassword,
    });
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true);
      let user = {
        name: fullName,
        email: userEmail,
        password: password,
        type,
        assertion: 'password',
      };
      const resp = await SignUpApi(user, navigation);
      if (resp?.data?.error === false) {
        await save_data('@userData', resp?.data?.data);
        const FCMtoken = await get_data('FCM');
        await saveFCMtoken(navigation, FCMtoken?.token);
        if (type == 'user') {
          getProductsUser(navigation, 1, '', dispatch);
          getCardsUser(navigation, 1, '', dispatch);
          getProductsCategories(navigation, 1, 10, dispatch);
          setTimeout(() => {
            Toast.show('Registered successfully', Toast.SHORT);
            setLoading(false);
            dispatch(changeScreens(resp.data.data.type));
          }, 800);
        } else {
          if (resp.data.data.is_stripe_connected) {
            dispatch(changeScreens(resp.data.data.type));
          } else {
            navigation.replace('StripeAccount');
          }
        }
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
        <Text style={Theme.Authheading}>Let’s Get Started</Text>
        <Text style={Theme.subHeading}>Create an new account</Text>

        <FormInput
          placeholder="Full Name"
          onChangeText={data => {
            setErrortext(''), setFullName(data);
          }}
          textInputContainerStyle={[
            Theme.InputView,
            firstFocus && {borderColor: Color.ThemeColor},
          ]}
          style={Theme.TextInputStyle}
          containerStyle={[Theme.TextInputContainer, {marginTop: '8%'}]}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'FontAwesome',
            name: 'user-o',
            color: Color.neutralGray,
            size: 18,
          }}
          onFocus={() => setFirstFocus(true)}
          onBlur={() => setFirstFocus(false)}
          value={fullName}
          error={
            errortext === 'Please enter your name'
              ? 'Please enter your name'
              : null
          }
        />

        <FormInput
          placeholder="Your Email"
          onChangeText={data => {
            setErrortext(''), setUserEmail(data);
          }}
          textInputContainerStyle={[
            Theme.InputView,
            secondFocus && {borderColor: Color.ThemeColor},
          ]}
          style={[Theme.TextInputStyle]}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'FontAwesome',
            name: 'envelope-o',
            color: Color.neutralGray,
            size: 18,
          }}
          onFocus={() => setSecondFocus(true)}
          onBlur={() => setSecondFocus(false)}
          value={userEmail}
          error={
            errortext === 'Please Enter Your Email'
              ? 'Please Enter Your Email'
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
          textInputContainerStyle={[
            Theme.InputView,
            thirdFocus && {borderColor: Color.ThemeColor},
          ]}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Feather',
            name: 'lock',
            color: Color.neutralGray,
            size: 18,
          }}
          onFocus={() => setThirdFocus(true)}
          onBlur={() => setThirdFocus(false)}
          value={password}
          error={
            errortext === 'Please enter your password'
              ? 'Please enter your password'
              : errortext === 'Password Should have atleast 6 digits'
              ? 'Password Should have atleast 6 digits'
              : null
          }
        />

        <FormInput
          placeholder="Password Again"
          onChangeText={data => {
            setErrortext(''), setAgainPassword(data);
          }}
          textInputContainerStyle={[
            Theme.InputView,
            fourFocus && {borderColor: Color.ThemeColor},
          ]}
          style={Theme.TextInputStyle}
          containerStyle={Theme.TextInputContainer}
          placeholderTextColor={Color.AuthInputsPlaceholder}
          leftIcon={{
            family: 'Feather',
            name: 'lock',
            color: Color.neutralGray,
            size: 18,
          }}
          onFocus={() => setFourFocus(true)}
          onBlur={() => setFourFocus(false)}
          value={againPassword}
          error={
            errortext === 'Please enter repeat password'
              ? 'Please enter repeat password'
              : errortext === 'Both password should be same'
              ? 'Both password should be same'
              : null
          }
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Text
            style={[
              Theme.btnStyle,
              {color: Color.white, paddingHorizontal: 10, paddingVertical: 5},
            ]}
            onPress={() => Submit('seller')}>
            Sign Up as Seller
          </Text>
          <Text
            style={[
              Theme.btnStyle,
              {color: Color.white, paddingHorizontal: 10, paddingVertical: 5},
            ]}
            onPress={() => Submit('user')}>
            Sign Up as User
          </Text>
        </View>
        <TwoTextFV
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{textAlign: 'center', marginTop: '4%'}}
          first="Have a account?"
          second={'Sign In'}
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

export default SignUp;
