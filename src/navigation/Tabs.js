import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import RNVICustom from '../utilies/RNVICustom';
import Color from '../theme/color';
import Theme from '../theme/theme';
import Cart from '../screens/Home/Cart';
import Account from '../screens/Home/Account';
import Chat from '../screens/Home/Chat';
import Explore from '../screens/Home/Explore';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {...Theme.TabsViewTitle},
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: Color.borderColors,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: tabOpt => {
            return (
              <RNVICustom
                Ccolor={tabOpt.focused ? Color.ThemeColor : Color.neutralGray}
                Lib={'AntDesign'}
                Cname={'home'}
                Csize={24}
              />
            );
          },
        }}
        component={Home}
      />
      {/* <Tab.Screen name="Explore" options={{
        headerShown: false, tabBarIcon: (tabOpt) => {
          return (
            <RNVICustom Ccolor={tabOpt.focused ? Color.ThemeColor : Color.neutralGray} Lib={'AntDesign'} Cname={'search1'} Csize={24} />
          )
        }
      }} component={Explore} /> */}
      <Tab.Screen
        name="Chat"
        options={{
          title: 'Chats',
          tabBarIcon: tabOpt => {
            return (
              <RNVICustom
                Ccolor={tabOpt.focused ? Color.ThemeColor : Color.neutralGray}
                Lib={'Ionicons'}
                Cname={'chatbubbles-outline'}
                Csize={24}
              />
            );
          },
        }}
        component={Chat}
      />
      <Tab.Screen
        name="Cart"
        options={{
          title: 'Your Cart',
          tabBarIcon: tabOpt => {
            return (
              <>
                <RNVICustom
                  Ccolor={tabOpt.focused ? Color.ThemeColor : Color.neutralGray}
                  Lib={'AntDesign'}
                  Cname={'shoppingcart'}
                  Csize={24}
                />
              </>
            );
          },
        }}
        component={Cart}
      />
      <Tab.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: tabOpt => {
            return (
              <RNVICustom
                Ccolor={tabOpt.focused ? Color.ThemeColor : Color.neutralGray}
                Lib={'AntDesign'}
                Cname={'user'}
                Csize={24}
              />
            );
          },
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}
