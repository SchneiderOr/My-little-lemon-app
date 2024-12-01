import React from "react";
import { Image } from "react-native";
const Title = () => {
  return (
    <Image
      source={require("../assets/Logo.png")}
      accessible={true}
      accessibilityLabel="Little Lemon Logo"
    />
  );
};

export default Title;
