import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../theme/theme';
import Loader from '../../components/Loader';
import UserSearchAndList from '../../components/UserSearchAndList';
import {getUsersApi} from '../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';
import {createNewChatRoom} from '../../utilies/api/apiCalls';
import {useDispatch} from 'react-redux';

const AddNewChat = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const [user, setUser] = useState(route?.params?.user);

  const getRefreshData = async () => {
    setRefreshing(true);
    setSearchData('');

    let resp = await getUsersApi(navigation, 1, '');
    if (resp?.data?.error === false) {
      setallUsers([...resp.data.data.docs]);
      setPage(2);
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

    setRefreshing(false);
  };

  const getUsersList = async () => {
    console.log('user :: ', user?.id);

    if (page <= lastPage) {
      setRefreshing(true);

      let resp = await getUsersApi(navigation, page, searchData);
      if (resp?.data?.error === false) {
        setallUsers(
          [...allUsers, ...resp.data.data.docs].filter(
            item => item._id != user.id,
          ),
        );
        setLastPage(resp.data.data.totalPages);
        setPage(page + 1);
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

      setRefreshing(false);
    }
  };

  const onUserPress = async (id, index, name) => {
    console.log(
      '🚀 ~ file: AddNewChat.js:64 ~ onUserPress ~ index:',
      index?._id,
    );
    await createNewChatRoom(index?._id, navigation, dispatch);
    // setRefreshing(true)
    // setRefreshing(false)
  };

  const HandleSearch = event => {
    if (event == 'press') {
      Keyboard.dismiss();
    }

    if (searchData != '' || enableSearch == true) {
      setPage(1);
      setLastPage(1);
      setallUsers([]);
      setEnableSearch(true);
    }
    searchData.length == 0 && setEnableSearch(false);
  };

  const CancelSearch = () => {
    setPage(1);
    setallUsers([]);
    setEnableSearch(false);
    setSearchData('');
  };

  useEffect(() => {
    if (page <= 2) {
      getUsersList();
    }
  }, [page, searchData]);

  useEffect(() => {
    if (searchData.length > 0 || enableSearch == true) {
      HandleSearch();
    }
  }, [searchData]);

  let Search = {
    placeHolder: 'Search Users',
    onPress: HandleSearch.bind(this, 'press'),
    active: enableSearch,
    cancelFun: CancelSearch,
  };
  return (
    <SafeAreaView style={Theme.container}>
      <Loader animating={loading} />
      <View style={Theme.TabViewCreateInsideContainer}>
        <Text style={Theme.CreateViewHeading}>Users List</Text>
        <UserSearchAndList
          searchData={searchData}
          setSearchData={setSearchData}
          search={Search}
          handleFunction={onUserPress}
          navigation={navigation}
          onRefresh={refreshing}
          refreshData={getRefreshData}
          loadMore={getUsersList}
          data={allUsers.filter(item => item.type === 'user')}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNewChat;

const styles = StyleSheet.create({});
