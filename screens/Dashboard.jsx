import { ScrollView, StyleSheet, Text, View } from "react-native";
import DashboardCards from "../components/Cards";
import SalesChart from "../components/SalesAndPurchaseChart";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import useLogout from "../hooks/useLogout";

function Dashboard() {
  const { isLoading, handleLogoutUser } = useLogout();
  function handleLogout() {
    handleLogoutUser();
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Dashboard</Text>
        <Text style={styles.subheader}>
          Sales and Income Overview of this week
        </Text>
        <DashboardCards />
        <Button onPress={handleLogout}>Log out</Button>
        {/* <SalesChart /> */}
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
