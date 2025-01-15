import { get_project_names } from "@/hooks/db";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const ProjectPicker: React.FC = () => {
  const [data, setData] = useState<{ project: string }[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    get_project_names(db).then((r) => setData(r));
  }, []);
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text
              style={styles.dropdownButtonTxtStyle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {(selectedItem && selectedItem.project) || "Select your project"}
            </Text>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.project}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    paddingBottom: 4,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    maxWidth: 200,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: "white",
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default ProjectPicker;
