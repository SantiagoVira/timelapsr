import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

const Project: React.FC = () => {
  const { slug } = useLocalSearchParams();

  return (
    <ThemedView style={styles.content}>
      <ThemedText>{slug}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    paddingTop: 86,
  },
});

export default Project;
