import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Menu,
  ActivityIndicator,
} from "react-native-paper";
import { ProductNames } from "../helpers/list";

function AddStock() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      quantity: "",
      barcode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New Stock Data:", { ...data, product: selectedProduct });
    setLoading(true);

    // Simulate API call or async logic
    setTimeout(() => {
      console.log("Stock Added Successfully");
      setLoading(false);
      handleClear(); // Reset form after successful submission
    }, 1000);
  };

  const handleClear = () => {
    reset();
    setSelectedProduct("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Stock</Text>

      {/* Product Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Item</Text>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setShowMenu(true)}
              style={styles.dropdownButton}
            >
              {selectedProduct || "Select Item"}
            </Button>
          }
        >
          {ProductNames.map((product, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                setSelectedProduct(product);
                setShowMenu(false);
              }}
              title={product}
            />
          ))}
        </Menu>
        {selectedProduct === "" && (
          <Text style={styles.errorText}>Item is required</Text>
        )}
      </View>

      {/* Quantity Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity</Text>
        <Controller
          control={control}
          name="quantity"
          rules={{
            required: "Quantity is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Enter a valid quantity (e.g., 10)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Quantity"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.quantity}
              style={styles.input}
              theme={{ roundness: 25 }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.quantity && (
          <Text style={styles.errorText}>{errors.quantity.message}</Text>
        )}
      </View>

      {/* Barcode Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Barcode Number</Text>
        <Controller
          control={control}
          name="barcode"
          rules={{
            required: "Barcode Number is required",
            pattern: {
              value: /^[0-9]{8,13}$/,
              message: "Enter a valid barcode (8-13 digits)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Barcode Number"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.barcode}
              style={styles.input}
              theme={{ roundness: 25 }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.barcode && (
          <Text style={styles.errorText}>{errors.barcode.message}</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !selectedProduct || loading}
          style={styles.button}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : "Submit"}
        </Button>
        <Button mode="outlined" onPress={handleClear} style={styles.button}>
          Clear All
        </Button>
      </View>
    </ScrollView>
  );
}

export default AddStock;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 6,
    height: 40,
    fontSize: 14,
    paddingVertical: 2,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  dropdownButton: {
    justifyContent: "center",
    height: 40,
  },
  label: {
    fontSize: 14,
    color: "#41009c",
    marginBottom: 6,
  },
});
