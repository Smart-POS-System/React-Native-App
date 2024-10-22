import { StyleSheet, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

function DialogBox({
  title,
  body,
  visible,
  setVisible,
  handleDone,
  setState,
  status,
}) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          setState(false);
        }}
        style={status === "danger" ? { backgroundColor: "#f8c6c6" } : null}
      >
        <Dialog.Title
          style={[styles.title, status === "danger" ? { color: "red" } : null]}
        >
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={[styles.body, status === "danger" ? { color: "red" } : null]}
          >
            {body}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setVisible(false);
              setState(false);
            }}
            labelStyle={status === "danger" ? { color: "red" } : null}
          >
            No
          </Button>
          <Button
            onPress={handleDone}
            labelStyle={status === "danger" ? { color: "red" } : null}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default DialogBox;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
  },
});
