import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import DeleteProjectModal from "./DeleteProjectModal";
import { useState } from "react";
import { delete_project } from "@/hooks/db";
import { useSQLiteContext } from "expo-sqlite";

const ProjectActionMenu: React.FC<{ project_name: string }> = ({
  project_name,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const db = useSQLiteContext();
  return (
    <View>
      <DeleteProjectModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        project_name={project_name}
        onDelete={() => {
          delete_project(db, project_name).then(() => {
            router.dismissAll();
            router.replace("/");
          });
        }}
      />
      <Menu>
        <MenuTrigger>
          <Ionicons name="ellipsis-horizontal" color="white" size={24} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menu}>
          <MenuOption
            onSelect={() => alert(`Save`)}
            customStyles={{ optionWrapper: styles.menuItem }}>
            <Ionicons name="share-outline" color="white" size={20} />
            <Text style={styles.menuText}>Export</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => router.push(`/camera?project=${project_name}`)}
            customStyles={{ optionWrapper: styles.menuItem }}>
            <Ionicons name="camera-outline" color="white" size={20} />
            <Text style={styles.menuText}>Take picture</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => setModalVisible(true)}
            customStyles={{
              optionWrapper: styles.menuItem,
            }}>
            <Ionicons name="trash" color="red" size={20} />
            <Text
              style={[styles.menuText, { color: "red", fontWeight: "bold" }]}>
              Delete Project
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#0f0f0f",
    padding: 12,
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    margin: 8,
  },
  menuText: {
    fontSize: 16,
    color: "white",
    fontWeight: "medium",
  },
});

export default ProjectActionMenu;
