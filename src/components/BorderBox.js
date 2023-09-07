import React from "react";
import {TouchableOpacity} from 'react-native'
import Theme from "../theme/theme";

const BorderBox = ({navigation,children,style,opacity,onPress}) => {

    return (
        <TouchableOpacity activeOpacity={opacity || 1} onPress={onPress} style={[Theme.GeneralBorder,style]}>
            {children}
        </TouchableOpacity>
    )

}

export default BorderBox;