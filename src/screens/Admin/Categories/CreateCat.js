import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Theme from "../../../theme/theme";
import { FormInput } from "../../../components/FormInput";
import Color from "../../../theme/color";
import { Btn } from "../../../components/btn";
import { addCategory } from '../../../utilies/api/apiController'
import Toast from 'react-native-simple-toast';
import Loader from "../../../components/Loader";
import { launchImageLibrary } from 'react-native-image-picker';
import ImgSmView from "../../../components/ImgSmView";


const CreateCat = ({ navigation }) => {

    const [categoryName, setCategoryName] = useState('')
    const [errortext, seterrortext] = useState('')
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('')


    const launchGallery = async () => {

        let option = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        }

        const result = await launchImageLibrary(option);

        if (result.didCancel) {
            setImage('')
        } else {
            setImage(result)
        }


    }


    const submit = async () => {

        if (categoryName != '') {

            setLoading(true)

            const user = new FormData()

            user.append("name",categoryName)
            
            image != '' && user.append('image', {
                uri: image?.assets[0].uri,
                type: image?.assets[0].type,
                name: image?.assets[0].fileName,
            })

            let resp = await addCategory(user, navigation)
            if (resp?.data?.error === false) {
                Toast.show(resp?.data?.message, Toast.SHORT)
                setLoading(false)
                setImage('')
                setCategoryName('')
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
            <Text style={Theme.CreateViewHeading}>Add New Category</Text>
            <ScrollView style={Theme.ScrollViewMargins} showsVerticalScrollIndicator={false}>

                <FormInput
                    Title={'Category Name'}
                    placeholder="Category Title"
                    onChangeText={(data) => { setCategoryName(data); seterrortext('') }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialIcons', name: 'texture', color: Color.neutralGray, size: 18 }}
                    value={categoryName}
                    error={errortext === 'empty' ? 'Please Enter Category Name' : null}
                />

                <FormInput
                    Component={Text}
                    placeholder="Upload Image"
                    onPress={launchGallery}
                    textInputContainerStyle={Theme.InputView}
                    style={Theme.TextInputStyle}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Octicons', name: 'image', color: Color.neutralGray, size: 18 }}
                    value={image != '' ? "Selected" : ''}
                    error={errortext === 'empty' ? 'Please Enter Category Name' : null}
                />

                <ImgSmView set={setImage} image={image} />

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

export default CreateCat;