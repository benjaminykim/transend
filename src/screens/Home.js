import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "start",
    width: "100%",
    flexGrow: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    flexGrow: 0,
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
    flexGrow: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    flexGrow: 0,
    maxWidth: 200,
    alignSelf: "stretch",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 30,
    rowGap: 15,
    paddingVertical: 10,
    alignSelf: "stretch",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
  },
  balances: {
    marginTop: 20,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
