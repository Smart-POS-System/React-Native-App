import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  Text,
  Dialog,
  Portal,
  List,
  useTheme,
} from "react-native-paper";
import ImagesPicker from "../screens/ImagePicker";
import { useAuthentication } from "../contexts/authContext";

function UserForm({ employee = {} }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [imageFile, setImageFile] = useState(
    employee?.image ? { uri: employee.image } : null
  );
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const { user } = useAuthentication();
  const isExistingUser = Object.keys(employee).length > 0;

  const rolesList = [
    "General Manager",
    "Regional Manager",
    "Inventory Manager",
    "Store Manager",
    "Cashier",
  ];

  const allowedRoles = rolesList.filter(
    (role) => rolesList.indexOf(user.role) < rolesList.indexOf(role)
  );

  const [selectedRole, setSelectedRole] = useState(employee?.role || "");

  const handleClear = () => {
    reset({
      name: "",
      role: "",
      email: "",
      phone: "",
    });
    setImageFile(null);
    setSelectedRole("");
  };

  const onSubmit = (data) => {
    const formattedPhoneNumber = data.phone.padStart(10, "0").slice(0, 10);
    const newUser = {
      ...data,
      phone: formattedPhoneNumber,
      image: imageFile,
      role: selectedRole,
    };

    console.log("New user data: ", newUser);
  };

  const showRolePicker = () => setVisible(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {!isExistingUser ? "Add New Employee" : "Update Employee Details"}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Employee Name</Text>

        <Controller
          control={control}
          name="name"
          rules={{
            required: "Employee Name is required",
            pattern: {
              value: /^[A-Za-z_ ]+$/,
              message:
                "Employee Name can only contain letters, spaces, or underscores",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Employee Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
              defaultValue={employee?.name || null}
            />
          )}
        />
      </View>
      {/* Role Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Employee Role</Text>

        <TouchableOpacity onPress={showRolePicker} style={styles.pickerInput}>
          <TextInput
            // label="Select Role"
            placeholder="Select Role"
            mode="outlined"
            value={selectedRole}
            onChangeText={() => {}}
            right={<TextInput.Icon name="menu-down" />}
            style={styles.input}
            editable={false} // to prevent keyboard from opening
            theme={{
              roundness: 25,
            }}
            defaultValue={employee?.role || null}
          />
        </TouchableOpacity>
      </View>

      {/* Dialog for Role Picker */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Select the Role</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
              {allowedRoles.map((role, index) => (
                <List.Item
                  key={index}
                  title={role}
                  onPress={() => {
                    setSelectedRole(role);
                    setVisible(false);
                  }}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Email Address</Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // label="Email Address"
              placeholder="Enter Email Address"
              mode="outlined"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
              defaultValue={employee?.email || null}
            />
          )}
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Mobile Number</Text>

        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Phone is required",
            pattern: {
              value: /^0\d{9}$/,
              message: "Phone must start with 0 and be 10 digits long",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              //  label="Phone Number"
              placeholder="Enter Phone Number"
              mode="outlined"
              keyboardType="phone-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.phone}
              maxLength={10}
              style={styles.input}
              theme={{
                roundness: 25,
              }}
              defaultValue={employee?.phone || null}
            />
          )}
        />

        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}> Employee Image</Text>
        <ImagesPicker imageFile={imageFile} setImageFile={setImageFile} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          style={styles.button}
        >
          Submit
        </Button>
        <Button mode="outlined" onPress={handleClear} style={styles.button}>
          Clear All
        </Button>
      </View>
    </ScrollView>
  );
}

export default UserForm;

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
  input: {
    marginBottom: 6,
    height: 40,
    fontSize: 14,
    paddingVertical: 2,
  },
  pickerInput: {
    marginBottom: 2,
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
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#41009c",
    marginBottom: 6,
  },
});
