import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Btn} from '../../components/btn';
import IconTwoText from '../../components/IconTwoText';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {clearHomeProduct, setHomeProducts} from '../../redux/MainSlice';
import Color from '../../theme/color';
import Theme from '../../theme/theme';
import {Logout} from '../../utilies/AsyncStorage/AsyncStorage';
import RNVICustom from '../../utilies/RNVICustom';

const Account = ({navigation}) => {
  const dispatch = useDispatch();

  const [listData, setListData] = useState([
    {title: 'Profile', icon: 'user', Lib: 'AntDesign', Path: 'UserProfile'},
    {title: 'Order', icon: 'shopping-bag', Lib: 'Entypo', Path: 'Orders'},
  ]);

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />

      <FlatList
        data={listData}
        renderItem={({item, index}) => (
          <IconTwoText
            navigation={navigation}
            item={item}
            onPress={() => {
              navigation.navigate(item.Path);
            }}
          />
        )}
      />

      <Btn
        text="Logout"
        onPress={async () => {
          await Logout(navigation, dispatch);
          dispatch(clearHomeProduct([]));
        }}
        containerStyle={{
          ...Theme.btnStyle,
          marginTop: 0,
          marginVertical: 20,
          width: '60%',
          alignSelf: 'center',
        }}
        textStyle={{...Theme.btnTextstyle, paddingVertical: 10}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Account;
