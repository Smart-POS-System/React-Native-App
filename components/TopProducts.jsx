import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { products } from "../helpers/list";

// Sort products by amount in descending order
const sortedProducts = products.sort((a, b) => b.amount - a.amount);

// Select top 4 products
const top4 = sortedProducts.slice(0, 4);

// Group the rest into "Others"
const others = sortedProducts
  .slice(4)
  .reduce((acc, product) => acc + product.amount, 0);

// Prepare the data for the pie chart
const chartData = [...top4, { product: "Others", amount: others }];

// Define color palette
const colors = ["#38ade7", "#ff8a80", "#ffcd56", "#4bc0c0", "#9966ff"];

// Define PieChart component
function TopProducts() {
  const pieData = chartData.map((item, index) => ({
    key: `${item.product}-${index}`, // Ensure unique keys
    value: item.amount,
    svg: { fill: colors[index % colors.length] },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Products of This Week</Text>
      <View style={styles.chartContainer}>
        <PieChart
          style={styles.pieChart}
          data={pieData}
          outerRadius="80%"
          innerRadius="50%"
          padAngle={0.03}
        />
        <View style={styles.legend}>
          {chartData.map((item, index) => (
            <View key={`${item.product}-${index}`} style={styles.legendItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: colors[index % colors.length] },
                ]}
              />
              <Text style={styles.legendText}>
                {item.product}
                {/* : Rs.{item.amount}.00 */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Styles for modern UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pieChart: {
    height: 200,
    width: 200,
  },
  legend: {
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorBox: {
    width: 10,
    height: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default TopProducts;
