import React from "react";
import { Text } from "react-native";
import Color from "../theme/color";

const TwoTextFV = ({ inverse, first, second, style, onPress }) => {

    return (
        <Text onPress={onPress} style={[{ fontWeight: '400', color: Color.neutralGray },style]}>{first}
            <Text style={{ color: Color.ThemeColor, fontWeight: '700' }}> {second}</Text>
        </Text>
    )

};

export default TwoTextFV;