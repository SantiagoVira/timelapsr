import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  useAnimatedValue,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import { useEffect } from "react";
import Modal from "react-native-modal";

export const CustomModal: React.FC<
  React.PropsWithChildren<{ isVisible: boolean; onClose: () => void }>
> = ({ isVisible, children, onClose }) => {
  return (
    <Modal
      hasBackdrop
      isVisible={isVisible}
      avoidKeyboard
      hideModalContentWhileAnimating
      swipeDirection="down"
      onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.xbar}>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: "#25292e",
    borderRadius: 18,
    bottom: 0,
    padding: 24,
    paddingBottom: 42,
  },
  xbar: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
