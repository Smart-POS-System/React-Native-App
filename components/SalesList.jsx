import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Button, Card, Paragraph, Title } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { salesDetails } from "../helpers/list";
import LottieView from "lottie-react-native";

function SalesList() {
  const [startDate, setStartDate] = useState(
    formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // 7 days ago
  );
  const [endDate, setEndDate] = useState(formatDate(new Date(Date.now())));

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const showDatePicker = (currentDate, setDate) => {
    DateTimePickerAndroid.open({
      value: new Date(currentDate),
      mode: "date",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(formatDate(selectedDate));
        }
      },
    });
  };

  // Filter sales based on the selected date range
  const filteredSales = salesDetails.filter(
    (sale) => sale.date >= startDate && sale.date <= endDate
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title style={styles.billId}>Bill Number: {item.bill_id}</Title>
          <Text style={styles.date}>Date: {item.date}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="person" size={18} color="#46047c" />
          <Text style={styles.text}>Customer Name : {item.customer_name}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="pricetag" size={18} color="#46047c" />
          <Text style={styles.text}> Amount : Rs.{item.amount}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash" size={18} color="#46047c" />
          <Text style={styles.text}>
            {" "}
            Payment Method : {item.payment_method}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="storefront" size={18} color="#46047c" />
          <Text style={styles.text}> Store : {item.store}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="people" size={18} color="#46047c" />
          <Text style={styles.text}> Cashier : {item.cashier}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="wallet" size={18} color="#46047c" />
          <Text style={styles.text}> Discount : Rs.{item.discount}</Text>
        </View>

        {item.description && (
          <View style={styles.row}>
            <Ionicons name="information-circle" size={18} color="#46047c" />
            <Text style={styles.text}> {item.description}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Date selection */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>Start Date: {startDate}</Text>
        <Button
          mode="contained"
          onPress={() => showDatePicker(startDate, setStartDate)}
          style={styles.dateButton}
          theme={{ roundness: 25 }}
          labelStyle={styles.buttonText}
        >
          Select Starting Date
        </Button>

        <Text style={styles.label}>End Date: {endDate}</Text>
        <Button
          mode="contained"
          onPress={() => showDatePicker(endDate, setEndDate)}
          style={styles.dateButton}
          theme={{ roundness: 25 }}
          labelStyle={styles.buttonText}
        >
          Select Ending Date
        </Button>
      </View>

      {/* FlatList to show sales data */}
      {filteredSales.length > 0 ? (
        <FlatList
          data={filteredSales}
          renderItem={renderItem}
          keyExtractor={(item) => item.bill_id.toString()}
          style={styles.list}
        />
      ) : (
        <View style={styles.lottieContainer}>
          {/* <Text style={styles.noDataText}>
            No sales found for the selected dates.
          </Text> */}
          <LottieView
            style={{ width: 250, height: 250 }}
            source={require("../assets/no-results.json")}
            autoPlay
            loop={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#46047c",
  },
  dateButton: {
    marginBottom: 15,
    borderRadius: 25,
    width: "70%",
  },
  buttonText: {
    fontSize: 14,
    textTransform: "none",
  },
  list: {
    marginTop: 15,
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "#f9ecfd", // Light background for the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  billId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#46047c",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ca92fc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Ensures alignment between icons and text
    marginBottom: 5, // Space between rows
  },
  text: {
    fontSize: 16,
    marginLeft: 10, // Space between icon and text
    color: "#46047c",
  },
  noDataText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SalesList;
