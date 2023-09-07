import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import Color from "../theme/color";



export default Loader = ({animating,transparent}) => {
    return (
        <Modal visible={animating} transparent={(transparent !== undefined && transparent == false) ? false : true}>
            <ActivityIndicator style={{ flex: 1 }} size="large" color={Color.ThemeColor} animating={animating} />
        </Modal>
    )
}