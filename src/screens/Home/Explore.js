import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import Theme from '../../theme/theme';
import HomeHeader from '../../components/HomeHeader';
import IconText from '../../components/IconText';
import StatusBarDTWC from '../../components/StatusBarDTWC'

const Explore = ({ navigation }) => {


    const [categoriesList, setCategoriesList] = useState([1, 2, 3, 5, 6, 7, 2])

    const renderCategoriesList = ({ index, item }) => (
        <IconText />
    )



    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />

            <HomeHeader Component={Text} navigation={navigation} />

            <FlatList
                numColumns={4}
                style={{ flexGrow: 0, marginTop: 5 }}
                data={categoriesList}
                renderItem={renderCategoriesList}
                showsHorizontalScrollIndicator={false}
            />


        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    topMargin: { marginTop: '8%' },

})

export default Explore;