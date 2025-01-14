import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tree = require("../../assets/images/tree.png");

export default function TabTwoScreen() {
  /*
  Desired functionality:
  - capture
  - flash
  - reverse camera
  - zooming!!
  - countdown
  */

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("auto");
  const [timer, setTimer] = useState<0 | 3 | 5 | 10>(0);
  const [capturing, setCapturing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>();

  const getPermission = () => {
    if (permission && !permission.granted) {
      if (permission.canAskAgain) {
        requestPermission();
      } else {
        Linking.openSettings();
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={getPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const capture = () => {
    setCapturing(true);

    const recurse = (time: number) => {
      setTimeLeft(time);
      if (time === 0) {
        cameraRef.current?.takePictureAsync().then((r) => {
          console.log(r?.uri);
        });
        setCapturing(false);
      } else {
        setTimeout(() => recurse(time - 1), 1000);
      }
    };

    recurse(timer);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.cameraSettings}>
        <Pressable
          onPress={() => {
            if (flash === "auto") {
              setFlash("on");
            } else if (flash === "on") {
              setFlash("off");
            } else {
              setFlash("auto");
            }
          }}>
          {() => {
            if (flash === "auto") {
              return <Ionicons name="flash-outline" color="white" size={24} />;
            } else if (flash === "on") {
              return <Ionicons name="flash" color="white" size={24} />;
            } else {
              return <Ionicons name="flash-off" color="white" size={24} />;
            }
          }}
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", gap: 4 }}
          onPress={() => {
            if (timer === 0) {
              setTimer(3);
            } else if (timer === 3) {
              setTimer(5);
            } else if (timer === 5) {
              setTimer(10);
            } else if (timer === 10) {
              setTimer(0);
            }
          }}>
          <ThemedText style={{ width: 20, textAlign: "right" }}>
            {timer}
          </ThemedText>
          <Ionicons name="timer-outline" color="white" size={24} />
        </Pressable>
      </View>
      <View style={styles.viewport}>
        <Image source={Tree} style={styles.overlay}></Image>
        <CameraView
          style={styles.camera}
          facing={facing}
          ratio="4:3"
          flash={flash}
          ref={(r) => {
            cameraRef.current = r;
          }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <View style={styles.actionBar}>
        <View />
        <Pressable
          onPress={capture}
          style={{
            borderColor: `rgba(255, 255, 255, ${capturing ? 0.5 : 1})`,
            borderWidth: 4,
            width: 60,
            aspectRatio: 1,
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <View
            style={{
              width: 48,
              aspectRatio: 1,
              backgroundColor: `rgba(255, 255, 255, ${capturing ? 0.5 : 1})`,
              borderRadius: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {capturing && (
              <Text style={{ color: "white", fontWeight: 700, fontSize: 20 }}>
                {timeLeft}
              </Text>
            )}
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            setFacing((current) => (current === "back" ? "front" : "back"))
          }>
          <Ionicons name="camera-reverse" color="white" size={36} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  cameraSettings: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 12,
  },
  viewport: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.75,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    opacity: 0.3,
    width: "100%",
    height: "100%",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
    paddingTop: 86,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
