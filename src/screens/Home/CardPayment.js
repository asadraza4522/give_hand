import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Image, Modal, Text } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { FormInput } from "../../components/FormInput";
import { fonts } from "../../theme/fonts";
import RNVICustom from "../../utilies/RNVICustom";
import Theme from "../../theme/theme";
import Color from "../../theme/color";
import { Btn } from "../../components/btn";
import StatusBarDTWC from "../../components/StatusBarDTWC";
import { sellerPayment } from "../../utilies/api/apiController";
import Loader from "../../components/Loader";

const CardPayment = ({ navigation, route }) => {
    const [number, setNumber] = useState('4242424242424242')
    const [loading, setLoading] = useState(false);
    const [successModal, setSuccessModal] = useState(false)
    const [exp_month, setExpMonth] = useState('12')
    const [exp_year, setExpYear] = useState('2024')
    const [cvc, setCVC] = useState('123')
    const enableButton = () => {
        if (number !== "" && exp_month !== "" && exp_year !== "" && cvc !== "") {
            return false
        } else {
            return true
        }
    }

    const goToHome = () => {
        setSuccessModal(false)
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeTabs" }],
        });
    }

    const payment = async () => {

        const body = {
            order_id: route.params?.order_id,
            card:{
                number,
                exp_month,
                exp_year,
                cvc
            },
            currency: "usd"
        }


        setLoading(true)
        const response = await sellerPayment(body, navigation)
        if (response.status == 200) {
            setSuccessModal(true)
        }else{
        setTimeout(() => {
            SimpleToast.show(response.data?.code, SimpleToast.LONG)
        }, 500)
        }
        setLoading(false)

    }
    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />
            <Loader animating={loading} />
            <Image resizeMode="contain" style={{ height: 100, width: 100, alignSelf: 'center' }} source={require('../../assets/stripe.png')} />
            <FormInput
                placeholder="Your Card Number"
                onChangeText={(data) => { setNumber(data) }}
                keyboardType='number-pad'
                textInputContainerStyle={[Theme.InputView]}
                style={[Theme.TextInputStyle]}
                containerStyle={Theme.TextInputContainer}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={number}
            />
            <FormInput
                placeholder="Your Expiry Month"
                keyboardType='number-pad'
                onChangeText={(data) => { setExpMonth(data) }}
                textInputContainerStyle={[Theme.InputView]}
                style={[Theme.TextInputStyle]}
                containerStyle={Theme.TextInputContainer}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={exp_month}
            />
            <FormInput
                placeholder="Your Expiry Year"
                keyboardType='number-pad'
                onChangeText={(data) => { setExpYear(data) }}
                textInputContainerStyle={[Theme.InputView]}
                style={[Theme.TextInputStyle]}
                containerStyle={Theme.TextInputContainer}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={exp_year}
            />
            <FormInput
                placeholder="Your CVC"
                onChangeText={(data) => { setCVC(data) }}
                keyboardType='number-pad'
                textInputContainerStyle={[Theme.InputView]}
                style={[Theme.TextInputStyle]}
                containerStyle={Theme.TextInputContainer}
                placeholderTextColor={Color.AuthInputsPlaceholder}
                value={cvc}
            />

            <Btn disabled={enableButton()} onPress={payment} text="Continue" containerStyle={[styles.btnMainStyle]} textStyle={styles.btnTxtStyle} />


            <Modal
                onRequestClose={goToHome}
                visible={successModal}
            >
                <View style={styles.successModal}>
                    <RNVICustom Lib={'Ionicons'} Ccolor={Color.ThemeColor} Cname={'checkmark-done-circle'} Csize={100} />
                    <Text style={styles.successModalHeading}>Success</Text>
                    <Text style={styles.successModalSubHeading}>Thank Your For Shopping At Give Hand</Text>
                    <Btn onPress={goToHome} text="Continue Shopping" containerStyle={[styles.btnMainStyle, { width: '75%' }]} textStyle={styles.btnTxtStyle} />
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    btnMainStyle: { ...Theme.btnStyle, marginTop: '2%', marginBottom: '4%' },
    btnTxtStyle: { ...Theme.btnTextstyle, paddingVertical: 10 },

    successModalHeading: { fontFamily: fonts.bold, fontSize: 24, color: 'black' },
    successModalSubHeading: { fontFamily: fonts.regular, fontSize: 12, color: 'grey', marginBottom: 16, marginTop: 8 },
    successModal: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    mainAddressView: { ...Theme.GeneralBorder, marginHorizontal: '4%', marginVertical: '2%', padding: '2%' }

})
export default CardPayment