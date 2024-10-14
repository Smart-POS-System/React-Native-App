import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { Button, DataTable, TextInput } from "react-native-paper";
import { productsOfSale } from "../helpers/list";
import DialogBox from "../components/DialogBox";
import { useNavigation } from "@react-navigation/native";

function ProductScreen() {
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const navigation = useNavigation();

  // Filter products based on search query
  const filteredProducts = productsOfSale.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredProducts.length);

  function handleDelete(product) {
    console.log(`Delete product: ${product.product_name}`);
    setIsDeleteButtonClicked(true);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Products of Sale
      </Text>

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

      {/* Add Product Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => navigation.navigate("Add Product")}
          style={{ width: "100%" }}
        >
          Add New Product
        </Button>
      </View>

      <DataTable>
        {/* Header with rounded edges */}
        <DataTable.Header style={styles.header}>
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.productNameColumn}
          >
            Product Name
          </DataTable.Title>
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.unitWeightColumn}
          >
            Unit Weight
          </DataTable.Title>
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.actionColumn}
          ></DataTable.Title>
        </DataTable.Header>

        {/* Rows */}
        {filteredProducts.slice(from, to).map((product, index) => (
          <DataTable.Row key={index} style={styles.row}>
            <DataTable.Cell style={styles.productNameColumn}>
              {product.product_name}
            </DataTable.Cell>
            <DataTable.Cell style={styles.unitWeightColumn}>
              {product.unit_weight}
            </DataTable.Cell>
            <DataTable.Cell style={styles.actionColumn}>
              <Pressable
                onPress={() => handleDelete(product)}
                style={({ pressed }) => [
                  styles.removeButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        {/* Pagination */}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} of ${filteredProducts.length}`}
          style={{ justifyContent: "center", marginBottom: 20 }}
        />
      </DataTable>

      {/* Dialog Box */}
      {isDeleteButtonClicked && (
        <DialogBox
          title="Remove Product"
          body="Are you sure you want to remove this product?"
          visible={isDeleteButtonClicked}
          setVisible={setIsDeleteButtonClicked}
          handleDone={() => console.log("Product removed")}
          setState={setIsDeleteButtonClicked}
          status="danger"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#f9ecfd",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productNameColumn: {
    flex: 1.5,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  unitWeightColumn: {
    flex: 1.5,
    justifyContent: "center",
  },
  actionColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    backgroundColor: "#fff",
    marginBottom: 2,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductScreen;
