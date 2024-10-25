import { ScrollView, StyleSheet, Text, View } from "react-native";
import DashboardCards from "../components/Cards";
import SalesChart from "../components/SalesAndPurchaseChart";
import TopProducts from "../components/TopProducts";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useAuthentication } from "../contexts/authContext";

function Dashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: formatDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)),
    endDate: formatDate(new Date(Date.now())),
  });
  const [selectedRange, setSelectedRange] = useState("lastYear");
  const { setIsUpdated } = useAuthentication();

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    let newStartDate;
    const endDate = formatDate(new Date());

    switch (value) {
      case "7days":
        newStartDate = formatDate(
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        break;
      case "lastMonth":
        newStartDate = formatDate(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
        break;
      case "last6months":
        newStartDate = formatDate(
          new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
        );
        break;
      case "lastYear":
        newStartDate = formatDate(
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        );
        break;
    }

    setDateRange({
      startDate: newStartDate,
      endDate: endDate,
    });
    setIsUpdated((value) => !value);

    console.log(dateRange.startDate);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Dashboard</Text>

          {/* Dropdown for selecting time range */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedRange}
              style={styles.picker}
              onValueChange={(itemValue) => handleRangeChange(itemValue)}
            >
              <Picker.Item label="Last 7 Days" value="7days" />
              <Picker.Item label="Last Month" value="lastMonth" />
              <Picker.Item label="Last 6 Months" value="last6months" />
              <Picker.Item label="Last Year" value="lastYear" />
            </Picker>
          </View>
        </View>

        <Text style={styles.subheader}>
          Sales and Income Overview of this week
        </Text>
        <DashboardCards
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
        />
        <SalesChart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
        />
        <TopProducts />
      </View>
    </ScrollView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    maxWidth: 148, // adjust the width as needed
  },
  picker: {
    height: 50,
    width: "100%",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
