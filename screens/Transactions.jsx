import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Provider as PaperProvider } from "react-native-paper";
import PurchaseComponent from "../components/PurchaseComponent";

const SalesRoute = () => <PurchaseComponent />;

const PurchaseRoute = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  Sales: SalesRoute,
  Purchases: PurchaseRoute,
});

const Transactions = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Sales", title: "Sales" },
    { key: "Purchases", title: "Purchases" },
  ]);

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 300 }}
          renderTabBar={(props) => <TabBar {...props} scrollEnabled />}
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Transactions;
