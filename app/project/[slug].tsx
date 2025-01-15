import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const Project: React.FC = () => {
  const { slug } = useLocalSearchParams();

  return (
    <ThemedView style={styles.content}>
      <View style={styles.header}>
        <Link href={"../"}>
          <Ionicons name="arrow-back" color="white" size={28} />
        </Link>
        <ThemedText type="title">{slug}</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 18,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    paddingTop: 86,
  },
});

export default Project;
