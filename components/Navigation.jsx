import { Drawer } from "react-native-paper";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuthentication } from "../contexts/authContext";
import { View, StyleSheet } from "react-native";

function NavigationBar() {
  const [active, setActive] = React.useState("");
  const navigation = useNavigation();
  const { isLoading, error, user } = useCurrentUser();
  const { handleFullUser } = useAuthentication();

  React.useEffect(() => {
    if (user) {
      handleFullUser(user);
    }
  }, [user]);

  function handleButtonClick(name) {
    setActive(name);
    navigation.navigate(name);
  }

  return (
    <View style={styles.drawerContainer}>
      <Drawer.Section>
        <Drawer.Item
          label="Dashboard"
          icon="view-dashboard"
          active={active === "Dashboard"}
          onPress={() => handleButtonClick("Dashboard")}
        />
        <Drawer.Item
          label="All Employees"
          icon="account-group"
          active={active === "All Employees"}
          onPress={() => handleButtonClick("All Employees")}
        />
        <Drawer.Item
          label="My Profile"
          icon="account"
          active={active === "My Profile"}
          onPress={() => handleButtonClick("My Profile")}
        />
        <Drawer.Item
          label="Transactions"
          icon="cash"
          active={active === "Transactions"}
          onPress={() => handleButtonClick("Transactions")}
        />
        <Drawer.Item
          label="Customers"
          icon="account-group"
          active={active === "Customers"}
          onPress={() => handleButtonClick("Customers")}
        />
        <Drawer.Item
          label="Products"
          icon="cart"
          active={active === "Products"}
          onPress={() => handleButtonClick("Products")}
        />
        <Drawer.Item
          label="Sales Items"
          icon="shopping"
          active={active === "Sales Items"}
          onPress={() => handleButtonClick("Sales Items")}
        />
        <Drawer.Item
          label="Stock"
          icon="cube"
          active={active === "Stock"}
          onPress={() => handleButtonClick("Stock")}
        />
        <Drawer.Item
          label="Expiry Information"
          icon="calendar-clock"
          active={active === "Expiry Information"}
          onPress={() => handleButtonClick("Expiry Information")}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    width: 300, // Adjust the width of the drawer as needed
  },
});

export default NavigationBar;
