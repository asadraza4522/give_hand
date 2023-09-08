import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Theme from '../theme/theme';
import Color from '../theme/color';
import RNVICustom from '../utilies/RNVICustom';
import {Logout} from '../utilies/AsyncStorage/AsyncStorage';
import {useDispatch, useSelector} from 'react-redux';

// Add User imports here //
import Splash from '../screens/Auth/Splash';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import HomeTabs from './Tabs';
import HomeSearch from '../screens/Home/HomeSearch';
import UserProfile from '../screens/UserAccount/UserProfile';
import EditUser from '../screens/UserAccount/EditUser';
import ProductDetails from '../screens/Details/ProductDetails';
import ShippingDetails from '../screens/Details/ShippingDetails';
import Orders from '../screens/UserAccount/Orders';
import OrderDetails from '../screens/Details/OrderDetails';
import SearchProductResult from '../screens/Details/SearchProductResult';
// Add User imports here //

// Admin screen imports here //

import ACategories from '../screens/Admin/Categories/ACategories';
import AHome from '../screens/Admin/AHome';
import EditCat from '../screens/Admin/Categories/EditCat';
import ABrands from '../screens/Admin/Brands/ABrands';
import EditBrand from '../screens/Admin/Brands/EditBrand';
import AProducts from '../screens/Admin/Products/AProducts';
import EditProduct from '../screens/Admin/Products/EditProduct';
import AUsers from '../screens/Admin/Users/AUsers';
import AllOrders from '../screens/Admin/Orders/AllOrders';
import CardPayment from '../screens/Home/CardPayment';
import StripeAccount from '../screens/Auth/StripeAccount';
import AddNewChat from '../screens/Chats/AddNewChat';
import ChatMessages from '../screens/Chats/ChatMessages';
import CommentView from '../components/comment/CommentView';
import ACard from '../screens/Admin/Cards/ACard';
import EditCard from '../screens/Admin/Cards/EditCard';
import CardDetails from '../screens/Cards/CardDetails';
import CardListScreen from '../screens/Cards/CardListScreen';
import AddNewFeed from '../screens/Feeds/AddNewFeed';

// Admin screen imports here //

const Routes = () => {
  const runningScreens = useSelector(state => state.main.screens);

  return (
    <NavigationContainer>
      {runningScreens === 's' ? (
        <StartScreens />
      ) : runningScreens === 'user' ? (
        <UserRoutes />
      ) : runningScreens === 'seller' ? (
        <AdminRoutes />
      ) : null}
    </NavigationContainer>
  );
};

const UserStack = createStackNavigator();

const UserRoutes = () => {
  return (
    <UserStack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: Color.borderColors,
        },
      }}>
      <UserStack.Screen
        options={{headerShown: false}}
        name="HomeTabs"
        component={HomeTabs}
      />
      <UserStack.Screen
        options={{headerShown: false}}
        name="HomeSearch"
        component={HomeSearch}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'User Profile',
        }}
        name="UserProfile"
        component={UserProfile}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Edit User',
        }}
        name="EditUser"
        component={EditUser}
      />
      <UserStack.Screen
        options={{headerTitleStyle: {...Theme.TabsViewTitle}, title: 'Ship To'}}
        name="ShippingDetails"
        component={ShippingDetails}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Card Details',
          headerBackTitle: 'Your Cart',
        }}
        name="CardPayment"
        component={CardPayment}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Card List',
          headerBackTitle: 'Home',
        }}
        name="CardListScreen"
        component={CardListScreen}
      />
      <UserStack.Screen
        options={{headerTitleStyle: {...Theme.TabsViewTitle}, title: 'Order'}}
        name="Orders"
        component={Orders}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Order Details',
        }}
        name="OrderDetails"
        component={OrderDetails}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Product Details',
        }}
        name="ProductDetails"
        component={ProductDetails}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Card Details',
        }}
        name="CardDetails"
        component={CardDetails}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'SearchProductResult',
          headerShown: false,
        }}
        name="SearchProductResult"
        component={SearchProductResult}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'New Chat Room',
          headerBackTitle: 'Your Chats',
        }}
        name="AddNewChatRoom"
        component={AddNewChat}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Add Your Feed',
          headerBackTitle: 'Feeds',
        }}
        name="AddNewFeed"
        component={AddNewFeed}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Messages',
          headerBackTitle: 'Your Chats',
        }}
        name="ChatMessages"
        component={ChatMessages}
      />
      <UserStack.Screen
        options={{
          headerTitleStyle: {...Theme.TabsViewTitle},
          title: 'Comments',
          headerBackTitle: 'Product Details',
        }}
        name="CommentView"
        component={CommentView}
      />
    </UserStack.Navigator>
  );
};

const AdminStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <RNVICustom
            onPress={() => navigation.toggleDrawer()}
            style={{marginLeft: '6%'}}
            Ccolor={Color.white}
            Cname={'menu'}
            Csize={22}
            Lib={'Entypo'}
          />
        ),
        headerRight: () => (
          <RNVICustom
            onPress={async () => {
              await Logout(navigation, dispatch);
            }}
            style={{marginRight: '6%'}}
            Ccolor={Color.white}
            Cname={'logout'}
            Csize={22}
            Lib={'MaterialIcons'}
          />
        ),
        headerStyle: {backgroundColor: Color.ThemeColor},
        headerTitleStyle: {color: Color.white},
        drawerActiveBackgroundColor: Color.ThemeColor,
        drawerActiveTintColor: Color.white,
      })}
      initialRouteName="AHome">
      <Drawer.Screen
        options={{headerTitle: 'Home', drawerLabel: 'Home'}}
        name="AHome"
        component={AHome}
      />
      <Drawer.Screen
        options={{headerTitle: 'All Orders', drawerLabel: 'All Orders'}}
        name="AllOrders"
        component={AllOrders}
      />
      <Drawer.Screen
        options={{headerTitle: 'Products', drawerLabel: 'Products'}}
        name="AProducts"
        component={AProducts}
      />
      <Drawer.Screen
        options={{headerTitle: 'Cards', drawerLabel: 'Cards'}}
        name="ACard"
        component={ACard}
      />
    </Drawer.Navigator>
  );
};

const AdminRoutes = () => {
  return (
    <AdminStack.Navigator
      initialRouteName="AdminDrawer"
      screenOptions={{
        headerTitleStyle: {...Theme.TabsViewTitle, color: 'white'},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: Color.borderColors,
          backgroundColor: Color.ThemeColor,
        },
        headerTintColor: 'white',
      }}>
      <AdminStack.Screen
        options={{title: 'Categories'}}
        name="ACategories"
        component={ACategories}
      />
      <AdminStack.Screen
        options={{title: 'Brands'}}
        name="ABrands"
        component={ABrands}
      />
      {/* <AdminStack.Screen options={{ title: 'Products' }} name="AProducts" component={AProducts} /> */}
      <AdminStack.Screen
        options={{title: 'Products'}}
        name="AProducts"
        component={AProducts}
      />
      <AdminStack.Screen
        options={{title: 'Cards'}}
        name="ACard"
        component={ACard}
      />
      <AdminStack.Screen
        options={{title: 'Edit Category'}}
        name="EditCat"
        component={EditCat}
      />
      <AdminStack.Screen
        options={{title: 'Edit Product'}}
        name="EditProduct"
        component={EditProduct}
      />
      <AdminStack.Screen
        options={{title: 'Edit Card'}}
        name="EditCard"
        component={EditCard}
      />
      <AdminStack.Screen
        options={{title: 'Edit Brand'}}
        name="EditBrand"
        component={EditBrand}
      />
      {/* <AdminStack.Screen options={{ title: 'All Orders' }} name="AllOrders" component={AllOrders} /> */}
      <AdminStack.Screen
        options={{headerShown: false}}
        name="AdminDrawer"
        component={AdminDrawer}
      />
      <AdminStack.Screen
        options={{headerTitleAlign: 'center', title: 'Home'}}
        name="AUsers"
        component={AUsers}
      />
      <AdminStack.Screen
        options={{title: 'Order Details'}}
        name="OrderDetails"
        component={OrderDetails}
      />
    </AdminStack.Navigator>
  );
};

const StartingStack = createStackNavigator();

const StartScreens = () => {
  return (
    <StartingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Splash">
      <StartingStack.Screen name="Splash" component={Splash} />
      <StartingStack.Screen name="Login" component={Login} />
      <StartingStack.Screen name="StripeAccount" component={StripeAccount} />
      <StartingStack.Screen name="SignUp" component={SignUp} />
    </StartingStack.Navigator>
  );
};

export default Routes;
