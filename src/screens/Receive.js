import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { Button, Input } from "react-native-elements";

export default function ReceiveScreen({ navigation }) {
  const { walletData } = useSelector((state) => state.users);
  const [receive, setReceive] = useState(0);

  return (
    <View style={styles.container}>
      <QRCode size={300} value={`address=${walletData?.address},amount=${1}`} />
      <Input
        onChangeText={setReceive}
        value={receive}
        keyboardType="numeric"
        placeholder="Amount"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 100,
    gap: 30,
  },
  scanner: {
    height: 400,
    width: 300,
    radius: 15,
    overflow: "hidden",
  },
  body: {
    fontSize: 10,
  },
});
