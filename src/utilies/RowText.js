import React from 'react'
import { Text, View } from 'react-native'
import Color from '../theme/color'
import Theme from '../theme/theme'

const RowText = ({ first, second, style }) => {

    return (
        <View style={[Theme.rowbetween,{marginVertical: 6},style]}>
            <Text style={{ ...Theme.ListBetweenText, opacity:0.5 }} >{first}</Text>
            <Text style={{ ...Theme.ListBetweenText, textAlign: 'right', width:'60%' }} numberOfLines={2} >{second}</Text>
        </View>
    )

}

export default RowText;