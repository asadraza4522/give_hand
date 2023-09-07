import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import HomeHeader from "../../components/HomeHeader";
import StatusBarDTWC from "../../components/StatusBarDTWC";
import Color from "../../theme/color";
import { fonts } from "../../theme/fonts";
import Theme from "../../theme/theme";
import { addToCartApi, getAdminProductsApi } from "../../utilies/api/apiController";
import { get_data } from "../../utilies/AsyncStorage/AsyncStorage";
import Toast from "react-native-simple-toast";
import ProductView1 from "../../components/ProductView1";
import RNVICustom from "../../utilies/RNVICustom";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Btn } from "../../components/btn";
import { useDispatch, useSelector } from "react-redux";
import { getProductsCart, updateQty } from "../../utilies/api/apiCalls";
import Loader from "../../components/Loader";


const SearchProductResult = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const cartData = useSelector(state => state.main.cartList)
    const [search, setSearch] = useState(route?.params?.searchData || '')
    const [category, setCategory] = useState(route?.params?.category || '')
    const [searchTime, setSearchTime] = useState('')
    const [loading, setLoading] = useState(false);
    const [loadingSc, setLoadingSc] = useState(false);
    const [products, setProducts] = useState([])
    const [totalResult, setTotalREsult] = useState(0)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const fetchData = async () => {

        if (page <= lastPage) {

            setLoading(true)

            const resp = await getAdminProductsApi(navigation, page, search, category)

            if (resp?.data?.error === false) {

                let previous = products
                let newData = resp?.data?.data?.docs

                for (let indexi = 0; indexi < newData?.length; indexi++) {

                    for (let indexj = 0; indexj < cartData?.products?.length; indexj++) {

                        if (newData[indexi]?._id === cartData?.products[indexj]?.productID?._id) {
                            newData[indexi].cartQty = cartData?.products[indexj]?.cartQty
                            break;
                        }

                    }

                }


                let merge = previous?.concat(newData)
                setProducts(merge)
                setTotalREsult(resp?.data?.data?.totalDocs)
                lastPage == 1 && setLastPage(resp?.data?.data?.totalPages)
                setPage(page + 1)
                setLoading(false)

            } else {

                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                setLoading(false)
            }

        }

    }

    const addToCart = async (index, item, proID) => {

        setLoadingSc(true)

        let userID = await get_data('@userData')
        let previousProducts = products

        let body = {
            user: userID.id,
            productID: proID
        }


        item.cartQty = 1

        let resp = await addToCartApi(body, navigation)
        if (resp?.data?.error === false) {

            previousProducts.splice(index, 1, item)
            setProducts([...previousProducts])
            getProductsCart(navigation, userID.id, dispatch)
            setLoadingSc(false)

        } else {
            Toast.show(resp?.data?.message ? resp?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
            setLoadingSc(false)
        }

    }

    const updateQtyFun = async (ProID, qty, item, index) => {

        if (await updateQty(ProID, qty, item, navigation, dispatch)) {

            let previous = products
            item.cartQty = qty
            previous.splice(index, 1, item)
            setProducts([...previous])

        }

    }


    useEffect(() => {

        fetchData()

    }, [])


    const renderProductList = ({ index, item }) => (
        <ProductView1 updateQtyFun={(ProID, qty) => updateQtyFun(ProID, qty, item, index)} addToCart={(proID) => addToCart(index, item, proID)} key={item._id} data={item} navigation={navigation} />
    )

    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />
            <Loader animating={loadingSc} />

            <HomeHeader search={search} setSearch={setSearch} BackButton navigation={navigation} />
            <Text style={styles.SearchNumber}>{totalResult} Results</Text>

            {
                products?.length > 0 ?
                    <FlatList
                        style={{ flex: 1, marginHorizontal: '2%' }}
                        numColumns={2}
                        data={products}
                        renderItem={renderProductList}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.4}
                        onEndReached={fetchData}
                        ListFooterComponent={() => (<ActivityIndicator size='small' color={Color.ThemeColor} animating={loading} />)}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {
                            loading ?
                                <Text style={styles.Heading}>Loading...</Text>
                                :
                                <>
                                    <RNVICustom style={styles.Cross} Ccolor={'white'} Cname={'cross'} Csize={45} Lib={'Entypo'} />
                                    <Text style={styles.Heading}>Product Not Found</Text>
                                    <Text style={styles.Desc}>Thank you for using Give Hand</Text>
                                    <Btn onPress={() => navigation.goBack()} text="Back To Home" containerStyle={styles.button} textStyle={Theme.btnTextstyle} />
                                </>
                        }
                    </View>

            }

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    SearchNumber: { color: Color.headingColor, opacity: 0.5, fontFamily: fonts.medium, marginLeft: '4%', marginTop: '4%' },
    button: {
        ...Theme.btnStyle,
        elevation: 8,
        marginHorizontal: '6%'
    },
    Cross: { backgroundColor: Color.ThemeColor, borderRadius: 70, height: 70, width: 70, textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center' },
    Heading: { fontFamily: fonts.bold, color: Color.headingColor, fontSize: wp('5%'), marginTop: 16, textAlign: 'center' },
    Desc: { fontFamily: fonts.regular, color: Color.neutralGray, fontSize: wp('3.5%'), marginTop: 16, textAlign: 'center' }
})

export default SearchProductResult;