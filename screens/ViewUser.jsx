import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  Avatar,
  Card,
  List,
  Text,
  Chip,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";
import FloatButton from "../components/FloatButton";
import DialogBox from "../components/DialogBox";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { activateUser, deleteUser, forgotPassword, getUser } from "../api/api";
import { formatDate } from "../helpers/formatDate";
import Toast from "react-native-toast-message";
import { set } from "date-fns";

function EmployeeDetails({ route }) {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isResetPasswordClicked, setIsResetPasswordClicked] = useState(false);
  const [isActivateClicked, setIsActivateClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { user, isUpdated, setIsUpdated } = useAuthentication();
  const { id } = route.params;
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(id);
        if (response && response.user) {
          setEmployee(response.user);
        } else {
          setEmployee({});
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: error.message || "Please try again",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, isUpdated]);

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
      (employee.is_active
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
  ].filter(Boolean);

  async function handleResetPassword() {
    try {
      setIsLoading(true);
      const response = await forgotPassword(employee.email); // Ensure employee_id is passed
      setIsLoading(false);
      if (response) {
        Toast.show({
          type: "success",
          text1: "Password Reset",
          text2: "Reset password token sent successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: error.message || "Please try again",
      });
    }
    setVisible(false);
    setIsResetPasswordClicked(false);
  }

  async function handleActivate() {
    try {
      let response;
      setIsLoading(true);
      if (employee.is_active) {
        response = await deleteUser(employee.employee_id);
      } else {
        response = await activateUser(employee.employee_id);
      }
      setIsLoading(false);
      setIsUpdated((value) => !value);
      if (response) {
        Toast.show({
          type: "success",
          text1: employee.is_active
            ? "Account deactivated"
            : "Account activated",
          text2: "User account status updated successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: error.message || "Please try again",
      });
    }
    setVisible(false);
    setIsResetPasswordClicked(false);
  }

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  if (loading || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Employee Info Card */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={
              typeof employee.image === "string" && employee.image !== ""
                ? { uri: employee.image }
                : require("../assets/default_user.png")
            }
            style={styles.userImage}
            resizeMode="cover"
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
              description={employee.employee_id}
              left={() => <List.Icon icon="identifier" />}
            />
            <List.Item
              title="Mobile Number"
              description={employee.mobile}
              left={() => <List.Icon icon="phone" />}
            />
            <List.Item
              title="Email"
              description={employee.email}
              left={() => <List.Icon icon="email" />}
            />
            <List.Item
              title="Last Login"
              description={employee.last_login_at || "Never Logged In"}
              left={() => <List.Icon icon="login" />}
            />
            <List.Item
              title="Account Created"
              description={formatDate(employee.account_created_at)}
              left={() => <List.Icon icon="calendar" />}
            />
            <View style={styles.chipContainer}>
              <Chip
                icon="check-circle"
                style={[
                  styles.statusChip,
                  {
                    backgroundColor: employee.is_active ? "#4CAF50" : "#F44336",
                  },
                ]}
              >
                {employee.is_active ? "Active" : "Inactive"}
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
          body="Are you sure you want to send the reset password token to this employee?"
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
          title={employee.is_active ? "Deactivate Account" : "Activate Account"}
          body={
            employee.is_active
              ? "Are you sure you want to deactivate this account?"
              : "Are you sure you want to activate this account?"
          }
          handleDone={handleActivate}
          visible={visible}
          setVisible={setVisible}
          setState={setIsActivateClicked}
          status={employee.is_active ? "danger" : "normal"}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
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
    backgroundColor: "#6200ee",
  },
});

export default EmployeeDetails;
