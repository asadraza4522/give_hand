import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, FlatList, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import BorderBox from '../../components/BorderBox';
import Loader from '../../components/Loader';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Color from '../../theme/color';
import {fonts} from '../../theme/fonts';
import Theme from '../../theme/theme';
import {getOrdersList} from '../../utilies/api/apiController';
import {get_data} from '../../utilies/AsyncStorage/AsyncStorage';
import RowText from '../../utilies/RowText';

const Orders = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      if (page <= lastPage) {
        setLoading(true);
        const {id} = await get_data('@userData');
        const response = await getOrdersList({navigation, id, page});

        if (response?.data?.error === false) {
          let previos = [...orderList];
          previos = previos.concat(response?.data?.data?.docs);
          setOrderList(previos);
          lastPage == 1 && setLastPage(response?.data?.data.totalPages);
          setPage(page + 1);
        } else {
          Toast.show(
            response?.response?.data?.message
              ? response?.response?.data?.message
              : response.message
              ? response.message
              : 'Something Went Wrong!',
            Toast.SHORT,
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'Error');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Theme.container}>
      <StatusBarDTWC />
      <Loader animating={loading} />

      <FlatList
        style={{marginVertical: '2%'}}
        onEndReachedThreshold={1}
        onEndReached={fetchOrders}
        data={orderList}
        renderItem={({index, item}) => (
          <BorderBox
            opacity={0.6}
            onPress={() => {
              navigation.navigate('OrderDetails', {item});
            }}>
            <Text style={styles.heading}>{item?._id}</Text>
            <Text style={styles.date}>
              Order at: {new Date(item?.createdAt).toString().split('G')[0]}
            </Text>
            <View style={Theme.DashedBorder} />
            <RowText first={'Order Status'} second={item?.status} />
            <RowText first={'Items'} second={item?.total_items} />
            <RowText first={'Price'} second={'Rs. ' + item?.amount} />
          </BorderBox>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {fontFamily: fonts.bold, color: Color.headingColor},
  date: {
    fontFamily: fonts.light,
    color: Color.headingColor,
    fontSize: 12,
    opacity: 0.5,
    marginTop: 12,
  },
});

export default Orders;
