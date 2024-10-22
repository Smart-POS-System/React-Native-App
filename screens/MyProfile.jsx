import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  List,
  TouchableRipple,
} from "react-native-paper";
import { format } from "date-fns";
import { useAuthentication } from "../contexts/authContext";
import { useIsFocused } from "@react-navigation/native";
import FloatButton from "../components/FloatButton";

function MyProfile({ navigation }) {
  const { fullUser: userData } = useAuthentication();
  const isFocused = useIsFocused();

  const accountCreatedAt = format(
    new Date(userData.account_created_at),
    "MMMM dd, yyyy"
  );
  const lastLoginAt = format(
    new Date(userData.last_login_at),
    "MMMM dd, yyyy HH:mm"
  );

  // For adding animation effects to profile card and avatar
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Triggering animation on press
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  // Reverting animation on release
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const actionList = [
    {
      icon: "account-edit",
      label: "Update Password",
      onPress: () => navigation.navigate("Password Update"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* User Image and Basic Info with animation */}
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View
          style={[styles.profileCard, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.avatarContainer}>
            <Avatar.Image size={100} source={{ uri: userData.image }} />
          </View>
          <Card.Content>
            <Title style={styles.userName}>{userData.name}</Title>
            <Paragraph style={styles.userRole}>{userData.role}</Paragraph>
          </Card.Content>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* User Details with TouchableRipple for press feedback */}
      <Card style={styles.detailsCard}>
        <List.Section>
          <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title="Employee ID"
              description={userData.employee_id}
              left={(props) => <List.Icon {...props} icon="identifier" />}
            />
          </TouchableRipple>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title="Email"
              description={userData.email}
              left={(props) => <List.Icon {...props} icon="email-outline" />}
            />
          </TouchableRipple>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title="Mobile Number"
              description={userData.mobile}
              left={(props) => <List.Icon {...props} icon="phone-outline" />}
            />
          </TouchableRipple>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title="Account Created"
              description={accountCreatedAt}
              left={(props) => (
                <List.Icon {...props} icon="calendar-account-outline" />
              )}
            />
          </TouchableRipple>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title="Last Login"
              description={lastLoginAt}
              left={(props) => <List.Icon {...props} icon="login" />}
            />
          </TouchableRipple>
        </List.Section>
      </Card>

      {/* Conditionally render the FAB only if the screen is focused */}
      {isFocused && (
        <View style={styles.floatButtonContainer}>
          <FloatButton actions={actionList} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f4fc",
  },
  profileCard: {
    marginBottom: 20,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  userName: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  userRole: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  detailsCard: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  floatButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
});

export default MyProfile;
