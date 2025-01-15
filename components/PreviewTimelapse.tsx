import { get_project_images } from "@/hooks/db";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const PreviewTimelapse: React.FC<{
  project_name: string;
  allImages: string[];
}> = ({ project_name, allImages }) => {
  const db = useSQLiteContext();
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    get_project_images(db, project_name).then((r) => {
      setCurrentImage(r[r.length - 1].uri);
    });
  }, [allImages]);

  const play = (idx: number) => {
    if (idx === allImages.length) {
      setPlaying(false);
      return;
    }

    setCurrentImage(allImages[idx]);
    setTimeout(() => play(idx + 1), 100);
  };

  return (
    <View style={styles.previewContainer}>
      <Image source={currentImage} style={styles.preview} />

      {currentImage && !playing ? (
        <Pressable
          onPress={() => {
            setPlaying(true);
            play(0);
          }}>
          <Ionicons
            name="play"
            color="rgba(255,255,255,0.5)"
            size={88}
            style={styles.playButton}
          />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playButton: {
    zIndex: 100,
  },
  previewContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 12,
    aspectRatio: 0.75,
  },
  preview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 12,
    top: 0,
    left: 0,
  },
});

export default PreviewTimelapse;
