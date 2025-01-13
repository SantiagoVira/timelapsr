import { StyleSheet, View, Pressable, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

export const NewProjectButton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => alert("hello")}>
        <IconSymbol name="plus" color="white" weight="bold" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    aspectRatio: 1,
    borderRadius: "50%",
    backgroundColor: "#4B365E",
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
