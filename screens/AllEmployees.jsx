import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  Button,
  Card,
  useTheme,
  Modal,
  Portal,
  List,
  ActivityIndicator,
} from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";
import LottieView from "lottie-react-native";
import { getUsers } from "../api/api";
import Toast from "react-native-toast-message";

export default function AllUsers() {
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("All Roles");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { navigate } = useNavigation();
  const { user } = useAuthentication();
  const [visible, setVisible] = useState(false);

  const roles = [
    "General Manager",
    "Regional Manager",
    "Inventory Manager",
    "Store Manager",
    "Cashier",
  ];
  const allowedRoles = roles.filter(
    (role) => roles.indexOf(user.role) < roles.indexOf(role)
  );

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleSelectRole = (role) => {
    setRole(role);
    hideMenu();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        //  console.log("Fetched users:", response.users); // Debugging
        if (response && response.users) {
          setUsersList(response.users);
        } else {
          setUsersList([]); // Handle empty response
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

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!usersList || usersList.length === 0) {
      setFilteredUsers([]); // Handle no users case
      return;
    }

    let filtered = [...usersList];

    if (searchText) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (role !== "All Roles") {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered);
  }, [searchText, role, usersList]);

  function handleButtonClick() {
    navigate("Create Employee");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        All Employees
      </Text>

      {/* Search by Name */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          label="Search Employee by Name"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          left={<TextInput.Icon icon="account-search" />}
          theme={{ roundness: 25, height: 40 }}
        />
      </View>

      {/* Role Selection Button and Modal */}
      <View style={styles.roleContainer}>
        <Text style={styles.label}>Search Employee by Role</Text>
        <Button mode="outlined" onPress={showMenu} style={styles.button}>
          {role}
        </Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideMenu}
            contentContainerStyle={styles.modal}
          >
            <ScrollView>
              {["All Roles", ...allowedRoles].map((role, index) => (
                <List.Item
                  key={index.toString()}
                  title={role}
                  onPress={() => handleSelectRole(role)}
                  left={(props) => (
                    <List.Icon {...props} icon="account-circle" />
                  )}
                />
              ))}
            </ScrollView>
          </Modal>
        </Portal>
      </View>

      {/* Add New Employee Button */}
      <Button
        mode="contained"
        icon="plus"
        onPress={handleButtonClick}
        style={styles.addButton}
      >
        Add New Employee
      </Button>

      {/* List of users */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => <UserItem userData={item} />}
          keyExtractor={(item) => item.employee_id.toString()}
        />
      ) : (
        <View style={styles.lottieContainer}>
          <LottieView
            style={{ width: 250, height: 250 }}
            source={require("../assets/no-results.json")}
            autoPlay
            loop={true}
          />
        </View>
      )}
    </View>
  );
}

// Component for each user item
const defaultUserImage = require("../assets/default_user.png");

function UserItem({ userData }) {
  const { employee_id, name, role, image, is_active } = userData;
  const { navigate } = useNavigation();
  const theme = useTheme();

  // Check if the image is a valid URL string or else use defaultUserImage
  const validImageUri =
    typeof image === "string" && image !== ""
      ? { uri: image }
      : defaultUserImage;

  function handleViewUser() {
    navigate("Employee Details", { id: employee_id });
  }

  return (
    <Card
      style={[
        styles.userCard,
        is_active ? styles.activeCard : styles.inactiveCard,
      ]}
      onPress={handleViewUser}
    >
      <View style={styles.cardContent}>
        {/* Use Image component from React Native */}
        <Image
          source={validImageUri}
          style={styles.userImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userRole}>{role}</Text>
        </View>
        <Text
          style={{
            color: is_active ? theme.colors.primary : theme.colors.disabled,
            marginHorizontal: 10,
            padding: 5,
          }}
        >
          {is_active ? "Active" : "Deactivated"}
        </Text>
      </View>
    </Card>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roleContainer: {
    padding: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    marginBottom: 10,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 0,
  },
  addButton: {
    marginBottom: 20,
  },
  userCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  activeCard: {
    backgroundColor: "#e7f4fc",
  },
  inactiveCard: {
    backgroundColor: "#f4f4f4",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 14,
    color: "#555",
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
