import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Card as PaperCard, Avatar } from "react-native-paper";

// Animated Number Component that smoothly transitions the amount value
const AnimatedNumber = ({ value }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true, // Uses native driver for better performance
    }).start();
  }, [value]);

  const animatedText = animatedValue.interpolate({
    inputRange: [0, value],
    outputRange: ["0", `${value}`],
  });

  return (
    <Animated.Text style={styles.counter}>Rs. {animatedText}</Animated.Text>
  );
};

// Card Component using React Native Paper
function Card({ title, amount, icon, colour, outerColour }) {
  return (
    <PaperCard style={[styles.card, { backgroundColor: outerColour }]}>
      <View style={styles.cardContent}>
        <Avatar.Icon
          icon={icon}
          style={{
            backgroundColor: colour,
            width: 30,
            height: 30,
            marginRight: 0,
          }}
          size={30}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <AnimatedNumber value={amount} />
        </View>
      </View>
    </PaperCard>
  );
}

// DashboardCards component that holds all individual cards in a two-column grid
function DashboardCards() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Card
          title="Total Revenue"
          amount={5000}
          icon="book"
          colour="#4ac71c" // Green-300 equivalent
          outerColour="#83ec90" // Green-100 equivalent
        />
        <Card
          title="Total Sales"
          amount={5000}
          icon="currency-usd"
          colour="#d15ef4" // Purple-300 equivalent
          outerColour="#ecb8fb" // Purple-100 equivalent
        />
      </View>
      <View style={styles.row}>
        <Card
          title="Total Purchase"
          amount={5000}
          icon="cart"
          colour="#f7a544" // Orange-300 equivalent
          outerColour="#f7cfa0" // Orange-100 equivalent
        />
        <Card
          title="Total Return"
          amount={5000}
          icon="repeat"
          colour="#eeed00" // Yellow-300 equivalent
          outerColour="#fcfcb8" // Yellow-100 equivalent
        />
      </View>
    </View>
  );
}

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 10,
    color: "#475569",
    fontWeight: "bold",
  },
  counter: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardCards;
