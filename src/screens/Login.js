import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { createWallet, deleteSession, loadWallet } from "../redux/store/users";
import { getWalletData } from "../utils/local-storage";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { walletData } = useSelector((state) => state.users);
  const [seedPhrase, setSeedPhrase] = useState("");

  useEffect(() => {
    const checkWallet = async () => {
      const payload = await getWalletData();
      if (payload.address !== "") {
        dispatch(loadWallet(payload));
      }
    };
    checkWallet();
  }, []);

  if (walletData.address !== "") {
    console.log(walletData);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Wallet</Text>
        <Text style={styles.body}>{walletData.address}</Text>
        <Button
          title="Delete Wallet"
          onPress={() => dispatch(deleteSession())}
        />
      </View>
    );
  }

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
  body: {
    fontSize: 20,
    fontWeight: "400",
  },
});
