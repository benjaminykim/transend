import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../redux/store/users";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { walletData } = useSelector((state) => state.users);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wallet</Text>
      <Text style={styles.body}>{walletData.address}</Text>
      <Button title="Delete Wallet" onPress={() => dispatch(deleteSession())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
  },
  body: {
    fontSize: 20,
    fontWeight: "400",
  },
});
