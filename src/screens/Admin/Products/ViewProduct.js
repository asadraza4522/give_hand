import React, { useState, useEffect } from "react";
import { View, Text, Keyboard } from 'react-native'
import Theme from "../../../theme/theme";
import SearchAndList from "../../../components/SearchAndList";
import { getAdminProductsApi, delAdminProductsApi } from '../../../utilies/api/apiController';
import Toast from 'react-native-simple-toast';


const ViewProduct = ({ navigation }) => {

    const [allProducts, setallProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [enableSearch, setEnableSearch] = useState(false)
    const [searchTime,setSearchTime] = useState('')


    const getRefreshData = async () => {

        setSearchData('')
        setRefreshing(true)

        let resp = await getAdminProductsApi(navigation, 1, '')
        if (resp?.data?.error === false) {
            console.log(JSON.stringify(resp.data), "this is the response data");
            setallProducts([...resp.data.data.docs])
            setPage(2)

        } else {

            Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
        }

        setRefreshing(false)

    }

    const getProductsList = async () => {
        
        if (page <= lastPage) {

            let previous_data = page == 1 ? [] : allProducts
            
            setRefreshing(true)

            let resp = await getAdminProductsApi(navigation, page, searchData)
            if (resp?.data?.error === false) {

                setallProducts([...previous_data, ...resp.data.data.docs])
                setLastPage(resp.data.data.totalPages)
                setPage(page + 1)

            } else {

                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
            }

            setRefreshing(false)

        }

    }

    const deleteListItem = async (id, index, name) => {

        setRefreshing(true)

        let resp = await delAdminProductsApi({ id: id }, navigation)
        if (resp?.data?.error === false) {
            let array = allProducts
            array.splice(index, 1)
            setallProducts([...array])
            Toast.show(name + " deleted", Toast.SHORT)

        } else {

            Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
        }
        setRefreshing(false)
    }

    const setEditFun = (item, index) => {
        navigation.navigate('EditProduct', { productID: item._id, prevName: item.name })
    }

    const HandleSearch = (event) => {

        if(event == 'press'){
            Keyboard.dismiss()
        }

        enableSearch != true && setEnableSearch(true)

        if(searchTime)
        clearInterval(searchTime)

        setSearchTime(
            setTimeout(() => {
                if (searchData != '' || enableSearch == true) {
    
                    setPage(1)
                    setLastPage(1)
                
                }
            }, 400)
        )

        searchData.length == 0 && setEnableSearch(false)
    }

    const CancelSearch = () => {

        setPage(1)
        setallProducts([])
        setEnableSearch(false)
        setSearchData('')

    }

    useEffect(() => {

        if (page <= 2) {
            getProductsList()
        }

    }, [page])

    useEffect(() => {
        
        if (searchData.length > 0 || enableSearch == true) {

            HandleSearch()

        }

    }, [searchData])


    let Search = { "placeHolder": "Search Products", onPress: HandleSearch.bind(this,'press'), active: enableSearch, cancelFun: CancelSearch }

    return (
        <View style={Theme.TabViewCreateInsideContainer}>
            <Text style={Theme.CreateViewHeading}>Products List</Text>
            <SearchAndList searchData={searchData} setSearchData={setSearchData} search={Search} setEditFun={setEditFun} deleteListItem={deleteListItem} navigation={navigation} onRefresh={refreshing} refreshData={getRefreshData} loadMore={getProductsList} data={allProducts} />
        </View>
    )

};

export default ViewProduct;