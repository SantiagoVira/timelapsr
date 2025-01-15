import { StyleSheet, View, Pressable, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { ProjectType } from "@/hooks/db";

export const Project: React.FC<ProjectType> = ({ project, uri }) => {
  return (
    <Pressable style={styles.container} onTouchStart={() => alert("hello")}>
      <Image source={uri} style={styles.image} />
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {project}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "95%",
    aspectRatio: "0.75",
    borderRadius: 4,
  },
  title: {
    color: "white",
    wordWrap: "break-word",
    textAlign: "left",
    width: "100%",
    marginTop: 4,
  },
  container: {
    maxWidth: "49%",
    flex: 1,
    flexDirection: "column",
    borderRadius: 6,
    backgroundColor: "#3c3c3c",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
