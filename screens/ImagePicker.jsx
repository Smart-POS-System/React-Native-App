import {
  PermissionStatus,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";

function ImagesPicker({ imageFile, setImageFile }) {
  const [permissionPromptShown, setPermissionPromptShown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Verify camera permission
  async function verifyCameraPermission() {
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

  // Verify gallery permission
  async function verifyGalleryPermission() {
    const galleryPermissionInformation =
      await requestMediaLibraryPermissionsAsync();
    if (galleryPermissionInformation.status !== PermissionStatus.GRANTED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant gallery permissions to use this app. Please go to the app settings and enable the permission.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "App Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  }

  // Handle button click
  function handleButtonClick() {
    setIsClicked(true);
  }

  // Handle image selection from the camera
  async function handleCameraSelection() {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!image.canceled) {
        setImageFile({ uri: image.assets[0].uri });
      }
    } catch (error) {
      console.error("Error taking image:", error);
    }
    setIsClicked(false);
  }

  // Handle image selection from the gallery
  async function handleGallerySelection() {
    const hasPermission = await verifyGalleryPermission();
    if (!hasPermission) {
      return;
    }

    try {
      const image = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!image.canceled) {
        setImageFile({ uri: image.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image from gallery:", error);
    }
    setIsClicked(false);
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
        <Button mode="outlined" onPress={handleButtonClick}>
          {imageFile && imageFile.uri ? "Change Image" : "Upload Image"}
        </Button>
      </View>

      {isClicked && (
        <Portal>
          <Dialog
            style={{ backgroundColor: "#f9f9f9" }}
            visible={isClicked}
            onDismiss={() => setIsClicked(false)}
          >
            <Dialog.Title style={{ fontSize: 20, fontWeight: "bold" }}>
              Choose an image from
            </Dialog.Title>
            <Dialog.Content>
              <View style={styles.dialogContent}>
                {/* Camera Option */}
                <TouchableOpacity
                  style={styles.option}
                  onPress={handleCameraSelection}
                >
                  <Image
                    source={require("../assets/camera.png")}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>

                {/* Gallery Option */}
                <TouchableOpacity
                  style={styles.option}
                  onPress={handleGallerySelection}
                >
                  <Image
                    source={require("../assets/gallery.png")}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsClicked(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
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
    marginVertical: 2,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
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
  dialogContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  option: {
    alignItems: "center",
  },
  optionImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
