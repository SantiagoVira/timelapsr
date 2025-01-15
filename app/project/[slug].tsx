import Picture from "@/components/Picture";
import PreviewTimelapse from "@/components/PreviewTimelapse";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { get_project_images } from "@/hooks/db";
import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Project: React.FC = () => {
  const { slug } = useLocalSearchParams();
  const [allImages, setAllImages] = useState<string[]>([]);
  const db = useSQLiteContext();

  useFocusEffect(() => {
    if (allImages.length > 0) return;
    get_project_images(db, slug.toString()).then((r) => {
      setAllImages(r.map((r) => r.uri));
    });
  });

  return (
    <ThemedView style={styles.content}>
      <View style={styles.header}>
        <Link href={"../"}>
          <Ionicons name="arrow-back" color="white" size={28} />
        </Link>
        <ThemedText type="title">{slug}</ThemedText>
      </View>
      <PreviewTimelapse project_name={slug.toString()} allImages={allImages} />
      <ScrollView horizontal style={styles.imageCarouselWrapper}>
        <View style={styles.imageCarousel}>
          {allImages.map((img, i) => (
            <Picture uri={img} num={i + 1} key={i} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  imageCarouselWrapper: {
    width: "100%",
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
  },
  imageCarousel: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
  },
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
