import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Alert, Pressable } from "react-native";
import { createTable, getMenuItems, saveMenuItems } from "../database";
import { getSectionListData } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export default ({ navigation, setData }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      return menu;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        if (setData) {
          const sectionListData = getSectionListData(menuItems);
          setData(sectionListData);
        }
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile));
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< "}Back</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Home")} hitSlop={20}>
        <Image
          style={styles.logo}
          source={require("../assets/Logo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </Pressable>
      <Pressable
        style={styles.avatar}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.avatarEmpty}>
          <Text style={styles.avatarEmptyText}>
            {profile.firstName && Array.from(profile.firstName)[0]}
            {profile.lastName && Array.from(profile.lastName)[0]}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
  },
  avatar: {},
  backButtonText: {
    fontSize: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarEmpty: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
});
