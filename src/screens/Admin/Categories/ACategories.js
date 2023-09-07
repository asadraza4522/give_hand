import React from "react";
import { SafeAreaView } from 'react-native'
import CreateViewTabs from "../../../components/CreateViewTabs";
import Theme from "../../../theme/theme";
import CreateCat from "./CreateCat";
import ViewCat from "./ViewCat";



const ACategories = ({ navigation }) => {

    const routeData = {
        firstComp: ViewCat,
        firstTitle: 'Categories',
        secondComp: CreateCat,
        secondTitle: 'Add Category',
    }

    return (
        <SafeAreaView style={Theme.containerOffWhite}>
            <CreateViewTabs navigation={navigation} routeData={routeData} />
        </SafeAreaView>
    )

};

export default ACategories;