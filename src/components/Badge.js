import React from "react";
import { View, Text } from 'react-native'
import Color from "../theme/color";
import RNVICustom from "../utilies/RNVICustom";
import Theme from "../theme/theme";

const Badge = ({ item, RemoveTag, index }) => {


    return (
        <View style={Theme.BadgeContainer}>
            <Text style={Theme.BadgeText}>{item}</Text>
            <RNVICustom onPress={RemoveTag.bind(this, index)} Ccolor={'white'} Cname={'circle-with-cross'} Csize={14} Lib={'Entypo'} />
        </View>
    )

}

export default Badge