import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Theme from "../../theme/theme";
import Color from "../../theme/color";
import ThemeRect from "../../components/ThemeRect";
import { get_data } from "../../utilies/AsyncStorage/AsyncStorage";
import { ApiStatus } from "../../utilies/api/ApiValidation";
import { changeScreens, setHomeProducts } from '../../redux/MainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from "../../utilies/AsyncStorage/AsyncStorage";
import { getProductsUser, getProductsCart, getProductsCategories } from "../../utilies/api/apiCalls";

const Splash = ({ navigation }) => {

    const dispatch = useDispatch()

    const navigateTo = (screen) => {

        navigation.replace(screen)

    }

    const checkToken = async () => {
        // Logout(navigation,dispatch)

        let user_data = await get_data('@userData')

        if (user_data !== null) {

            let response = await ApiStatus(navigation)
            if (!response && response !== undefined) {

                if (user_data.type === 'user') {

                    if (await getProductsCart(navigation, user_data.id, dispatch) == true) {

                        getProductsUser(navigation, 1, '', dispatch)
                        getProductsCategories(navigation, 1, 10, dispatch)

                        setTimeout(() => {
                            dispatch(changeScreens(user_data.type))
                        }, 2000)

                    }

                } else {
                    dispatch(changeScreens(user_data.type))
                }


            } else {
                navigateTo('Login')
            }

        } else {
            navigateTo('Login')
        }

    };

    useEffect(() => {
        checkToken()
    }, [])

    return (

        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor={Color.ThemeColor} />
            <ThemeRect back={'white'} front={Color.ThemeColor} />
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    mainContainer: [Theme.container, { backgroundColor: Color.ThemeColor, justifyContent: 'center', alignItems: 'center' }]
})

export default Splash;