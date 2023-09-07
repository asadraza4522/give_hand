import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Color from '../theme/color'
import RNVICustom from '../utilies/RNVICustom';
import Theme from '../theme/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const IconText = ({ navigation, item,adminCard, ...props }) => {
    
    return (
        <TouchableOpacity {...props} style={[Theme.IconTextMainStyle,adminCard && Theme.adminCardFeature,props.style]}>
            <View style={[Theme.iconTextIconContainer, item?.icon?.color && { borderColor: item?.icon?.color }]}>
                {item?.icon
                    ? <RNVICustom Cname={item?.icon?.name} Csize={wp('6%')} Lib={item?.icon?.lib} Ccolor={item?.icon?.color ? item?.icon?.color : Color.ThemeColor} />
                    : item?.image ? <Image resizeMode='center' source={require('../assets/userImage.png')} />
                        : <RNVICustom Cname={'category'} Csize={wp('6%')} Lib={'MaterialIcons'} Ccolor={Color.ThemeColor} />
                }
            </View>
            <Text style={Theme.iconTextFontContainer}>{item?.title || item?.name}</Text>
        </TouchableOpacity>
    )

}

export default IconText;