import { Pressable, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ children, style, onPress }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cbd2d9",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "#324652",
    fontSize: 22,
  },
});
