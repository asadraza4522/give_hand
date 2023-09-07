import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Theme from "../../../theme/theme";
import { FormInput } from "../../../components/FormInput";
import Color from "../../../theme/color";
import { Btn } from "../../../components/btn";
import { addBrand } from '../../../utilies/api/apiController'
import Toast from 'react-native-simple-toast';
import Loader from "../../../components/Loader";


const CreateBrand = ({ navigation }) => {

    const [brandName, setbrandName] = useState('')
    const [errortext, seterrortext] = useState('')
    const [loading, setLoading] = useState(false);


    const submit = async () => {

        if (brandName != '') {

            setLoading(true)

            let resp = await addBrand({ "name": brandName }, navigation)
            if (resp?.data?.error === false) {
                Toast.show(resp?.data?.message, Toast.SHORT)
                setLoading(false)
                setbrandName('')
            } else {

                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                setLoading(false)
            }

        } else {
            seterrortext('empty')
        }

    }



    return (
        <View style={Theme.TabViewCreateInsideContainer}>
            <Loader animating={loading} />
            <Text style={Theme.CreateViewHeading}>Add New Brand</Text>
            <ScrollView style={Theme.ScrollViewMargins} showsVerticalScrollIndicator={false}>

                <FormInput
                    Title={'Brand Name'}
                    placeholder="Brand Title"
                    onChangeText={(data) => { setbrandName(data); seterrortext('') }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialIcons', name: 'texture', color: Color.neutralGray, size: 18 }}
                    value={brandName}
                    error={errortext === 'empty' ? 'Please Enter Category Name' : null}
                />

            </ScrollView>
            <Btn onPress={submit} text="Submit" containerStyle={styles.button} textStyle={Theme.btnTextstyle} />

        </View>
    )

};

const styles = StyleSheet.create({
    button: {
        ...Theme.btnStyle,
        marginBottom: '4%',
        elevation: 5
        // , position: 'absolute', bottom: 20, width: '92%', alignSelf: 'center' 
    }
})

export default CreateBrand;