import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const PurchaseComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inventory, setInventory] = useState("All Inventories");

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate || date); // Fallback to current date if no date is selected
  };

  const inventories = [
    { label: "All Inventories", value: "All Inventories" },
    { label: "Inventory 1", value: "Inventory 1" },
    { label: "Inventory 2", value: "Inventory 2" },
    { label: "Inventory 3", value: "Inventory 3" },
  ];

  return (
    <PaperProvider>
      <ScrollView style={{ padding: 20 }}>
        <Text>Select Date:</Text>
        <Button onPress={() => setShowDatePicker(true)}>Pick a date</Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text>Inventory:</Text>
        <Picker
          selectedValue={inventory}
          onValueChange={(itemValue) => setInventory(itemValue)}
          style={{ height: 50, width: 150 }}
        >
          {inventories.map((inv) => (
            <Picker.Item key={inv.value} label={inv.label} value={inv.value} />
          ))}
        </Picker>
      </ScrollView>
    </PaperProvider>
  );
};

export default PurchaseComponent;
