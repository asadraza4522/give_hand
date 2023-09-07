import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard, FlatList, StatusBar, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Color from '../../theme/color';
import Theme from '../../theme/theme';
import HomeHeader from '../../components/HomeHeader';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import { LiveProductSearch } from '../../utilies/api/apiController';
import { baseURL } from '../../utilies/api/instance';
import { fonts } from '../../theme/fonts';
import RNVICustom from '../../utilies/RNVICustom';


const HomeSearch = ({ navigation }) => {

    const [search, setSearch] = useState('')
    const [searchTime, setSearchTime] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searching, setSearching] = useState(false)

    const get_search_data = async () => {

        let resp = await LiveProductSearch(navigation, search)
        if (resp?.data?.error === false) {

            setSearchResult(resp?.data?.data)
            setSearching(false)

        } else {
            Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
            setSearching(false)
        }

    }

    useEffect(() => {

        if (search != '') {
            if (searchTime != '')
                clearInterval(searchTime)

            setSearchTime(
                setTimeout(() => {
                    get_search_data()
                }, 100)
            )
        }


    }, [search])


    const renderSearchList = ({ index, item }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('ProductDetails', { data: item, checkCart: true }) }} style={{ flexDirection: 'row', marginVertical: '1%', alignItems: 'center' }}>
            <Image style={{ width: 40, height: 40, borderRadius: 10, marginLeft: 10 }} resizeMode='cover' source={{ uri: item?.image !== undefined ? item.image : baseURL + '/assets/noimage.png' }} />
            <Text style={Theme.SearchItemList}>{item.name}</Text>
        </TouchableOpacity>
    )




    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />
            <HomeHeader onSubmitEditing={() => search != '' ? navigation.replace('SearchProductResult', { searchData: search }) : null} setSearching={setSearching} search={search} setSearch={setSearch} focus BackButton navigation={navigation} />
            {
                searchResult.length > 0 && search != '' ?

                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        style={Theme.container}
                        data={searchResult}
                        renderItem={renderSearchList}
                    /> :

                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            (!searching && search != '') ? <Image
                                resizeMode='contain'
                                source={require('../../assets/noresult.png')}
                                style={{ width: '100%', height: '100%' }}

                            /> : search == '' ?
                                <>
                                    <RNVICustom Ccolor={Color.ThemeColor} Cname={'search1'} Csize={30} Lib={'AntDesign'} />
                                    <Text style={{ fontFamily: fonts.bold, color: Color.ThemeColor, fontSize: 16, marginTop: 30 }}>Search Your Products</Text>
                                </>
                                : <Text style={{ fontFamily: fonts.bold, color: Color.ThemeColor, fontSize: 16, marginTop: 30 }}>Searching....</Text>
                        }
                    </View>

            }
        </SafeAreaView>
    )

};

export default HomeSearch;