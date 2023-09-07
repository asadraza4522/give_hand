import React from "react";
import { TouchableOpacity, Image, View, Text } from 'react-native'
import Theme from "../theme/theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { baseURL } from "../utilies/api/instance";


const OrderCard = ({ index, item, navigation, status, onPress }) => {

    const BtnFun = () => navigation.navigate('OrderDetails', { item, index })

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress ? onPress : BtnFun} style={Theme.OrderCardMain}>
            <View style={{ flexDirection: 'row' }}>
                <Image resizeMode='center' style={{ width: wp('12%'), height: wp('12%'), borderRadius:wp('12%') }} source={item?.userID?.avatar !== undefined ? {uri:item?.userID?.avatar} : {uri:baseURL + '/' + 'assets/noimage.png'} } />
                <View style={Theme.OrderCardRightContainer}>
                    <View>
                        <Text style={Theme.OrderCardTitle}>{item?.userID?.name}</Text>
                        <Text style={Theme.OrderCardSub}>Date: {new Date(item?.createdAt).toDateString()}{'\n'}Items ({item?.total_items})</Text>
                    </View>
                    <Text style={Theme.Number}>Rs. {item?.amount}</Text>
                </View>
            </View>
            {
                status &&
                <>
                    <View style={Theme.DashedBorder} />
                    <Text style={Theme.OrderCardStatus}>Order: {item?.status}</Text>
                </>
            }
        </TouchableOpacity>
    )

};

export default OrderCard;