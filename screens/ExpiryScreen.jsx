import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import SalesList from "../components/SalesList";
import PurchaseList from "../components/PurchaseList";
import ExpiredList from "../components/ExpiredList";
import ExpiringList from "../components/ExpiringList";

function ExpiryScreen() {
  const [value, setValue] = useState("expired");
  return (
    <View style={styles.outerContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Expiration of Stocks
      </Text>
      <View style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={(value) => setValue(value)}
          buttons={[
            {
              value: "expired",
              label: "Expired Stocks",
              icon: "alert",
            },
            {
              value: "expiring",
              label: "Expiring Stocks",
              icon: "alert-circle",
            },
          ]}
          style={{ width: "100%", fontSize: 12 }}
        />
        {value === "expired" && <ExpiredList />}
        {value === "expiring" && <ExpiringList />}
      </View>
    </View>
  );
}

export default ExpiryScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
