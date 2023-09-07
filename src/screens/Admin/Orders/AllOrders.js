import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {TabBar, TabView} from 'react-native-tab-view';
import OrderCard from '../../../components/OrderCard';
import Color from '../../../theme/color';
import {fonts} from '../../../theme/fonts';
import Theme from '../../../theme/theme';
import {getOrdersList} from '../../../utilies/api/apiController';
import {get_data} from '../../../utilies/AsyncStorage/AsyncStorage';

const AllOrders = ({navigation, route}) => {
  const [index, setIndex] = React.useState(0);
  const [pendingOrder, setPendingOrders] = useState([]);
  const [confirmedOrder, setConfirmedOrders] = useState([]);
  const [shippingOrder, setShippingOrders] = useState([]);
  const [completeOrder, setcompleteOrders] = useState([]);

  const [routes] = React.useState([
    {key: 'first', title: 'Pending'},
    {key: 'second', title: 'Approved'},
    {key: 'third', title: 'Shipping'},
    {key: 'four', title: 'Complete'},
  ]);

  const renderTabBar = propss => (
    <TabBar
      {...propss}
      style={{backgroundColor: 'white'}}
      labelStyle={{fontSize: 10}}
      indicatorStyle={{backgroundColor: Color.ThemeColor}}
      activeColor="#000"
      inactiveColor="#7A7578"
      getLabelText={({route}) => route.title}
      contentContainerStyle={{}}
    />
  );

  const RenderScene = (e, navigation) => {
    switch (e.route.key) {
      case 'first':
        return (
          <OrderList
            data={pendingOrder}
            setData={setPendingOrders}
            navigation={navigation}
            type={'Pending Approval'}
          />
        );
      case 'second':
        return (
          <OrderList
            data={confirmedOrder}
            setData={setConfirmedOrders}
            navigation={navigation}
            type={'Order Confirmed'}
          />
        );
      case 'third':
        return (
          <OrderList
            data={shippingOrder}
            setData={setShippingOrders}
            navigation={navigation}
            type={'Shipping'}
          />
        );
      case 'four':
        return (
          <OrderList
            data={completeOrder}
            setData={setcompleteOrders}
            navigation={navigation}
            type={'Complete'}
          />
        );
    }
  };

  const swapValues = (previosList, nextList, item, index) => {
    previosList.splice(index, 1);
    nextList.unshift(item);
  };

  const updateData = (item, index, type) => {
    switch (type) {
      case 'Pending Approval':
        swapValues(pendingOrder, confirmedOrder, item, index);
        break;

      case 'Order Confirmed':
        swapValues(confirmedOrder, shippingOrder, item, index);
        break;

      case 'Shipping':
        swapValues(shippingOrder, completeOrder, item, index);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (route.params !== undefined) {
      const {item, index, type} = route.params;

      updateData(item, index, type);
    }
  }, [route]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={e => RenderScene(e, navigation)}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const OrderList = ({navigation, data, setData, type}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getOrders = async () => {
    const {id, type: userType} = await get_data('@userData');
    if (page <= lastPage) {
      setLoading(true);
      const response = await getOrdersList({
        navigation,
        id,
        page,
        type,
        userType,
      });
      if (response?.data?.error === false) {
        lastPage == 1 && setLastPage(response?.data?.data.totalPages);
        const result = [];
        for (let i in response?.data?.data?.docs) {
          const obj = response?.data?.data?.docs[i];
          const sellers = obj.sellers.filter(seller => seller.seller_id === id);
          if (sellers.length > 0) {
            result.push({...obj, sellers});
          }
        }
        setData(data?.concat(result));
        setPage(page + 1);
        setLoading(false);
      } else {
        SimpleToast.show(
          response?.response?.data?.message
            ? response?.response?.data?.message
            : response.message
            ? response.message
            : 'Something Went Wrong!',
          SimpleToast.SHORT,
        );
        setLoading(false);
      }
    }
  };

  const renderRecentOrders = ({index, item}) => (
    <OrderCard
      index={index}
      item={item}
      onPress={() =>
        navigation.navigate('OrderDetails', {
          item,
          index,
          back: 'AllOrders',
          type,
        })
      }
      navigation={navigation}
    />
  );

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          style={{flex: 1, marginTop: '1%'}}
          data={data}
          renderItem={renderRecentOrders}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            getOrders();
          }}
          ListFooterComponent={() => (
            <ActivityIndicator
              size="small"
              color={Color.ThemeColor}
              animating={loading}
            />
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Color.ThemeColor}
              animating={loading}
            />
          ) : (
            <Text style={styles.noData}>No Data To Show</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  noData: {
    color: Color.ThemeColor,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});

export default AllOrders;
