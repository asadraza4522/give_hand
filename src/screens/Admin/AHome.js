import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../theme/theme';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import IconText from '../../components/IconText';
import MenuHeader from '../../utilies/MenuHeader';
import Color from '../../theme/color';
import TwoTextCard from '../../components/TwoTextCard';
import RNVICustom from '../../utilies/RNVICustom';
import Card from '../../components/card';
import OrderCard from '../../components/OrderCard';
import {
  getOrdersList,
  DashboardStat,
  getDashboardStat,
} from '../../utilies/api/apiController';
import {get_data, Logout} from '../../utilies/AsyncStorage/AsyncStorage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

const AHome = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [ordersList, setOrdersList] = useState([]);
  const [loadingStat, setLoadingStat] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [adminPages, setadminPages] = useState([
    {
      title: 'Orders',
      icon: {
        name: 'cart-check',
        lib: 'MaterialCommunityIcons',
        color: Color.ThemeColorBlueDark,
      },
      path: 'AllOrders',
    },
    {
      title: 'Products',
      icon: {
        name: 'product-hunt',
        lib: 'Fontisto',
        color: Color.ThemeColorBlueDark,
      },
      path: 'AProducts',
    },
  ]);

  const [statisticsdata, setstatisticsdata] = useState([
    {
      id: 3,
      title: 'Orders',
      amt: 0,
    },
    {
      id: 1,
      title: 'Customers',
      amt: 0,
    },
    {
      id: 2,
      title: 'Products',
      amt: 0,
    },
  ]);

  const getStatistics = async () => {
    setLoadingStat(true);
    const response = await getDashboardStat(navigation);

    if (response?.data?.error === false) {
      setstatisticsdata([
        {
          id: 3,
          title: 'Orders',
          amt: response?.data?.data?.Orders,
        },
        {
          id: 1,
          title: 'Customers',
          amt: response?.data?.data?.Customers,
        },
        {
          id: 2,
          title: 'Products',
          amt: response?.data?.data?.Products,
        },
      ]);
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
    setLoadingStat(false);
  };

  const getOrders = async () => {
    const {id, type: userType} = await get_data('@userData');
    setLoadingOrders(true);
    const response = await getOrdersList({
      navigation,
      id,
      page: 1,
      limit: 10,
      userType,
    });
    if (response?.data?.error === false) {
      setOrdersList(response?.data?.data);
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
    setLoadingOrders(false);
  };

  const renderStatistics = ({index, item}) => (
    <TwoTextCard loading={loadingStat} item={item} />
  );

  const renderAdminPages = ({item, index}) => (
    <IconText
      onPress={() => handleAdminPages(item)}
      adminCard
      navigation={navigation}
      item={item}
    />
  );

  const renderRecentOrders = ({index, item}) => (
    <OrderCard index={index} item={item} navigation={navigation} status />
  );

  const handleAdminPages = async item => {
    item?.path && navigation.navigate(item.path);
  };

  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerLeft: () => (
  //             <RNVICustom style={{ marginLeft: '6%' }} Ccolor={'white'} Cname={'menu'} Csize={22} Lib={'Entypo'} />
  //         ),
  //         headerRight: () => (
  //             <RNVICustom onPress={async () => { await Logout(navigation, dispatch) }} style={{ marginRight: '6%' }} Ccolor={'white'} Cname={'logout'} Csize={22} Lib={'MaterialIcons'} />
  //         ),
  //     });
  // }, [navigation]);

  useEffect(() => {
    getOrders();
    getStatistics();
  }, []);

  useEffect(() => {
    if (route.params !== undefined) {
      const {item, index} = route.params;
      let previous = ordersList;
      previous.docs.splice(index, 1, item);
      setOrdersList(previous);
    }
  }, [route]);

  return (
    <SafeAreaView style={Theme.containerOffWhite}>
      <StatusBarDTWC Color={Color.ThemeColor} />
      <FlatList
        style={{flexGrow: 0, marginHorizontal: '3%'}}
        horizontal
        data={statisticsdata}
        renderItem={renderStatistics}
        showsHorizontalScrollIndicator={false}
      />

      <MenuHeader first={'Features'} />

      <FlatList
        style={{flexGrow: 0, marginHorizontal: '3%'}}
        horizontal
        data={adminPages}
        renderItem={renderAdminPages}
        showsHorizontalScrollIndicator={false}
      />

      <MenuHeader
        secOnPress={() => navigation.navigate('AllOrders')}
        style={{marginVertical: '2%'}}
        first={'Recent Orders'}
        second={'See All'}
      />

      <View style={{flex: 1}}>
        {!loadingOrders ? (
          <FlatList
            style={{flex: 1, marginTop: '1%'}}
            data={ordersList.docs}
            ListEmptyComponent={
              <Text
                style={{
                  fontSize: 12,
                  color: Color.neutralGray,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                Nothing To Show
              </Text>
            }
            renderItem={renderRecentOrders}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator
            size="small"
            color={Color.ThemeColor}
            animating={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AHome;
