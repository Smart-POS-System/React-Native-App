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
  Button,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../contexts/authContext";
import axiosInstance from "../api/axiosConfig";
import { IP } from "../helpers/ip";

function ItemsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();
  const { isUpdated } = useAuthentication();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsResponse = await axiosInstance.get(
          `http://${IP}:49160/items`
        );
        setItems(itemsResponse.data);
        console.log(itemsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [isUpdated]);

  const filteredItems = items.filter((item) =>
    item.product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (itemId) => {
    const updatedItems = items.filter((item) => item.item_id !== itemId);
    setItems(updatedItems); // Update the main items state
  };

  const renderProductItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Avatar.Icon
            icon="cube-outline"
            size={50}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <View style={styles.info}>
            <Title style={{ fontSize: 18, fontWeight: "bold" }}>
              {item?.product?.product_name}
            </Title>
            <View style={styles.inline}>
              <Ionicons name="document-text-outline" size={16} color="black" />
              <Paragraph style={styles.paragraph}>
                Batch Number: {item?.batch_no}
              </Paragraph>
            </View>
          </View>
        </View>

        <View style={styles.inline}>
          <Ionicons name="pricetag-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Buying Price: Rs. {parseFloat(item?.buying_price)?.toFixed(2)}
          </Paragraph>
        </View>

        <View style={styles.inline}>
          <Ionicons name="cart-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Selling Price: Rs. {parseFloat(item?.selling_price)?.toFixed(2)}
          </Paragraph>
        </View>

        <View style={styles.inline}>
          <Ionicons name="calendar-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Manufactured Date: {item?.mfd}
          </Paragraph>
        </View>

        <View style={styles.inline}>
          <Ionicons name="time-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Expiring Date: {item?.exp}
          </Paragraph>
        </View>

        {/* Make the Chip and Remove button inline */}
        <View style={styles.chipAndButtonContainer}>
          <Chip
            icon="information"
            style={{
              marginRight: 5,
              backgroundColor:
                new Date(item?.exp) > new Date() ? "#43e031" : "#e04343",
            }}
          >
            {new Date(item?.exp) > new Date() ? "In Stock" : "Expired"}
          </Chip>
          <Button
            mode="contained"
            onPress={() => handleRemove(item?.item_id)} // Show dialog on button press
            icon="delete"
            style={styles.removeButton}
            compact
          >
            Remove
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.header}>Sales Items</Text>

        {/* Search Bar */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          mode="outlined"
          placeholder="Search by product name or batch number"
          left={<TextInput.Icon icon="magnify" />}
          theme={{ roundness: 25 }}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="plus"
            onPress={() => navigation.navigate("Add Item")}
            style={{ width: "100%" }}
          >
            Add New Item
          </Button>
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderProductItem}
          keyExtractor={(item) => item?.item_id}
          contentContainerStyle={styles.list}
        />
      </View>
    </Provider>
  );
}

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    marginBottom: 20,
    height: 40,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 5,
    borderRadius: 10,
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
    justifyContent: "between",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  paragraph: {
    marginLeft: 5,
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: "#e04343",
  },
  chipAndButtonContainer: {
    flexDirection: "row", // Align Chip and Button inline
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
