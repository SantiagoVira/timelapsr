import { StyleSheet, View, Pressable, Text } from "react-native";
import { ThemedText } from "./ThemedText";

export const Project: React.FC<{ name: string }> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => alert("hello")}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {name}
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    wordWrap: "break-word",
    textAlign: "left",
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 6,
    backgroundColor: "#3c3c3c",
    padding: 12,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
