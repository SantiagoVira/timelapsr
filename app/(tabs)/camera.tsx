import Capture from "@/components/camera/Capture";
import Flash from "@/components/camera/Flash";
import PermissionsWrapper from "@/components/camera/PermissionsWrapper";
import Reverse from "@/components/camera/Reverse";
import Timer, { TimerValueType } from "@/components/camera/Timer";
import { ThemedView } from "@/components/ThemedView";
import { CameraView, CameraType, FlashMode } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

const Tree = require("../../assets/images/tree.png");

export default function TabTwoScreen() {
  /*
  Desired functionality:
  - zooming!!
  */

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("auto");
  const [timer, setTimer] = useState<TimerValueType>(0);
  const cameraRef = useRef<CameraView | null>();

  return (
    <PermissionsWrapper>
      <ThemedView style={styles.container}>
        <View style={styles.cameraSettings}>
          <Flash flash={flash} setFlash={setFlash} />
          <Timer timer={timer} setTimer={setTimer} />
        </View>

        <View style={styles.viewport}>
          <Image source={Tree} style={styles.overlay} />
          <CameraView
            style={styles.camera}
            facing={facing}
            ratio="4:3"
            flash={flash}
            ref={(r) => {
              cameraRef.current = r;
            }}
          />
        </View>

        <View style={styles.actionBar}>
          <View />
          <Capture timer={timer} cameraRef={cameraRef} />
          <Reverse setFacing={setFacing} />
        </View>
      </ThemedView>
    </PermissionsWrapper>
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
});
