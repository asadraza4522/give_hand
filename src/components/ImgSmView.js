import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native'
import { baseURL } from "../utilies/api/instance";
import RNVICustom from "../utilies/RNVICustom";


const ImgSmView = ({ image,set }) => {


    return (
        <>
            {image != '' &&

                <View style={styles.mainView}>
                    <RNVICustom onPress={() => { set('') }} style={styles.cancel} Ccolor={'white'} Cname={'cross'} Csize={20} Lib={'Entypo'} />
                    {image?.assets !== undefined ?
                        <Image
                            style={styles.img}
                            resizeMode='center'
                            source={{ uri: 'data:image/jpg;base64,' + image?.assets[0]?.base64 }}
                        /> :
                        <Image
                            style={styles.img}
                            resizeMode='center'
                            source={{ uri: image }}
                        />

                    }
                </View>

            }
        </>
    )


}

const styles = StyleSheet.create({
    mainView: { width: 80, height: 120, marginTop: 10, alignSelf: 'center' },
    cancel: { position: 'absolute', top: -10, zIndex: 1, backgroundColor: 'black', borderRadius: 10 },
    img: { flex: 1, height: null, width: null }
})


export default ImgSmView;