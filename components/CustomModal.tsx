import {
  Modal,
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

export const CustomModal: React.FC<
  React.PropsWithChildren<{ isVisible: boolean; onClose: () => void }>
> = ({ isVisible, children, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isVisible]);
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.delay(150).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        />
      </TouchableWithoutFeedback>

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
  modalOverlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "#000",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
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
