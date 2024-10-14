import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Button } from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";
import NotificationDialog from "./NotificationDialog";
import useLogout from "../hooks/useLogout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FloatButton from "./FloatButton";

function Profile() {
  const { fullUser } = useAuthentication();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const { handleLogoutUser } = useLogout();
  const navigation = useNavigation();

  // Toggles the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  function handleNotifications() {
    setVisible(true);
  }

  return (
    <View style={styles.container}>
      {/* Button with centered icon */}
      <Button
        icon={() => (
          <Ionicons name="notifications-outline" size={24} color="#000" />
        )}
        onPress={handleNotifications}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={{ fontSize: 0 }} // Ensures no label text is shown
      />

      {/* Avatar as a button with dropdown */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.avatarFrame}>
        <Avatar.Image
          size={36}
          source={
            fullUser?.image
              ? { uri: fullUser.image }
              : require("../assets/default_user.png")
          }
        />
      </TouchableOpacity>

      {visible && (
        <NotificationDialog visible={visible} setVisible={setVisible} />
      )}

      {/* Dropdown content */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => navigation.navigate("My Profile")}
            style={styles.dropdownItem}
          >
            <Ionicons name="person-outline" size={18} style={styles.icon} />
            <Text style={styles.dropdownText}>View Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => console.log("Settings clicked")}
            style={styles.dropdownItem}
          >
            <Ionicons name="settings-outline" size={18} style={styles.icon} />
            <Text style={styles.dropdownText}>Settings</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => handleLogoutUser()}
            style={styles.dropdownItem}
          >
            <Ionicons name="log-out-outline" size={18} style={styles.icon} />
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative", // Ensure dropdown is positioned relative to the avatar
  },
  button: {
    borderRadius: 50,
  },
  buttonContent: {
    justifyContent: "center", // Centers the content of the button
    alignItems: "center", // Ensures the icon is aligned in the middle
  },
  avatarFrame: {
    borderWidth: 2,
    borderColor: "#2ae615",
    padding: 2,
    borderRadius: 50,
  },
  dropdown: {
    position: "absolute",
    top: 45,
    right: -10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    color: "#000",
    elevation: 5,
    zIndex: 1,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dropdownText: {
    fontSize: 15,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
});
