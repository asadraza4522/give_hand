import React from "react";
import { SafeAreaView } from 'react-native'
import CreateViewTabs from "../../../components/CreateViewTabs";
import Theme from "../../../theme/theme";
import CreateBrand from "./CreateBrand";
import ViewBrand from "./ViewBrand";



const ABrands = ({ navigation,route }) => {

    const routeData = {
        firstComp: ViewBrand,
        firstTitle: 'Brands',
        secondComp: CreateBrand,
        secondTitle: 'Add Brand',
    }

    return (
        <SafeAreaView style={Theme.containerOffWhite}>
            <CreateViewTabs navigation={navigation} routeData={routeData} />
        </SafeAreaView>
    )

};

export default ABrands;