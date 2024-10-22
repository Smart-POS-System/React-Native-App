import { FontWeight } from "@shopify/react-native-skia";
import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";

function NotificationDialog({ visible, setVisible }) {
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ fontSize: 20, fontWeight: "bold" }}>
            Notifications
          </Dialog.Title>
          <Dialog.Content style={{ fontSize: 15 }}>
            <Text variant="bodyMedium">
              Currently there are no notifications.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default NotificationDialog;
