import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    // Defensive check for navigation
    if (navigation) {
      setTimeout(() => {
        navigation.replace("Login");
      }, 5000);
    }
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#3131f0", "#ADD8E6"]} // Dark blue to very light blue
      style={styles.background}
    >
      <View style={styles.container}>
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("../assets/cart.json")}
          autoPlay
          loop={true}
          onAnimationFinish={() => {
            setAnimationLoaded(true); // This will be set when the animation finishes
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
