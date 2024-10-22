import React, { useState } from "react";
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
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { stock } from "../helpers/list";

function StockScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStock, setFilteredStock] = useState(stock);
  const [visible, setVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigation = useNavigation();
  const theme = useTheme();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredStock(stock);
    } else {
      const filteredData = stock.filter(
        (item) =>
          item.product_name.toLowerCase().includes(query.toLowerCase()) ||
          item.batch_number.toString().includes(query)
      );
      setFilteredStock(filteredData);
    }
  };

  const showDialog = (batchNumber) => {
    setSelectedBatch(batchNumber); // Store the batch number of the selected item
    setVisible(true); // Show the dialog
  };

  const hideDialog = () => {
    setVisible(false); // Hide the dialog
  };

  const handleRemove = () => {
    const updatedStock = filteredStock.filter(
      (item) => item.batch_number !== selectedBatch
    );
    setFilteredStock(updatedStock);
    setVisible(false);
  };

  const renderStockItem = ({ item }) => (
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
              {item.product_name}
            </Title>
            <View style={styles.inline}>
              <Ionicons name="document-text-outline" size={16} color="black" />
              <Paragraph style={styles.paragraph}>
                Batch Number: {item.batch_number}
              </Paragraph>
            </View>
          </View>
        </View>

        <View style={styles.inline}>
          <Ionicons name="barcode-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Barcode: {item.barcode}
          </Paragraph>
        </View>

        <View style={styles.inline}>
          <Ionicons name="cart-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Quantity: {item.quantity}
          </Paragraph>
        </View>

        <View style={styles.inline}>
          <Ionicons name="calendar-outline" size={16} color="black" />
          <Paragraph style={styles.paragraph}>
            Expiry Date: {item.expiry_date}
          </Paragraph>
        </View>

        {/* Make the Chip and Remove button inline */}
        <View style={styles.chipAndButtonContainer}>
          <Chip
            icon="information"
            style={{
              marginRight: 5,
              backgroundColor:
                new Date(item.expiry_date) > new Date() ? "#43e031" : "#e04343",
            }}
          >
            {new Date(item.expiry_date) > new Date() ? "In Stock" : "Expired"}
          </Chip>
          <Button
            mode="contained"
            onPress={() => showDialog(item.batch_number)} // Show dialog on button press
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

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.header}>Stock Items</Text>

        {/* Search Bar */}
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
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
            onPress={() => navigation.navigate("Add Stock")}
            style={{ width: "100%" }}
          >
            Add New Stock
          </Button>
        </View>

        {/* Stock List */}
        <FlatList
          data={filteredStock}
          renderItem={renderStockItem}
          keyExtractor={(item, index) => item.batch_number.toString()}
          contentContainerStyle={styles.list}
        />

        {/* Confirmation Dialog */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={{ fontSize: 20, fontWeight: "bold" }}>
              Confirm Removal
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph style={{ fontSize: 16 }}>
                Are you sure you want to remove this item?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleRemove}>Remove</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

export default StockScreen;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
