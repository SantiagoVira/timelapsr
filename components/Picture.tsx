import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Picture: React.FC<{ uri: string; num: number }> = ({ uri, num }) => {
  console.log(uri);
  return (
    <View style={styles.container}>
      <Image source={uri} style={styles.image} />
      <Text style={styles.numLabel}>{num}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          alert("delete");
        }}>
        <Ionicons name="trash" color="red" size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "flex-start", gap: 6, position: "relative" },
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
