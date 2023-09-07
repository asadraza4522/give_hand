import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import Theme from "../../../theme/theme";
import { FormInput } from "../../../components/FormInput";
import Color from "../../../theme/color";
import { Btn } from "../../../components/btn";
import { editAdminCategoriesApi } from '../../../utilies/api/apiController'
import Toast from 'react-native-simple-toast';
import Loader from "../../../components/Loader";
import ImgSmView from "../../../components/ImgSmView";
import { launchImageLibrary } from 'react-native-image-picker';


const EditCat = ({ navigation, route }) => {


    let { categoryData, index } = route.params;

    const [categoryName, setCategoryName] = useState('')
    const [errortext, seterrortext] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const [prevImage, setPrevImage] = useState('')

    useEffect(() => {

        setCategoryName(categoryData.name)
        setImage(categoryData?.image ? categoryData?.image : '')
        setPrevImage(categoryData?.image ? categoryData?.image : '')

    }, [])

    const launchGallery = async () => {

        let option = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
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

            const body = new FormData()

            if (prevImage != '') {

                if (image != prevImage) {
                    if (image == '') {
                        body.append('image', '')
                    } else {

                        body.append('image', {
                            uri: image?.assets[0].uri,
                            type: image?.assets[0].type,
                            name: image?.assets[0].fileName,
                        })

                    }
                    body.append('prevImage', prevImage)
                }

            } else {

                if (image != '') {

                    body.append('image', {
                        uri: image?.assets[0].uri,
                        type: image?.assets[0].type,
                        name: image?.assets[0].fileName,
                    })

                }
            }

            let resp = await editAdminCategoriesApi({ "name": categoryName, "_id": categoryData._id }, navigation)
            if (resp?.data?.error === false) {
                Toast.show(resp?.data?.message, Toast.SHORT)
                setLoading(false)
                let itemUpdate = categoryData
                itemUpdate.name = categoryName
                navigation.navigate('ACategories', { itemUpdate })
            } else {

                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                setLoading(false)
            }

        } else {
            seterrortext('empty')
        }

    }



    return (
        <SafeAreaView style={Theme.TabViewCreateInsideContainer}>
            <Loader animating={loading} />
            <Text style={Theme.CreateViewHeading}>Edit Category Name</Text>
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
                    textInputContainerStyle={[Theme.InputView]}
                    style={Theme.TextInputStyle}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Octicons', name: 'image', color: Color.neutralGray, size: 18 }}
                    value={image != '' ? "Selected" : ''}

                />

                <ImgSmView set={setImage} image={image} />

            </ScrollView>
            <Btn onPress={submit} text="Update" containerStyle={styles.button} textStyle={Theme.btnTextstyle} />

        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    button: {
        ...Theme.btnStyle,
        marginBottom: '4%',
        elevation: 5
    }
})

export default EditCat;