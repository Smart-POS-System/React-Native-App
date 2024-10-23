import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { products } from "../helpers/list";

// Sort products by amount in descending order
const sortedProducts = products.sort((a, b) => b.amount - a.amount);

// Select top 4 products
const top4 = sortedProducts.slice(0, 4);

// Group the rest into "Others"
const others = sortedProducts
  .slice(4)
  .reduce((acc, product) => acc + product.amount, 0);

// Prepare the data for the bar chart
const chartData = [...top4, { product: "Others", amount: others }];

// Define labels and amounts for the BarChart
const labels = chartData.map((item) => item.product);
const amounts = chartData.map((item) => item.amount);

// Define color palette
const colors = ["#38ade7", "#ff8a80", "#ffcd56", "#4bc0c0", "#9966ff"];

// Define BarChart component
function TopProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Products of This Week</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: amounts,
                colors: colors.map((color) => () => color), // Apply the color palette
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // Adjust width dynamically
          height={220}
          chartConfig={{
            backgroundColor: "rgb(212, 216, 255)",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0, // No decimal points
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.7,
            fillShadowGradientOpacity: 1,
            propsForBackgroundLines: {
              strokeDasharray: "", // Solid background lines
            },
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {},
            propsForLabels: {
              fontSize: 10, // Set the font size for x-axis labels
            },
          }}
          fromZero // Start from zero
          showValuesOnTopOfBars // Display values on top of bars
          withCustomBarColorFromData={true} // Enable custom colors from data
          flatColor={true} // Prevent gradient fill for bars
          style={styles.barChart}
        />
      </View>
      {/* Adding X-axis label */}
      <Text style={styles.xAxisLabel}>Name of the product</Text>
      {/* Adding Y-axis label */}
      <Text style={styles.yAxisLabel}>Amount</Text>
    </View>
  );
}

// Styles for modern UI
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 5,
  },
  chartContainer: {
    alignItems: "center",
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  xAxisLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
  // Custom Y-axis label style (positioned manually)
  yAxisLabel: {
    position: "absolute",
    left: -15,
    top: Dimensions.get("window").height / 4,
    transform: [{ rotate: "-90deg" }],
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default TopProducts;
