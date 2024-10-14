import { FAB, Portal } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

function FloatButton({ actions }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={isClicked}
        visible
        icon={isClicked ? "minus" : "plus"}
        actions={actions}
        onStateChange={({ open }) => setIsClicked(open)}
        style={styles.fabGroup} // Add this style to adjust the bottom position
      />
    </Portal>
  );
}

export default FloatButton;

const styles = StyleSheet.create({
  fabGroup: {
    bottom: 30, // Moves the button 30 units above the default bottom position
    right: 16, // Keeps it positioned 16 units from the right side
    position: "absolute", // Ensure the button is absolutely positioned
  },
});
