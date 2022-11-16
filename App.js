import * as React from 'react';
import 'react-native-gesture-handler';
import {Provider, useDispatch, useSelector, createStore, combineReducers} from "react-redux";
import store from "./src/store";
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeIcon from "./src/assets/tab_bar_icons/Home.svg";
import ExploreIcon from "./src/assets/tab_bar_icons/Explore.svg";
import OrderIcon from "./src/assets/tab_bar_icons/Order.svg";
import NotificationIcon from "./src/assets/tab_bar_icons/Notification.svg";
import ProfileIcon from "./src/assets/tab_bar_icons/Profile.svg";
 
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import ExploreScreen from './src/screen/ExploreScreen';
import OrdersScreen from './src/screen/OrdersScreen';
import NotificationScreen from './src/screen/NotificationScreen';
 
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Page' }}/>
      </Stack.Navigator>
  );
}
 
function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#6CC8BE' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Profile"
        component={ExploreScreen}
        options={{ title: 'Explore Page' }}/>
    </Stack.Navigator>
  );
}
 
function OrdersStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#6CC8BE' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Profile"
        component={OrdersScreen}
        options={{ title: 'Orders Page' }}/>
    </Stack.Navigator>
  );
}
 
function NotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#6CC8BE' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Profile"
        component={NotificationScreen}
        options={{ title: 'Notification Page' }}/>
    </Stack.Navigator>
  );
}
 
function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#6CC8BE' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}
 
function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          activeTintColor: '#33A197',
        }}>
        
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {fontFamily: 'Inter-SemiBold', fontSize: 11, marginTop: -5, marginBottom: 2},
            tabBarActiveTintColor: '#33A197',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <HomeIcon width={size} height={size} fill={color}/>
            )
          }}
        />
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Explore',
            tabBarLabelStyle: {fontFamily: 'Inter-SemiBold', fontSize: 11, marginTop: -5, marginBottom: 2},
            tabBarActiveTintColor: '#33A197',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <ExploreIcon width={size} height={size} fill={color}/>
            ),
          }} 
        />
        <Tab.Screen
          name="OrdersStack"
          component={OrdersStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Orders',
            tabBarLabelStyle: {fontFamily: 'Inter-SemiBold', fontSize: 11, marginTop: -5, marginBottom: 2},
            tabBarActiveTintColor: '#33A197',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <OrderIcon width={size} height={size} fill={color}/>
            ),
          }} 
        />
        <Tab.Screen
          name="NotificationStack"
          component={NotificationStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarLabelStyle: {fontFamily: 'Inter-SemiBold', fontSize: 11, marginTop: -5, marginBottom: 2},
            tabBarActiveTintColor: '#33A197',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <NotificationIcon width={size} height={size} fill={color}/>
            ),
          }} 
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {fontFamily: 'Inter-SemiBold', fontSize: 11, marginTop: -5, marginBottom: 2},
            tabBarActiveTintColor: '#33A197',
            tabBarInactiveTintColor: '#8f8f8f',
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon width={size} height={size} fill={color}/>
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
export default App;