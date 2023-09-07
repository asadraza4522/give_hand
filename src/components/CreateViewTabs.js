import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Button, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Color from '../theme/color';
import Theme from '../theme/theme';
import { useSelector } from "react-redux";



const CreateViewTabs = ({ navigation, routeData }) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: routeData.firstTitle },
        { key: 'second', title: routeData.secondTitle },
    ]);

    // _handleIndexChange = (index) => this.setState({ index });

    const renderTabBar = propss => (
        <TabBar
            {...propss}
            indicatorStyle={Theme.TabViewCreateIndicator}
            style={Theme.TabViewCreateContainer}
            activeColor="#000"
            inactiveColor="#7A7578"
            getLabelText={({ route }) => route.title}
            contentContainerStyle={{}}


        />
    );

    const RenderScene = (e, navigation) => {

        switch (e.route.key) {
            case 'first':
                return <routeData.firstComp  navigation={navigation} />;
            case 'second':
                return <routeData.secondComp  navigation={navigation} />;
        }
    };


    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={(e) => RenderScene(e, navigation)}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#152238'

    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});


export default CreateViewTabs;