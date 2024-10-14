import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { users } from "../helpers/users"; // Assuming you have this file for mock data
import {
  Text,
  TextInput,
  Button,
  Card,
  Avatar,
  useTheme,
  Modal,
  Portal,
  List,
} from "react-native-paper";
import { useAuthentication } from "../contexts/authContext";
import LottieView from "lottie-react-native";

export default function AllUsers() {
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("All Roles"); // State to store selected role
  const [filteredUsers, setFilteredUsers] = useState(users); // Initial users list to start with full list
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

  // Filter the users based on searchText and role
  useEffect(() => {
    let filtered = users;

    // Filter by name if searchText is not empty
    if (searchText) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by role if a role is selected
    if (role !== "All Roles") {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered); // Update the filtered users list
  }, [searchText, role]);

  function handleButtonClick() {
    navigate("Create Employee");
  }

  if (!users.length) {
    return <ActivityIndicator />;
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
                  key={index}
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
function UserItem({ userData }) {
  const { employee_id, name, role, image, is_active } = userData;
  const { navigate } = useNavigation();
  const theme = useTheme();

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
      <Card.Title
        title={name}
        subtitle={role}
        left={() => (
          <Avatar.Image
            source={{ uri: image || "../assets/default_user.png" }}
            size={48}
          />
        )}
        right={() => (
          <Text
            style={{
              color: is_active ? theme.colors.primary : theme.colors.disabled,
              marginHorizontal: 10,
              padding: 5,
            }}
          >
            {is_active ? "Active" : "Deactivated"}
          </Text>
        )}
      />
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
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
