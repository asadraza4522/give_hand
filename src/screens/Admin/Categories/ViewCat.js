import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard} from 'react-native';
import Theme from '../../../theme/theme';
import SearchAndList from '../../../components/SearchAndList';
import {
  getAdminCategoriesApi,
  delAdminCategoriesApi,
} from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';

const ViewCat = ({navigation, HideBackground, hideControls, getData}) => {
  const [allCateg, setAllCateg] = useState([]);
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

    let resp = await getAdminCategoriesApi(navigation, 1, '');
    if (resp?.data?.error === false) {
      setAllCateg([...resp.data.data.docs]);
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

  const getCategoriesList = async () => {
    if (page <= lastPage) {
      let previous_data = page == 1 ? [] : allCateg;

      setRefreshing(true);

      let resp = await getAdminCategoriesApi(navigation, page, searchData);
      if (resp?.data?.error === false) {
        setAllCateg([...previous_data, ...resp.data.data.docs]);
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

    let resp = await delAdminCategoriesApi({id: id}, navigation);
    if (resp?.data?.error === false) {
      console.log(resp?.data?.data);
      let array = allCateg;
      array.splice(index, 1);
      setAllCateg([...array]);
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
    navigation.navigate('EditCat', {categoryData: item, index: index});
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
    setLastPage(1);
    setAllCateg([]);
    setEnableSearch(false);
    setSearchData('');
  };

  useEffect(() => {
    if (page <= 2) {
      getCategoriesList();
    }
  }, [page]);

  useEffect(() => {
    if (searchData.length > 0 || enableSearch == true) {
      HandleSearch();
    }
  }, [searchData]);

  let Search = {
    placeHolder: 'Search Categories',
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
          loadMore={getCategoriesList}
          data={allCateg}
        />
      ) : (
        <View style={Theme.TabViewCreateInsideContainer}>
          <Text style={Theme.CreateViewHeading}>Categories List</Text>
          <SearchAndList
            searchData={searchData}
            setSearchData={setSearchData}
            search={Search}
            setEditFun={setEditFun}
            deleteListItem={deleteListItem}
            navigation={navigation}
            onRefresh={refreshing}
            refreshData={getRefreshData}
            loadMore={getCategoriesList}
            data={allCateg}
          />
        </View>
      )}
    </>
  );
};

export default ViewCat;
