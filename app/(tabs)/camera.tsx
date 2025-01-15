import Capture from "@/components/camera/Capture";
import Flash from "@/components/camera/Flash";
import PermissionsWrapper from "@/components/camera/PermissionsWrapper";
import ProjectPicker from "@/components/camera/ProjectPicker";
import Reverse from "@/components/camera/Reverse";
import Timer, { TimerValueType } from "@/components/camera/Timer";
import { ThemedView } from "@/components/ThemedView";
import { get_last_project_image, insert_image_into_project } from "@/hooks/db";
import { CameraView, CameraType, FlashMode } from "expo-camera";
import { Image } from "expo-image";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  /*
  Desired functionality:
  - zooming!!
  */

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("auto");
  const [timer, setTimer] = useState<TimerValueType>(0);
  const [project, setProject] = useState("tree");
  const [lastImage, setLastImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>();
  const db = useSQLiteContext();

  useEffect(() => {
    get_last_project_image(db, project).then((r) => setLastImage(r.uri));
  }, []);

  const takePicture = () => {
    cameraRef.current?.takePictureAsync().then((r) => {
      if (!r) return;
      insert_image_into_project(db, "tree", r.uri);
      setLastImage(r.uri);
    });
  };

  return (
    <PermissionsWrapper>
      <ThemedView style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.cameraSettings}>
            <Flash flash={flash} setFlash={setFlash} />
            <Timer timer={timer} setTimer={setTimer} />
          </View>
          <ProjectPicker />
        </View>

        <View style={styles.viewport}>
          <Image source={lastImage} style={styles.overlay} />
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
          <View style={styles.actionElement} />
          <View style={styles.actionElement}>
            <Capture timer={timer} takePicture={takePicture} />
          </View>
          <View style={styles.actionElement}>
            <Reverse setFacing={setFacing} />
          </View>
        </View>
      </ThemedView>
    </PermissionsWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    padding: 12,
    alignItems: "center",
    width: "100%",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  actionElement: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraSettings: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
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
    justifyContent: "space-evenly",
    paddingTop: 24,
    paddingBottom: 88,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
});
