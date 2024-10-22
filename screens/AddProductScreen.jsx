import React, { useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text, useTheme } from "react-native-paper";

function AddProduct() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      productName: "",
      unitWeight: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New Product Data:", data);
    setLoading(true);

    // Simulate API call or async logic
    setTimeout(() => {
      console.log("Product Added Successfully");
      setLoading(false);
      handleClear(); // Reset form after successful submission
    }, 1000);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Product</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <Controller
          control={control}
          name="productName"
          rules={{
            required: "Product Name is required",
            pattern: {
              value: /^[A-Za-z_ ]+$/,
              message: "Product Name can only contain letters and spaces",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Product Name"
              mode="outlined"
              onBlur={() => {
                onBlur();
                trigger("productName");
              }}
              onChangeText={onChange}
              value={value}
              error={!!errors.productName}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
          )}
        />
        {errors.productName && (
          <Text style={styles.errorText}>{errors.productName.message}</Text>
        )}
      </View>

      {/* Unit Weight Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Unit Weight</Text>
        <Controller
          control={control}
          name="unitWeight"
          rules={{
            required: "Unit Weight is required",
            pattern: {
              value: /^[0-9]+(kg|g|L|ml)?$/,
              message: "Enter valid weight (e.g., 10kg, 500g, 1L)",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Unit Weight"
              mode="outlined"
              onBlur={() => {
                onBlur();
                trigger("unitWeight"); // Trigger validation only after interaction
              }}
              onChangeText={onChange}
              value={value}
              error={!!errors.unitWeight}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
          )}
        />
        {errors.unitWeight && (
          <Text style={styles.errorText}>{errors.unitWeight.message}</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loading}
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

export default AddProduct;

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
  label: {
    fontSize: 14,
    color: "#41009c",
    marginBottom: 6,
  },
});
