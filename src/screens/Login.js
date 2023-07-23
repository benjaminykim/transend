import "../../expo-crypto-shim.js";
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { createWallet, deleteSession, loadWallet } from "../redux/store/users";
import { getWalletData } from "../utils/local-storage";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import { executeTransactionWalletConnect } from "../utils/wallet.js";

const projectId = "9b25f028b1841ffbf891f84143f3d068";

const providerMetadata = {
  name: "Transend",
  description: "Transend",
  url: "https://github.com/benjaminykim",
  icons: ["https://github.com/benjaminykim"],
  redirect: {
    native: "exp://172.20.10.8:19000",
    universal: "https://github.com/benjaminykim",
  },
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { walletData } = useSelector((state) => state.users);
  const [seedPhrase, setSeedPhrase] = useState("");
  const { open, isConnected, address, provider, close } =
    useWalletConnectModal();

  useEffect(() => {
    const checkWallet = async () => {
      const payload = await getWalletData();
      if (payload.address !== "") {
        dispatch(loadWallet(payload));
      }
    };
    checkWallet();
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      console.log("wallet connect successfull", isConnected, address);
      // dispatch(loadConnectWallet(address, provider));
      executeTransactionWalletConnect("a", 1, provider);
      dispatch(
        createWallet(
          "twelve behave concert casual address favorite genuine legend citizen certain turtle thrive"
        )
      );
    }
  }, [isConnected, address]);

  if (walletData.address !== "") {
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
          style={{ color: "black" }}
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
      <Button
        onPress={open}
        title={isConnected ? "View Account" : "Wallet Connect"}
        style={{ marginBottom: 40 }}
      />
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
      <Text style={styles.body}>Input your seed phrase manually</Text>
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
