import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
const ProjectActionMenu: React.FC<{ project_name: string }> = ({
  project_name,
}) => {
  return (
    <View>
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
            onSelect={() => alert(`Delete`)}
            customStyles={{
              optionWrapper: [styles.menuItem, { marginTop: 12 }],
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
  },
  menuText: {
    fontSize: 16,
    color: "white",
    fontWeight: "medium",
  },
});

export default ProjectActionMenu;
