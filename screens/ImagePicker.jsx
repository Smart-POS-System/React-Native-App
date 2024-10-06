import {
  PermissionStatus,
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { Alert, Image, Linking, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button } from "react-native-paper";

function ImagesPicker({ imageFile, setImageFile }) {
  const [permissionPromptShown, setPermissionPromptShown] = useState(false);

  async function verifyPermission() {
    const cameraPermissionInformation = await requestCameraPermissionsAsync();
    if (cameraPermissionInformation.status !== PermissionStatus.GRANTED) {
      if (permissionPromptShown) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant camera permissions to use this app. Please go to the app settings and enable the permission.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "App Settings", onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        setPermissionPromptShown(true);
      }
      return false;
    }
    return true;
  }

  async function handleImagePicker() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(image);
      if (!image.canceled) {
        setImageFile({ uri: image.assets[0].uri });
      }
    } catch (error) {
      console.error("Error taking image:", error);
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {imageFile && imageFile.uri ? (
          <Image
            style={styles.image}
            source={{ uri: imageFile.uri }}
            onLoadStart={() => console.log("Loading image")}
            onLoadEnd={() => console.log("Image loaded")}
          />
        ) : (
          <Text style={styles.text}>No image picked yet</Text>
        )}
      </View>
      <View style={styles.imageUploadContainer}>
        <Button mode="outlined" onPress={handleImagePicker}>
          {imageFile && imageFile.uri ? "Change Image" : "Upload Image"}
        </Button>
      </View>
    </View>
  );
}

export default ImagesPicker;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  container: {
    width: 140,
    height: 140,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  button: {
    borderRadius: 10,
    color: "red",
  },
  imageUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
