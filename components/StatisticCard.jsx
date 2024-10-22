// StatisticCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";
import AnimatedNumbers from "react-native-animated-numbers";

function StatisticCard({ title, value, icon, color, suffix }) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={title}
        left={(props) =>
          icon ? (
            <Avatar.Icon
              {...props}
              icon={icon}
              style={{ backgroundColor: color }}
              size={40}
            />
          ) : null
        }
        titleStyle={styles.title}
      />
      <Card.Content style={styles.cardContent}>
        <View style={styles.valueContainer}>
          <AnimatedNumbers
            animateToNumber={value}
            fontStyle={styles.value}
            includeComma
            animationDuration={1000}
            animationDelay={0}
            prefix="Rs. "
            formatter={(num) => `${num.toFixed(0)}${suffix}`}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%", // Two cards per row
    margin: 4,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StatisticCard;
