import React from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Avatar, PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import AllEmployees from "./screens/AllEmployees";
import AuthProvider, { useAuthentication } from "./contexts/authContext";
import CreateEmployee from "./screens/CreateEmployee";
import UserScreen from "./screens/UserScreen";
import ImagesPicker from "./screens/ImagePicker";
import Transaction from "./screens/Transactions";
import NavigationBar from "./components/Navigation";
import Profile from "./components/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyProfile from "./screens/MyProfile";
import UpdatePasswordScreen from "./screens/PasswordUpdateScreen";
import EmployeeDetails from "./screens/ViewUser";
import UpdateUser from "./screens/UpdateUser";
import Customers from "./screens/Customers";
import ExpiryScreen from "./screens/ExpiryScreen";
import ProductScreen from "./screens/ProductScreen";
import AddProduct from "./screens/AddProductScreen";
import ItemsScreen from "./screens/ItemsScreen";
import AddItems from "./screens/AddItemScreen";
import StockScreen from "./screens/StockScreen";
import AddStock from "./screens/AddStock";
import SimpleProfile from "./components/SimpleProfile";

// Create the drawer and stack navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Component
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Add your logo or any custom component */}
      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/SmartPOS.png")} // Make sure the logo path is correct
          style={styles.logo}
        />
      </View>
      {/* Render the default drawer items */}
      {/* <DrawerItemList {...props} /> */}
      <NavigationBar />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator with custom drawer content
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        sceneContainerStyle: {
          backgroundColor: "#fff",
        },
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveBackgroundColor: "#15c6e6",
        drawerActiveTintColor: "#fff",
        headerRight: () => (
          <View style={{ paddingRight: 20 }}>
            <Profile />
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="All Employees" component={AllEmployees} />
      <Drawer.Screen name="My Profile" component={MyProfile} />
      <Drawer.Screen name="Transactions" component={Transaction} />
      <Drawer.Screen name="Customers" component={Customers} />
      <Drawer.Screen name="Products" component={ProductScreen} />
      <Drawer.Screen name="Sales Items" component={ItemsScreen} />
      <Drawer.Screen name="Stock" component={StockScreen} />
      <Drawer.Screen name="Expiry Information" component={ExpiryScreen} />
    </Drawer.Navigator>
  );
}

// Auth Stack for login and splash screens
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Authenticated Stack
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        contentStyle: { backgroundColor: "white" },
        headerRight: () => (
          <View style={{ paddingRight: 20 }}>
            <SimpleProfile />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="NavigationBar"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Create Employee" component={CreateEmployee} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="ImagesPicker" component={ImagesPicker} />
      <Stack.Screen name="Password Update" component={UpdatePasswordScreen} />
      <Stack.Screen name="Employee Details" component={EmployeeDetails} />
      <Stack.Screen name="Update Employee" component={UpdateUser} />
      <Stack.Screen name="Add Product" component={AddProduct} />
      <Stack.Screen name="Add Item" component={AddItems} />
      <Stack.Screen name="Add Stock" component={AddStock} />
    </Stack.Navigator>
  );
}

// Main Navigation
function Navigation() {
  const { loading, isAuthenticated } = useAuthentication();
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Navigation />
          <StatusBar style="light" />
          <Toast />
        </PaperProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

// Styles for custom drawer content
const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain", // Adjust as per your logo requirements
  },
});
