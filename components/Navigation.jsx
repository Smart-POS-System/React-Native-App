import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Drawer } from "react-native-paper";
import { useCurrentUser } from "../hooks/useCurrentUser";

function NavigationBar() {
  const [active, setActive] = React.useState("");
  const navigation = useNavigation();
  const { isLoading, error, user } = useCurrentUser();

  function handleButtonClick(name) {
    setActive(name);
    navigation.navigate(name);
  }

  return (
    <Drawer.Section>
      <Drawer.Item
        label="Dashboard"
        icon="view-dashboard"
        active={active === "Dashboard"}
        onPress={() => handleButtonClick("Dashboard")}
        // labelStyle={{
        //   color: active === "dashboard" ? "#6200ee" : "#000",
        //   fontSize: 16,
        // }}
      />
      <Drawer.Item
        label="All Employees"
        icon="account-group"
        active={active === "All Employees"}
        onPress={() => handleButtonClick("All Employees")}
      />
    </Drawer.Section>
  );
}

export default NavigationBar;
