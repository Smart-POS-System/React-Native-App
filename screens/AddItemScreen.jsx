import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Menu,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ProductNames } from "../helpers/list";

function AddItems() {
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
      batchNumber: "",
      buyingPrice: "",
      sellingPrice: "",
      manufacturedDate: "",
      expiringDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New Item Data:", { ...data, product: selectedProduct });
    setLoading(true);

    // Simulate API call or async logic
    setTimeout(() => {
      console.log("Item Added Successfully");
      setLoading(false);
      handleClear(); // Reset form after successful submission
    }, 1000);
  };

  const handleClear = () => {
    reset();
    setSelectedProduct("");
  };

  const showDatePicker = (setFieldValue, currentValue) => {
    DateTimePickerAndroid.open({
      value: currentValue ? new Date(currentValue) : new Date(),
      onChange: (event, date) => {
        if (date) {
          setFieldValue(date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
        }
      },
      mode: "date",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Specific Item</Text>

      {/* Product Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product</Text>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setShowMenu(true)}
              style={styles.dropdownButton}
            >
              {selectedProduct || "Select Product"}
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
          <Text style={styles.errorText}>Product is required</Text>
        )}
      </View>

      {/* Batch Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Batch Number</Text>
        <Controller
          control={control}
          name="batchNumber"
          rules={{ required: "Batch Number is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Batch Number"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.batchNumber}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
          )}
        />
        {errors.batchNumber && (
          <Text style={styles.errorText}>{errors.batchNumber.message}</Text>
        )}
      </View>

      {/* Buying Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Buying Price (Rs.)</Text>
        <Controller
          control={control}
          name="buyingPrice"
          rules={{
            required: "Buying Price is required",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Enter a valid price (e.g., 200.00)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Buying Price"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.buyingPrice}
              style={styles.input}
              theme={{ roundness: 25 }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.buyingPrice && (
          <Text style={styles.errorText}>{errors.buyingPrice.message}</Text>
        )}
      </View>

      {/* Selling Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selling Price (Rs.)</Text>
        <Controller
          control={control}
          name="sellingPrice"
          rules={{
            required: "Selling Price is required",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Enter a valid price (e.g., 250.00)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Selling Price"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.sellingPrice}
              style={styles.input}
              theme={{ roundness: 25 }}
              keyboardType="numeric"
            />
          )}
        />
        {errors.sellingPrice && (
          <Text style={styles.errorText}>{errors.sellingPrice.message}</Text>
        )}
      </View>

      {/* Manufactured Date Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Manufactured Date</Text>
        <Controller
          control={control}
          name="manufacturedDate"
          rules={{ required: "Manufactured Date is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Select Manufactured Date"
              mode="outlined"
              value={value}
              onFocus={() => showDatePicker(onChange, value)}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
          )}
        />
        {errors.manufacturedDate && (
          <Text style={styles.errorText}>
            {errors.manufacturedDate.message}
          </Text>
        )}
      </View>

      {/* Expiring Date Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiring Date</Text>
        <Controller
          control={control}
          name="expiringDate"
          rules={{ required: "Expiring Date is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Select Expiring Date"
              mode="outlined"
              value={value}
              onFocus={() => showDatePicker(onChange, value)}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
          )}
        />
        {errors.expiringDate && (
          <Text style={styles.errorText}>{errors.expiringDate.message}</Text>
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

export default AddItems;

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
