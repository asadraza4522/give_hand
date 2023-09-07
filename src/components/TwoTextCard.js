import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import Color from "../theme/color";
import Theme from "../theme/theme";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts } from "../theme/fonts";

const TwoTextCard = ({ item, loading }) => {

    return (
        <View style={Theme.CartTwoTextMain}>
            <Text style={styles.title}>{item?.title}</Text>
            <View style={Theme.DTCSeprator} />
            {loading ?
                <Text style={styles.amt}>.....</Text>
                :
                <Text style={styles.amt}>{item?.amt}</Text>
            }

        </View>
    )

};

const styles = StyleSheet.create({
    title: { color: Color.ThemeColorBlueDark, fontFamily: fonts.bold, fontSize: wp('2.8%') },
    amt: { ...Theme.iconTextFontContainer, fontSize: wp('2.5%'), marginTop: 0 }
})

export default TwoTextCard;