import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import SalesList from "../components/SalesList";
import PurchaseList from "../components/PurchaseList";

function Transactions() {
  const [value, setValue] = useState("sales");
  return (
    <View style={styles.outerContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Sales and Purchases
      </Text>
      <View style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={(value) => setValue(value)}
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
          style={{ width: "80%", fontSize: 12 }}
        />
        {value === "sales" && <SalesList />}
        {value === "purchases" && <PurchaseList />}
      </View>
    </View>
  );
}

export default Transactions;

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
