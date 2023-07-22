import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { getBalances } from "../utils/balanceOf";
import { useSelector } from "react-redux";
import { executeTransaction } from "../../src/utils/wallet";
import { Dropdown } from "react-native-element-dropdown";
import { currencyData } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setScannedWallet } from "../redux/store/users";

export default function HomeScreen() {
  const { walletData, scannedWallet, scannedAmount } = useSelector(
    (state) => state.users
  );
  const [balances, setBalances] = useState(null);
  // const [recipientENS, setRecipientENS]
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const fetchBalances = async () => {
    const fetchedBalances = await getBalances(walletData.address);
    setBalances(fetchedBalances);
  };

  console.log(scannedWallet);

  useEffect(() => {
    fetchBalances();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send</Text>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <Input
          placeholder={"0x address or ENS"}
          onChangeText={(event) => {
            dispatch(
              setScannedWallet({
                address: event,
                amount: scannedAmount,
              })
            );
          }}
          value={scannedWallet}
          autoCapitalize="none"
        />
        <Input
          // onChangeText={setAmount}
          onChangeText={(event) => {
            console.log(event);
            dispatch(
              setScannedWallet({
                address: scannedWallet,
                amount: event,
              })
            );
          }}
          value={amount || scannedAmount}
          keyboardType="numeric"
          placeholder="Amount"
          autoCapitalize="none"
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          data={currencyData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select token" : "..."}
          searchPlaceholder="Search..."
          value={currency}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCurrency(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <Button
          onPress={() =>
            executeTransaction(scannedWallet, scannedAmount, currency)
          }
          disabled={!currency || !scannedAmount || !scannedWallet}
          title="Send"
        />
        {/* <Button onPress={fetchBalances} title="Fetch Balances" /> */}
      </View>
      {balances && (
        <View style={styles.balances}>
          <Text style={styles.balanceText}>
            MATIC: {Math.round(balances.matic * 100) / 100}
          </Text>
          <Text style={styles.balanceText}>USDC: {balances.usdc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    flex: 1,
    alignSelf: "stretch",
    textAlign: "left",
  },
  balances: {
    marginTop: 20,
    gap: 20,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
});
