import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Card, Title, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

function ExpireItems({ list, status }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = list.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card
      style={[
        styles.card,
        status === "expired"
          ? { backgroundColor: "#f4f4f4" }
          : { backgroundColor: "#f9ecfd" },
      ]}
    >
      <Card.Content>
        <View style={styles.headerRow}>
          <Title style={styles.productName}>Product: {item.product_name}</Title>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar" size={18} color="#000" />
          <Text style={styles.text}>Expiry Date: {item.expiry_date}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="barcode" size={18} color="#000" />
          <Text style={styles.text}>Barcode: {item.barcode}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="list" size={18} color="#000" />
          <Text style={styles.text}>Batch Number: {item.batch_number}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cube" size={18} color="#000" />
          <Text style={styles.text}>Quantity: {item.quantity}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          label="Search by Product Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          theme={{ roundness: 15, height: 40 }}
        />
      </View>

      {/* FlatList to show expired product data */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.barcode.toString()}
          style={styles.list}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  list: {
    marginTop: 15,
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#f4f4f4",
  },
  searchContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    fontSize: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ca92fc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  noDataText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExpireItems;
