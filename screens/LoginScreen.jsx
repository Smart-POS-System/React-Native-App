import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import LoginForm from "../components/loginForm";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

function LoginScreen() {
  // Shared values for animations
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const glowOpacity = useSharedValue(1);
  const logoRotation = useSharedValue(0); // Rotation value for 3D look
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate the logo's initial fade-in and scale up
    logoOpacity.value = withTiming(1, { duration: 1500 });
    logoScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    // After the logo becomes steady, make it glow and rotate in 3D
    setTimeout(() => {
      glowOpacity.value = withRepeat(
        withTiming(0.7, { duration: 800 }),
        -1,
        true // Reverse the animation on each repeat for glowing effect
      );

      // Rotate the logo back and forth to give it a 3D perspective
      logoRotation.value = withRepeat(
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true // Reverse the rotation to create a smooth 3D effect
      );
    }, 1500);

    // Animate the form's fade-in with a delay
    formOpacity.value = withTiming(1, { duration: 1500, delay: 500 });
  }, []);

  // Animated styles for the logo with 3D effect
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value, // Apply glowing effect with pulsating opacity
      transform: [
        { scale: logoScale.value }, // Scale the logo
        { rotateY: `${logoRotation.value}deg` }, // Rotate the logo in 3D
        { perspective: 1000 }, // Add a perspective to give a 3D effect
      ],
    };
  });

  // Animated styles for the form
  const formStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value, // Apply fade-in opacity to the form
    };
  });

  return (
    <LinearGradient
      colors={["#3131f0", "#ADD8E6"]} // Dark blue to very light blue
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Circular background for the logo */}
        <View style={styles.logoBackground}>
          {/* Animated logo with glow and 3D rotation */}
          <Animated.View style={[styles.imageContainer, logoStyle]}>
            <Image
              source={require("../assets/SmartPOS.png")}
              style={styles.image}
              resizeMode="contain" // Ensure the image scales properly without being cut off
            />
          </Animated.View>
        </View>

        {/* Animated form with fade-in */}
        <Animated.View style={[styles.formContainer, formStyle]}>
          <Card style={styles.formCard} elevation={5}>
            <LoginForm />
          </Card>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logoBackground: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150, // Increase size for better visibility
    height: 150,
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    padding: 10,
    borderRadius: 20,
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Form transparency
  },
});
