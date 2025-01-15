import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DeletePictureModal from "./DeletePictureModal";
import { useSQLiteContext } from "expo-sqlite";
import { delete_image_from_project } from "@/hooks/db";

const Picture: React.FC<{ uri: string; num: number; project_name: string }> = ({
  uri,
  num,
  project_name,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const db = useSQLiteContext();
  return (
    <View style={styles.container}>
      <DeletePictureModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        num={num}
        onDelete={() => {
          delete_image_from_project(db, uri);
          setModalVisible(false);
        }}
        project_name={project_name}
      />
      <Image source={uri} style={styles.image} />
      <Text style={styles.numLabel}>{num}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Ionicons name="trash" color="red" size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 6,
    position: "relative",
    marginTop: 9,
  },
  deleteButton: {
    backgroundColor: "white",
    borderRadius: "100%",
    padding: 8,
    position: "absolute",
    top: -9,
    right: -9,
  },
  image: {
    height: 150,
    aspectRatio: 0.75,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.75)",
  },
  numLabel: {
    color: "#AAAAAA",
    fontSize: 18,
    paddingLeft: 4,
  },
});

export default Picture;
