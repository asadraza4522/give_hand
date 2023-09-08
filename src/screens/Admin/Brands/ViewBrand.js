import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard} from 'react-native';
import Theme from '../../../theme/theme';
import SearchAndList from '../../../components/SearchAndList';
import {
  getAdminBrandsApi,
  delAdminBrandsApi,
} from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';

const ViewBrand = ({navigation, HideBackground, getData}) => {
  const [allBrand, setallBrand] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchTime, setSearchTime] = useState('');

  const handleOnPress = () => {};

  const getRefreshData = async () => {
    setSearchData('');
    setRefreshing(true);

    let resp = await getAdminBrandsApi(navigation, 1, '');
    if (resp?.data?.error === false) {
      setallBrand([...resp.data.data.docs]);
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

  const getBrandsList = async () => {
    if (page <= lastPage) {
      let previous_data = page == 1 ? [] : allBrand;

      setRefreshing(true);

      let resp = await getAdminBrandsApi(navigation, page, searchData);
      if (resp?.data?.error === false) {
        setallBrand([...previous_data, ...resp.data.data.docs]);
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
    setRefreshing(true);

    let resp = await delAdminBrandsApi({id: id}, navigation);
    if (resp?.data?.error === false) {
      console.log(resp?.data?.data);
      let array = allBrand;
      array.splice(index, 1);
      setallBrand([...array]);
      Toast.show(name + ' deleted', Toast.SHORT);
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

  const setEditFun = (item, index) => {
    navigation.navigate('EditBrand', {brandData: item, index: index});
  };

  const HandleSearch = event => {
    if (event == 'press') {
      Keyboard.dismiss();
    }

    enableSearch != true && setEnableSearch(true);

    if (searchTime) {
      clearInterval(searchTime);
    }

    setSearchTime(
      setTimeout(() => {
        if (searchData != '' || enableSearch == true) {
          setPage(1);
          setLastPage(1);
        }
      }, 400),
    );

    searchData.length == 0 && setEnableSearch(false);
  };

  const CancelSearch = () => {
    setPage(1);
    setallBrand([]);
    setEnableSearch(false);
    setSearchData('');
  };

  useEffect(() => {
    if (page <= 2) {
      getBrandsList();
    }
  }, [page]);

  useEffect(() => {
    if (searchData.length > 0 || enableSearch == true) {
      HandleSearch();
    }
  }, [searchData]);

  let Search = {
    placeHolder: 'Search Brands',
    onPress: HandleSearch.bind(this, 'press'),
    active: enableSearch,
    cancelFun: CancelSearch,
  };

  return (
    <>
      {HideBackground !== undefined ? (
        <SearchAndList
          searchData={searchData}
          setSearchData={setSearchData}
          search={Search}
          hideControls
          handleFunction={getData ? getData : handleOnPress}
          setEditFun={setEditFun}
          deleteListItem={deleteListItem}
          navigation={navigation}
          onRefresh={refreshing}
          refreshData={getRefreshData}
          loadMore={getBrandsList}
          data={allBrand}
        />
      ) : (
        <View style={Theme.TabViewCreateInsideContainer}>
          <Text style={Theme.CreateViewHeading}>Brands List</Text>
          <SearchAndList
            searchData={searchData}
            setSearchData={setSearchData}
            search={Search}
            setEditFun={setEditFun}
            deleteListItem={deleteListItem}
            navigation={navigation}
            onRefresh={refreshing}
            refreshData={getRefreshData}
            loadMore={getBrandsList}
            data={allBrand}
          />
        </View>
      )}
    </>
  );
};

export default ViewBrand;
