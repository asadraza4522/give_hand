import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Theme from '../../theme/theme';
import { Btn } from '../../components/btn'
import { changeScreens } from '../../redux/MainSlice';
import { useDispatch } from 'react-redux';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import Loader from '../../components/Loader';
import { createStripeAccount, EditUserApi } from '../../utilies/api/apiController'
import { get_data } from "../../utilies/AsyncStorage/AsyncStorage";

const StripeAccount = ({ navigation }) => {
    const dispatch = useDispatch()
    const [showWebView, setShowWebView] = useState(false)
    const [url, setURL] = useState('')
    const [loading, setLoading] = useState(false);


    const Submit = async () => {
        setLoading(true)
        const response = await createStripeAccount(navigation)
        if (response.status == 200) {
            setURL(response.data?.url)
            setShowWebView(true)
        }
        setLoading(false)
    }



    const onConfirm = async (e) => {
        if (e?.url == "https://ecommerce-app-kohl.vercel.app/complete") {
            const { id } = await get_data('@userData')
            const body = {
                id,
                userData: {
                    is_stripe_connected: true
                }
            }
            const resp = await EditUserApi(body, navigation)
            if (resp?.data.error === false) {
                dispatch(changeScreens('seller'))
            }
        }
    }
    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />
            <Loader animating={loading} />
            {showWebView ?
                <WebView
                    onNavigationStateChange={onConfirm}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    source={{ uri: url }}
                />
                :
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Image resizeMode="contain" style={{ height: 100, width: 100, alignSelf: 'center' }} source={require('../../assets/stripe.png')} />
                    <Text style={Theme.subHeading}>You are not Connected to Stripe</Text>
                    <Btn onPress={Submit} text="Connect" containerStyle={[Theme.btnStyle]} textStyle={Theme.btnTextstyle} />
                </View>
            }

        </SafeAreaView>
    )

};


export default StripeAccount;