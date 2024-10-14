import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Avatar } from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";

function SimpleProfile() {
  const { fullUser } = useAuthentication();

  return (
    <View style={styles.container}>
      {/* Avatar as a button with dropdown */}
      <TouchableOpacity style={styles.avatarFrame}>
        <Avatar.Image
          size={36}
          source={
            fullUser?.image
              ? { uri: fullUser.image }
              : require("../assets/default_user.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
}

export default SimpleProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  button: {
    borderRadius: 50,
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
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
