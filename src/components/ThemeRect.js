import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import Color from "../theme/color";

const ThemeRect = ({ back, front,style }) => {

    return (
        <View style={[styles.centerImage,{backgroundColor:back},style]}>
            <View style={[styles.whiteRect,front && {borderColor:front}]} />
        </View>
    )

};

const styles = StyleSheet.create({
    centerImage: { height: 70, width: 70, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    whiteRect: { width: 32, height: 32, borderWidth: 10, borderRadius: 4, transform: [{ rotate: '45deg' }] }
})

export default ThemeRect;