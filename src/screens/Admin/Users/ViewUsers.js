import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard} from 'react-native';
import Theme from '../../../theme/theme';
import SearchAndList from '../../../components/SearchAndList';
import {
  getUsersApi,
  delAdminProductsApi,
} from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';
import UserSearchAndList from '../../../components/UserSearchAndList';

const ViewUsers = ({navigation, HideBackground, hideControls, getData}) => {
  const [allUsers, setallUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);

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
    if (page <= lastPage) {
      setRefreshing(true);

      let resp = await getUsersApi(navigation, page, searchData);
      if (resp?.data?.error === false) {
        setallUsers([...allUsers, ...resp.data.data.docs]);
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

  const deleteListItem = async (id, index, name) => {
    Toast.show('Coming Soon', Toast.SHORT);
    // setRefreshing(true)

    // let resp = await delAdminProductsApi({ id: id }, navigation)
    // if (resp?.data?.error === false) {
    //     let array = allUsers
    //     array.splice(index, 1)
    //     setallUsers([...array])
    //     Toast.show(name + " deleted", Toast.SHORT)

    // } else {

    //     Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
    // }
    // setRefreshing(false)
  };

  const setEditFun = (item, index) => {
    Toast.show('Coming Soon', Toast.SHORT);
    // navigation.navigate('EditProduct', { productID: item._id, prevName: item.name })
  };

  const onUserPress = (id, index, name) => {};

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
    <>
      {HideBackground !== undefined ? (
        <UserSearchAndList
          searchData={searchData}
          setSearchData={setSearchData}
          search={Search}
          handleFunction={getData ? getData : null}
          navigation={navigation}
          onRefresh={refreshing}
          refreshData={getRefreshData}
          loadMore={getUsersList}
          data={allUsers.filter(item => item.type === 'user')}
        />
      ) : (
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
      )}
    </>
  );
};

export default ViewUsers;
