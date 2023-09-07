import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import Theme from '../../theme/theme';
import IconTwoText from '../../components/IconTwoText';
import Color from '../../theme/color';
import {Btn} from '../../components/btn';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import {fonts} from '../../theme/fonts';
import {getUserInfo} from '../../utilies/api/apiController';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';
import ProfileImage from '../../components/ProfileImage';

const UserProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userData, setUserData] = useState('');

  const [listData, setListData] = useState([
    {title: 'Gender', icon: 'certificate', Lib: 'FontAwesome'},
    {title: 'Email', Lib: 'AntDesign', icon: 'mail'},
    {title: 'Phone Number', Lib: 'AntDesign', icon: 'mobile1'},
  ]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      let user_data = await get_data('@userData');

      let resp = await getUserInfo(navigation, user_data.id);

      if (resp?.data.error === false) {
        setListData([
          {
            title: 'Gender',
            icon: 'certificate',
            Lib: 'FontAwesome',
            second: resp?.data?.data?.gender,
          },
          {
            title: 'Email',
            Lib: 'AntDesign',
            icon: 'mail',
            second: resp?.data?.data?.email,
          },
          {
            title: 'Phone Number',
            Lib: 'AntDesign',
            icon: 'mobile1',
            second: resp?.data?.data?.mobile,
          },
        ]);

        setEmail(resp?.data?.data?.email);
        setName(resp?.data?.data?.name);
        setUserData(resp?.data?.data);
      } else {
        Toast.show(
          resp?.response?.data?.message
            ? resp?.response?.data?.message
            : resp.message
            ? resp.message
            : 'Something Went Wrong!',
          Toast.SHORT,
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error, 'Error');
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserProfile();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={loading} />
      <View style={styles.TopContainer}>
        <ProfileImage userData={userData} />
        <View style={styles.TextContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={listData}
        style={{flexGrow: 0}}
        renderItem={({item, index}) => (
          <IconTwoText disabled navigation={navigation} item={item} />
        )}
      />

      <Btn
        text="Edit Profile"
        onPress={() => {
          navigation.navigate('EditUser', {userData: userData});
        }}
        containerStyle={Theme.btnStyle}
        textStyle={Theme.btnTextstyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TopContainer: {
    marginVertical: '6%',
    marginHorizontal: '4%',
    flexDirection: 'row',
  },
  TextContainer: {justifyContent: 'space-between', padding: '4%'},
  nameText: {color: Color.headingColor, fontSize: 14, fontFamily: fonts.bold},
  emailText: {
    fontFamily: fonts.regular,
    color: Color.neutralGray,
    fontSize: 12,
  },
});

export default UserProfile;
