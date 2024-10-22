// File path: components/SalesChart.js

import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

// Sales and Purchases data
export const sales = [
  { date: "2024-08-31", amount: 450 },
  { date: "2024-09-01", amount: 134 },
  { date: "2024-09-02", amount: 401 },
  { date: "2024-09-03", amount: 0 },
  { date: "2024-09-04", amount: 410 },
  { date: "2024-09-05", amount: 0 },
  { date: "2024-09-06", amount: 314 },
];

export const purchases = [
  { date: "2024-08-31", amount: 122 },
  { date: "2024-09-01", amount: 252 },
  { date: "2024-09-02", amount: 132 },
  { date: "2024-09-03", amount: 107 },
  { date: "2024-09-04", amount: 22 },
  { date: "2024-09-05", amount: 135 },
  { date: "2024-09-06", amount: 200 },
];

// Function to format date as "MMM dd" (e.g., "Aug 31")
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(date);
};

const SalesChart = () => {
  // State to track whether "sales" or "purchases" is selected
  const [selectedData, setSelectedData] = useState("sales");
  const [tooltip, setTooltip] = useState(null);
  const [pointerX, setPointerX] = useState(null);
  const [pointerY, setPointerY] = useState(null);

  // Full labels array for tooltip purposes
  const fullLabels = (selectedData === "sales" ? sales : purchases).map(
    (item) => formatDate(item.date)
  );

  // Extract labels (formatted dates) and data (amounts) from selected data
  const selectedDataset = selectedData === "sales" ? sales : purchases;

  // Use reduced labels to show on the x-axis
  const labels = selectedDataset.map(
    (item, index) => (index % 2 === 0 ? formatDate(item.date) : "") // Show every second date, increase this gap as needed
  );

  const data = selectedDataset.map((item) => item.amount);

  const handleDataPointClick = (data) => {
    setTooltip({ value: data.value, label: fullLabels[data.index] });
    setPointerX(data.x); // Set the x-coordinate of the pointer
    setPointerY(data.y); // Set the y-coordinate of the pointer
  };

  return (
    <View>
      {/* Buttons to select between Sales and Purchases */}
      <Text style={styles.title}>
        Variation of Sales and Purchases of this week
      </Text>
      <View style={styles.buttonContainer}>
        <SegmentedButtons
          value={selectedData}
          onValueChange={(value) => setSelectedData(value)}
          buttons={[
            {
              value: "sales",
              label: "Sales",
              icon: "cash",
            },
            {
              value: "purchases",
              label: "Purchases",
              icon: "cart",
            },
          ]}
          style={{ width: "70%", fontSize: 12 }}
        />
      </View>

      {/* Tooltip */}
      {tooltip && (
        <View
          style={[
            styles.tooltip,
            {
              left: pointerX - 50,
              top: pointerY + 30,
              backgroundColor:
                selectedData === "sales"
                  ? "rgba(25, 166, 243, 0.7)"
                  : "rgba(255, 99, 132, 0.7)",
            },
          ]}
        >
          <Text>{`Date: ${tooltip.label}`}</Text>
          <Text>{`Amount: Rs. ${tooltip.value}`}</Text>
        </View>
      )}

      <LineChart
        data={{
          labels: labels, // Reduced labels for x-axis with increased gap
          datasets: [
            {
              data: data,
              color: (opacity = 1) =>
                selectedData === "sales"
                  ? `rgba(0, 123, 255, ${opacity})` // Blue for sales
                  : `rgba(255, 99, 132, ${opacity})`, // Red for purchases
              strokeWidth: 2, // Line thickness
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // Width of the chart
        height={220} // Height of the chart
        // Y-axis labels remain the same
        // yAxisSuffix=" Rs."
        yAxisInterval={1} // Defines the interval between Y-axis labels
        chartConfig={{
          backgroundColor: "#ffffff", // Neutral background color
          backgroundGradientFrom: "#ffffff", // No background gradient
          backgroundGradientTo: "#ffffff", // No background gradient
          decimalPlaces: 2, // Two decimal places
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black line and label color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffffff",
          },
          fillShadowGradient: selectedData === "sales" ? "#3b9eff" : "#ff6384",
          fillShadowGradientTo:
            selectedData === "sales" ? "#02265b" : "#7f0c0c",
          fillShadowGradientOpacity: 0.7,
        }}
        bezier // Smooth curve
        style={{
          marginTop: 8,
          borderRadius: 16,
          padding: 8,
        }}
        withHorizontalLines={true}
        withVerticalLines={true}
        fromZero={true}
        onDataPointClick={handleDataPointClick}
      />

      {/* Axis Labels */}
      <Text style={styles.axisLabelX}>Date</Text>
      <Text style={styles.axisLabelY}>Amount (Rs.)</Text>

      {/* Movable Pointer */}
      {pointerX !== null && (
        <View
          style={[styles.pointer, { left: pointerX - 5, top: pointerY - 5 }]}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: "100%", // Full width
  },
  tooltip: {
    position: "absolute",
    padding: 10,
    borderRadius: 5,
    zIndex: 100,
    color: "#fff",
  },
  // pointer: {
  //   position: "absolute",
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: "#100664",
  //   zIndex: 100,
  // },
  axisLabelX: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  axisLabelY: {
    position: "absolute",
    top: 170,
    left: -40,
    fontSize: 14,
    transform: [{ rotate: "270deg" }], // Rotate the label for Y-axis
    fontWeight: "bold",
  },
});

export default SalesChart;
