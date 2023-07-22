import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { createWallet } from "../redux/store/users";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [seedPhrase, setSeedPhrase] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Get Started</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button
          title="Create New Wallet"
          onPress={() => {
            dispatch(createWallet(""));
            navigation.navigation("Home");
          }}
        />
        <Button
          title="Create Dev Wallet"
          onPress={() => {
            dispatch(
              createWallet(
                "twelve behave concert casual address favorite genuine legend citizen certain turtle thrive"
              )
            );
            navigation.navigation("Home");
          }}
        />
      </View>
      <View style={{ height: 20 }} />
      <Text style={styles.header}>Already have a wallet?</Text>
      <Input
        placeholder="Enter seed phrase"
        value={seedPhrase}
        onChangeText={setSeedPhrase}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        title="Import Wallet"
        onPress={() => {
          dispatch(createWallet(seedPhrase));
          navigation.navigate("Home");
        }}
      />
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
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 20,
  },
});
