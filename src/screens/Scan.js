import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { qrParse } from "../utils/qr";
import { useDispatch } from "react-redux";
import { setScannedWallet } from "../redux/store/users";

export default function ScanScreen({ navigation }) {
  const { walletData } = useSelector((state) => state.users);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedAddress, setScannedAddress] = useState();
  const [mode, setMode] = useState("SCAN");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const { address, amount } = qrParse({ type, data });
    setScannedAddress(address);
    dispatch(setScannedWallet({ address, amount }));
    navigation.navigate("Home");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (mode === "SCAN") {
    return (
      <View style={styles.container}>
        <Button title="My QR Code" onPress={() => setMode("QR")} />
        <View style={styles.scanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
        <Text style={styles.body}>Scanned Address: {scannedAddress}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Button title="Scan QR Code" onPress={() => setMode("SCAN")} />
        <QRCode
          size={300}
          value={`address=${walletData?.address},amount=${1}`}
        />
      </View>
    );
  }
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
