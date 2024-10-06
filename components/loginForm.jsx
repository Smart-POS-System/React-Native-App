import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, BackHandler } from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../api/api";
import Toast from "react-native-toast-message";
import { useAuthentication } from "../contexts/authContext";

function LoginForm() {
  const { colors } = useTheme();
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const { authenticate } = useAuthentication();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (formData) => {
    setData(formData);
    setLoading(true);
    setIsError(false);
  };

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        try {
          const response = await loginUser(data);
          setLoading(false);
          setIsSuccess(true);
          setIsError(false);
          Toast.show({
            type: "success",
            text1: "Login Successful",
          });
          //console.log(response.token);
          authenticate(response);
        } catch (error) {
          setLoading(false);
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(error.message || "An error occurred");
          Toast.show({
            type: "error",
            text1: "An error occurred",
            text2: error.message || "Please try again",
          });
        }
      };
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        setBackPressedOnce(true);

        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backPressedOnce]);

  function handleBackButton() {
    if (backPressedOnce) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      setBackPressedOnce(true);

      setTimeout(() => setBackPressedOnce(false), 2000);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Please enter your email address",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              placeholder="Enter your email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.email}
              style={styles.input}
              theme={{ colors: { primary: colors.primary } }}
            />
          )}
        />
        {errors.email && (
          <HelperText type="error" visible={true}>
            {errors.email.message}
          </HelperText>
        )}

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Please enter your password",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              mode="outlined"
              placeholder="Enter your password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.password}
              style={(styles.input, { marginTop: 10 })}
              theme={{ colors: { primary: colors.primary } }}
            />
          )}
        />
        {errors.password && (
          <HelperText type="error" visible={true}>
            {errors.password.message}
          </HelperText>
        )}

        {/* Submit Button */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            contentStyle={styles.buttonContent}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            disabled={loading || isSubmitting} // Disable button when loading
          >
            Login
          </Button>
          <Button
            mode="contained"
            onPress={handleBackButton}
            contentStyle={styles.buttonContent}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Leave
          </Button>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.primary}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    width: "48%",
  },
  buttonContent: {
    height: 50,
    backgroundColor: "#3131f0",
  },
  buttonLabel: {
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    marginTop: 10,
  },
  successMessage: {
    marginTop: 10,
    color: "green",
  },
});

export default LoginForm;
