import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function UpdatePasswordScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log("Password updated successfully!", data);
    // Add your logic here to update the password, such as an API call
  };

  const handleClear = () => {
    reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Update Your Password</Text>

      {/* Current Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <Controller
          control={control}
          name="currentPassword"
          rules={{
            required: "Current Password is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // label="Current Password"
              placeholder="Enter your current password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.currentPassword}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
            />
          )}
        />
        {errors.currentPassword && (
          <Text style={styles.errorText}>{errors.currentPassword.message}</Text>
        )}
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>

        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: "New Password is required",
            minLength: {
              value: 8,
              message: "New Password must be at least 8 characters long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // label="New Password"
              placeholder="Enter your new password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.newPassword}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
            />
          )}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
        )}
      </View>

      {/* Confirm New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              //label="Confirm New Password"
              placeholder="Confirm your new password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.confirmPassword}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          style={styles.button}
        >
          Update
        </Button>
        <Button mode="outlined" onPress={handleClear} style={styles.button}>
          Clear All
        </Button>
      </View>

      {/* Inline Ionicons and Text Notice */}
      <View style={styles.noticeContainer}>
        <View style={styles.noticeContent}>
          <Ionicons name="alert-circle-outline" size={18} color="red" />
          <Text style={styles.noticeText}>
            Once you update your password, you will be logged out of the system.
            Please login again with your new password.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    height: 40,
    fontSize: 14, // Smaller font size to match reduced height
    paddingVertical: 2,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  noticeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fbe3e2",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  noticeContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  noticeText: {
    fontSize: 16,
    color: "red",
    marginLeft: 10, // Space between icon and text
    flex: 1,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#41009c", // Purple color for labels
    marginBottom: 2,
  },
});
