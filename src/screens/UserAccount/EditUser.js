import React, { useState } from 'react'
import { SafeAreaView, Text, StatusBar, FlatList, Image, View, StyleSheet, ScrollView, Platform } from 'react-native'
import Theme from '../../theme/theme';
import Color from '../../theme/color';
import { Btn } from '../../components/btn';
import { FormInput } from '../../components/FormInput';
import StatusBarDTWC from '../../components/StatusBarDTWC';
import { fonts } from '../../theme/fonts';
import { Edit_Profile_Valid } from '../../utilies/validation'
import { EditUserApi, UpdateUserImageApi } from '../../utilies/api/apiController'
import { get_data, save_data } from '../../utilies/AsyncStorage/AsyncStorage';
import Toast from 'react-native-simple-toast';
import ProfileImage from '../../components/ProfileImage';
import { launchImageLibrary } from 'react-native-image-picker';

const EditUser = ({ navigation, route }) => {

    const { userData } = route.params;

    const [fullName, setFullName] = useState(userData?.name)
    const [email, setEmail] = useState(userData?.email)
    const [phone, setPhone] = useState(userData?.mobile)
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [gender, setGender] = useState(userData?.gender)
    const [previousPassword, setPreviousPassword] = useState(userData?.password)
    const [errortext, setErrortext] = useState('')
    const [GenderList, setGenderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageLoader, setImageLoader] = useState(false)

    const launchGallery = async () => {

        setImageLoader(true)

        let option = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        }

        const result = await launchImageLibrary(option);

        if (result.didCancel) {
            setImageLoader(false)
        } else {

            const user = await get_data('@userData')
            const body = new FormData()

            body.append('id',user.id)
            body.append('prevImage',user.avatar)
            body.append('image', {
                uri: result?.assets[0].uri,
                type: result?.assets[0].type,
                name: result?.assets[0].fileName,
            })

            let resp = await UpdateUserImageApi(body, navigation)
            if (resp?.data?.error === false) {
                
                Toast.show("User Image Updated", Toast.SHORT)
                user.avatar = resp?.data?.data?.avatar
                userData.avatar = resp?.data?.data?.avatar
                await save_data('@userData',user)
                setImageLoader(false)

            } else {
                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                setImageLoader(false)
            }

        }



    }

    const editUserProfile = async () => {

        try {

            let validate = Edit_Profile_Valid({ fullName, gender, oldPassword, confirmPassword, newPassword, previousPassword })
            if (validate.valid == false) {
                setErrortext(validate.errors);
            } else {

                setLoading(true)

                let user_data = await get_data('@userData')

                let body = {
                    id: user_data.id,
                    userData: {
                        name: fullName,
                        mobile: phone,
                        gender: gender
                    }
                }

                if (oldPassword === previousPassword && confirmPassword === newPassword) {
                    body.userData.password = newPassword
                }

                let resp = await EditUserApi(body, navigation)

                if (resp?.data.error === false) {

                    Toast.show("Profile Updated", Toast.SHORT)
                    navigation.goBack()

                } else {
                    Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                }
                setLoading(false)

            }

        } catch (error) {
            console.log(error, "Error");
            setLoading(false)
        }

    }


    return (
        <SafeAreaView style={Theme.container}>
            <StatusBarDTWC />
            <Loader animating={loading} />
            <View style={styles.TopContainer}>
                <ProfileImage userData={userData} Loader={imageLoader} iconOnPress={launchGallery} />
                <View style={styles.TextContainer}>
                    <Text style={styles.nameText}>{userData?.name}</Text>
                    <Text style={styles.emailText}>{userData?.email}</Text>
                </View>
            </View>

            <ScrollView style={{ marginBottom: 5 }}>

                <FormInput
                    placeholder="Full Name"
                    onChangeText={(data) => { setErrortext(''), setFullName(data) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialCommunityIcons', name: 'music-accidental-natural', color: Color.neutralGray, size: 18 }}
                    value={fullName}
                    error={errortext === 'Please enter your name' ? 'Please enter your name' : null}
                />

                <FormInput
                    Component={Text}
                    placeholder="Email"
                    textInputContainerStyle={[Theme.InputView, { opacity: 0.8 }]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Entypo', name: 'email', color: Color.neutralGray, size: 18 }}
                    value={email}
                // error={errortext === 'Please Enter UserName' ? 'Please Enter UserName' : errortext === 'Email format is invalid' ? 'Email format is invalid' : null}
                />

                <FormInput
                    placeholder="Mobile Number"
                    onChangeText={(data) => { setErrortext(''), setPhone(data.trim()) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Fontisto', name: 'mobile-alt', color: Color.neutralGray, size: 18 }}
                    value={phone}
                />

                <FormInput
                    ListData={GenderList}
                    Component={Text}
                    placeholder="Gender"
                    onPress={() => { setGenderList(GenderList.length > 0 ? [] : ['Male', 'Female']) }}
                    ListOnPress={(data) => { setGender(data); setGenderList([]) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'FontAwesome', name: 'certificate', color: Color.neutralGray, size: 18 }}
                    value={gender}
                    error={errortext === 'Please Select Gender' ? 'Please Select Gender' : null}
                />

                <View style={[Theme.DashedBorder, Platform.OS == 'ios' && { borderStyle: 'solid' }]} />

                <FormInput
                    Title={'Old Password'}
                    placeholder="Old Passowrd"
                    onChangeText={(data) => { setErrortext(''), setOldPassword(data) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialCommunityIcons', name: 'onepassword', color: Color.neutralGray, size: 18 }}
                    value={oldPassword}
                    error={errortext === 'Old password is incorrect' ? 'Old password is incorrect' : errortext === 'Old Password Required' ? 'Old Password Required' : null}
                />

                <FormInput
                    placeholder="New Passowrd"
                    onChangeText={(data) => { setErrortext(''), setNewPassword(data) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialCommunityIcons', name: 'onepassword', color: Color.neutralGray, size: 18 }}
                    value={newPassword}
                    error={errortext === 'New Password & Confirm Password Does Not Match' ? 'New Password & Confirm Password Does Not Match' : null}
                />

                <FormInput
                    placeholder="Confirm new Password"
                    onChangeText={(data) => { setErrortext(''), setConfirmPassword(data) }}
                    textInputContainerStyle={[Theme.InputView]}
                    style={[Theme.TextInputStyle]}
                    containerStyle={{ ...Theme.TextInputContainer, marginBottom: '4%' }}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Entypo', name: 'documents', color: Color.neutralGray, size: 18 }}
                    value={confirmPassword}
                    error={errortext === 'New Password & Confirm Password Does Not Match' ? 'New Password & Confirm Password Does Not Match' : errortext === 'Confirm Password is required' ? 'Confirm Password is required' : null}
                />

                <View style={[Theme.DashedBorder, Platform.OS == 'ios' && { borderStyle: 'solid' }]} />
            </ScrollView>


            <Btn text="Update Profile" onPress={editUserProfile} containerStyle={{ ...Theme.btnStyle, marginBottom: 20 }} textStyle={Theme.btnTextstyle} />
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({

    TopContainer: { marginVertical: '6%', marginHorizontal: '4%', flexDirection: 'row' },
    TextContainer: { justifyContent: 'space-between', padding: '4%' },
    nameText: { color: Color.headingColor, fontSize: 14, fontFamily: fonts.bold },
    emailText: { fontFamily: fonts.regular, color: Color.neutralGray, fontSize: 12 }

})

export default EditUser