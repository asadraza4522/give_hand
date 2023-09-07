import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import Theme from "../../../theme/theme";
import { FormInput } from "../../../components/FormInput";
import Color from "../../../theme/color";
import { Btn } from "../../../components/btn";
import Toast from 'react-native-simple-toast';
import Loader from "../../../components/Loader";
import BottomSheet from "../../../components/BottomSheet";
import { SignUpApi } from '../../../utilies/api/apiController';
import { Signup_validation } from '../../../utilies/validation'
import { fonts } from "../../../theme/fonts";


const CreateUsers = ({ navigation }) => {


    const [errortext, setErrortext] = useState('')
    const [loading, setLoading] = useState(false);
    const [searchModalVisible, setsearchModalVisible] = useState(false)
    const [working, selectWorking] = useState('')
    const [fullName, setFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType,setUserType] = useState('')
    const [againPassword, setAgainPassword] = useState('')
    const [typeArray,setTypeArray] = useState(['user','seller'])




    const Submit = async () => {


        let validate = Signup_validation({ fullName, userEmail, password, againPassword, userType })
        if (validate.valid == false) {
            setErrortext(validate.errors);
        } else {
            setErrortext('');
            setLoading(true)
            let user = {
                name: fullName,
                email: userEmail,
                password: password,
                type: userType // seller, user
            }
            let resp = await SignUpApi(user, navigation)
            if (resp?.data?.error === false) {
                Toast.show('Registered Successfully', Toast.SHORT)
                setLoading(false)
            } else {
                Toast.show(resp?.response?.data?.message ? resp?.response?.data?.message : resp.message ? resp.message : 'Something Went Wrong!', Toast.SHORT)
                setLoading(false)
            }

        }

    }

    const clearInputs = () => {



    }



    return (
        <View style={Theme.TabViewCreateInsideContainer}>
            <Loader animating={loading} />
            <Text style={Theme.CreateViewHeading}>Add New User</Text>
            <ScrollView style={Theme.ScrollViewMargins} showsVerticalScrollIndicator={false}>

                <FormInput
                    Title={'Full Name'}
                    placeholder="Full Name"
                    onChangeText={(data) => { setErrortext(''), setFullName(data) }}
                    textInputContainerStyle={Theme.InputView}
                    style={Theme.TextInputStyle}
                    containerStyle={[Theme.TextInputContainer, { marginTop: '8%' }]}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'FontAwesome', name: 'user-o', color: Color.neutralGray, size: 18 }}
                    value={fullName}
                    error={errortext === 'Please enter your name' ? 'Please enter your name' : null}
                />


                <FormInput
                    placeholder="Your Email"
                    onChangeText={(data) => { setErrortext(''), setUserEmail(data) }}
                    textInputContainerStyle={Theme.InputView}
                    style={[Theme.TextInputStyle]}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'FontAwesome', name: 'envelope-o', color: Color.neutralGray, size: 18 }}
                    value={userEmail}
                    error={errortext === 'Please Enter Your Email' ? 'Please Enter Your Email' : errortext === 'Email format is invalid' ? 'Email format is invalid' : null}
                />

                <FormInput
                    placeholder="Password"
                    onChangeText={(data) => { setErrortext(''), setPassword(data) }}
                    textInputContainerStyle={Theme.InputView}
                    style={Theme.TextInputStyle}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Feather', name: 'lock', color: Color.neutralGray, size: 18 }}
                    value={password}
                    error={errortext === 'Please enter your password' ? 'Please enter your password' : errortext === 'Password Should have atleast 6 digits' ? 'Password Should have atleast 6 digits' : null}
                />

                <FormInput
                    placeholder="Password Again"
                    onChangeText={(data) => { setErrortext(''), setAgainPassword(data) }}
                    textInputContainerStyle={Theme.InputView}
                    style={Theme.TextInputStyle}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'Feather', name: 'lock', color: Color.neutralGray, size: 18 }}
                    value={againPassword}
                    error={errortext === 'Please enter repeat password' ? 'Please enter repeat password' : errortext === 'Both password should be same' ? 'Both password should be same' : null}
                />

                <FormInput
                    Component={Text}
                    Title={'Choose User'}
                    placeholder={"User Type"}
                    onPress={() => { setsearchModalVisible(true); setErrortext('');}}
                    textInputContainerStyle={Theme.InputView}
                    style={Theme.TextInputStyle}
                    containerStyle={Theme.TextInputContainer}
                    placeholderTextColor={Color.AuthInputsPlaceholder}
                    leftIcon={{ family: 'MaterialIcons', name: 'branding-watermark', color: Color.neutralGray, size: 18 }}
                    rightIcon={userType != '' && { family: 'Entypo', name: 'cross', color: Color.neutralGray, size: 18, onPress: () => setUserType('') }}
                    value={userType}
                    error={errortext === 'Please Select User Type' ? 'Please Select User Type' : null}
                />

            </ScrollView>
            <Btn onPress={Submit} text="Submit" containerStyle={styles.button} textStyle={Theme.btnTextstyle} />
                
            <BottomSheet width={'90%'} height={'30%'} middle modalVisible={searchModalVisible} setModalVisibility={setsearchModalVisible}>
                {typeArray.map((i,j)=>(
                    <TouchableOpacity onPress={()=>(setUserType(i),setsearchModalVisible(false))} key={j} style={styles.typeListContainer}>
                    <Text style={{...styles.typeText,flex:0.1}}>{j+1}</Text>
                    <Text style={styles.typeText}>{i}</Text>
                    </TouchableOpacity>
                ))}
            </BottomSheet>

        </View>
    )

};

const styles = StyleSheet.create({
    button: {
        ...Theme.btnStyle,
        marginBottom: '4%',
        elevation: 5,
        // , position: 'absolute', bottom: 20, width: '92%', alignSelf: 'center' 
    },
    typeListContainer:{flexDirection:'row',marginTop:'2%'},
    typeText:{fontFamily:fonts.regular,textAlign:'left',textAlignVertical:'center'}
})

export default CreateUsers;