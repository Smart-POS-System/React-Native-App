import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Avatar,
  Title,
  Paragraph,
  Chip,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import axiosInstance from "../api/axiosConfig";
import { useTheme } from "react-native-paper";
import { formatDate } from "../helpers/formatDate";
import { Ionicons } from "@expo/vector-icons";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered customers
  const theme = useTheme();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get(`/customers/`);
        const formattedData = response.data.data.customers.map((item) => ({
          ...item,
          loyaltyStatus: item.loyaltyPoints > 0 ? "Yes" : "No",
          registered_date: formatDate(item.registered_date),
        }));
        setCustomers(formattedData);
        setFilteredCustomers(formattedData); // Initialize filtered customers
      } catch (error) {
        console.error(
          "Error fetching customers:",
          error.response || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredCustomers(customers); // Reset to original customers if search is cleared
    } else {
      const filteredData = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.mobile.includes(query) // Search by name or mobile number
      );
      setFilteredCustomers(filteredData);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderCustomerItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Avatar.Icon
            icon="account"
            size={50}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <View style={styles.info}>
            <Title style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Title>
            <Paragraph>
              <Ionicons name="call-outline" size={16} color="black" />
              {"   "}
              {item.mobile}
            </Paragraph>
          </View>
        </View>
        <Paragraph>Address: {item.address}</Paragraph>
        <Paragraph>Registered: {item.registered_date}</Paragraph>
        <View style={styles.chipContainer}>
          <Chip
            icon={
              item.loyaltyStatus === "Yes" ? "check-circle" : "close-circle"
            }
            style={[
              styles.chip,
              {
                backgroundColor:
                  item.loyaltyStatus === "Yes" ? "#4CAF50" : "#F44336",
              },
            ]}
          >
            Loyalty: {item.loyaltyStatus}
          </Chip>
          <Chip icon="star" style={styles.chip}>
            Points: {item.loyaltyPoints}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registered Customers</Text>
      <Text style={styles.label}>Search Customers</Text>
      <TextInput
        // label="Search Customers"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
        mode="outlined"
        placeholder="Search by name or mobile number"
        theme={{ roundness: 25 }}
      />
      <FlatList
        data={filteredCustomers}
        renderItem={renderCustomerItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    marginBottom: 20,
    height: 40,
    fontSize: 14,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  chipContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#41009c",
    marginBottom: 6,
  },
});
