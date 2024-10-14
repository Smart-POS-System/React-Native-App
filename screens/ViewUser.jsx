import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, List, Text, Chip, Button } from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";
import FloatButton from "../components/FloatButton";
import DialogBox from "../components/DialogBox";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

function EmployeeDetails() {
  const [isFocused, setIsFocused] = useState(false); // Initially not focused
  const [visible, setVisible] = useState(false);
  const [isResetPasswordClicked, setIsResetPasswordClicked] = useState(false);
  const [isActivateClicked, setIsActivateClicked] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuthentication();

  const employee = {
    id: "EMP12345",
    name: "John Doe",
    role: "General Manager",
    lastLogin: "2023-10-10 09:30 AM",
    createdAt: "2022-05-15",
    isActive: true,
    phone: "0712356890",
    email: "john.doe@example.com",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  };

  // Define action list based on user role
  const actionList = [
    {
      icon: "account-key",
      label: "Reset Password",
      onPress: () => {
        setVisible(true);
        setIsResetPasswordClicked(true);
      },
    },
    {
      icon: "account-edit",
      label: "Update Details",
      onPress: () => navigation.navigate("Update Employee", { employee }),
    },
    user.role === "General Manager" &&
      (employee.isActive
        ? {
            icon: "account-off",
            label: "Deactivate Account",
            onPress: () => {
              setVisible(true);
              setIsActivateClicked(true);
            },
          }
        : {
            icon: "account-check",
            label: "Activate Account",
            onPress: () => {
              setVisible(true);
              setIsActivateClicked(true);
            },
          }),
  ].filter(Boolean); // Filter out undefined elements

  function handleResetPassword() {
    setVisible(false);
    setIsResetPasswordClicked(false);
  }

  function handleActivate() {
    setVisible(false);
    setIsActivateClicked(false);
  }

  // Use the useFocusEffect hook to track focus changes
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true); // When the screen is focused
      return () => {
        setIsFocused(false); // When the screen loses focus
      };
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Employee Info Card */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image
            source={{ uri: employee.image }}
            size={80}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{employee.name}</Text>
            <Text style={styles.role}>{employee.role}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Status and Login Info */}
      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              title="Employee ID"
              description={employee.id}
              left={() => <List.Icon icon="identifier" />}
            />
            <List.Item
              title="Mobile Number"
              description={employee.phone}
              left={() => <List.Icon icon="phone" />}
            />
            <List.Item
              title="Email"
              description={employee.email}
              left={() => <List.Icon icon="email" />}
            />
            <List.Item
              title="Last Login"
              description={employee.lastLogin}
              left={() => <List.Icon icon="login" />}
            />
            <List.Item
              title="Account Created"
              description={employee.createdAt}
              left={() => <List.Icon icon="calendar" />}
            />
            <View style={styles.chipContainer}>
              <Chip
                icon="check-circle"
                style={[
                  styles.statusChip,
                  {
                    backgroundColor: employee.isActive ? "#4CAF50" : "#F44336",
                  },
                ]}
              >
                {employee.isActive ? "Active" : "Inactive"}
              </Chip>
            </View>
          </List.Section>
        </Card.Content>
      </Card>

      {/* Only show FloatButton when the screen is focused */}
      {isFocused && <FloatButton actions={actionList} />}

      {/* Dialog for Reset Password */}
      {isResetPasswordClicked && (
        <DialogBox
          title="Reset Password"
          body="Are you sure you want to send the reset password token to this employee ?"
          handleDone={handleResetPassword}
          visible={visible}
          setVisible={setVisible}
          setState={setIsResetPasswordClicked}
          status="normal"
        />
      )}

      {/* Dialog for Activate/Deactivate Account */}
      {isActivateClicked && (
        <DialogBox
          title={employee.isActive ? "Deactivate Account" : "Activate Account"}
          body={
            employee.isActive
              ? "Are you sure you want to deactivate this account?"
              : "Are you sure you want to activate this account?"
          }
          handleDone={handleActivate}
          visible={visible}
          setVisible={setVisible}
          setState={setIsActivateClicked}
          status={employee.isActive ? "danger" : "normal"}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 6,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  chipContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  statusChip: {
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#6200ee", // Adjust button color
  },
});

export default EmployeeDetails;
