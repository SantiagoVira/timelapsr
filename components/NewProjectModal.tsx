import { StyleSheet, Text, TextInput } from "react-native";
import { CustomModal } from "./CustomModal";
import { ThemedText } from "./ThemedText";

export const NewProjectModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      <ThemedText type="subtitle">New Project</ThemedText>
      <Text style={styles.inputLabel}>
        Name: <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. My Favorite Tree"></TextInput>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: "white",
    marginTop: 18,
  },
  required: {
    color: "red",
    marginLeft: 4,
  },
  input: {
    marginTop: 8,
    borderRadius: 8,
    padding: 12,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
