import {
  Image,
  StyleSheet,
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Touchable,
  TouchableHighlight,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NewProjectButton } from "@/components/NewProjectButton";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { Project } from "@/components/Project";
import { useState } from "react";
import { NewProjectModal } from "@/components/NewProjectModal";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ThemedView style={styles.content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Projects</ThemedText>
      </ThemedView>

      <FlatList
        data={[
          { name: "Cherry Blossom" },
          { name: "Oak" },
          { name: "Oaky" },
          { name: "Oakie" },
        ]}
        renderItem={(item) => <Project {...item.item} />}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ gap: 10 }} // Row gap
        columnWrapperStyle={{ gap: 10 }} // Column gap
        numColumns={2}
      />

      <NewProjectModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <View style={{ ...styles.footer, bottom: useBottomTabOverflow() }}>
        <NewProjectButton onClick={() => setModalVisible(true)} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    paddingTop: 86,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  grid: {},
  footer: {
    position: "absolute",
    right: 12,
  },
});
