import React from "react";
import { View, Text, Modal, StyleSheet } from 'react-native'
import Color from "../theme/color";
import { fonts } from "../theme/fonts";
import Theme from "../theme/theme";
import { Btn } from "./btn";


const AlertBox = ({ visible, heading, detail, cancelFun, DoneFun }) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.mainView}>

                <View style={Theme.AlertBoxContainer}>

                    <View style={styles.TextContainer}>
                        <Text style={Theme.AlertBoxHeading}>{heading}</Text>
                        <Text style={styles.detailText}>{detail}</Text>
                    </View>
                    <View style={Theme.DashedBorder} />
                    <View style={styles.ButtonContainer}>
                        <Btn text={"Cancel"} onPress={cancelFun && cancelFun} containerStyle={styles.cancelBtn} textStyle={{ ...Theme.btnTextstyle, paddingVertical: '4%' }} />
                        <Btn text={"Delete"} onPress={DoneFun && DoneFun} containerStyle={styles.OkBtn} textStyle={{ ...Theme.btnTextstyle, paddingVertical: '4%' }} />
                    </View>

                </View>

            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({

    mainView: { flex: 1, justifyContent: 'center' },
    TextContainer: { flex: 2, justifyContent: 'space-between', marginVertical: '1%' },
    detailText: { fontFamily: fonts.regular, fontSize: 12 },
    ButtonContainer: { flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    cancelBtn: { ...Theme.btnStyle, flex: 1, marginTop: 0, backgroundColor: 'lightgrey', borderColor: 'lightgrey' },
    OkBtn: { ...Theme.btnStyle, flex: 1, marginTop: 0 }

})

export default AlertBox;