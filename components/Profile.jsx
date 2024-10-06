import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";

function Profile() {
  const { fullUser } = useAuthentication();
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={24} color="black" />
      <Avatar.Image
        size={30}
        source={
          fullUser ? fullUser?.image : require("../assets/default_user.png")
        }
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
