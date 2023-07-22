export const qrParse = ({ type, data }) => {
  const dataString = data.toString();
  console.log("QR: ", dataString);
  if (dataString.startsWith("0x")) {
    const address = dataString;
    console.log("rainbow wallet address: ", address);
  } else if (dataString.startsWith("ethereum:")) {
    const address = dataString;
    console.log("metamask wallet address: ", address);
  } else {
    const addressVerify = dataString.split(",")[0].split("=")[0];
    const address = dataString.split(",")[0].split("=")[1];
    const amountVerify = dataString.split(",")[1].split("=")[0];
    const amount = dataString.split(",")[1].split("=")[1];

    if (address && addressVerify === "address") {
      console.log("address: ", address);
    }
    if (amount && amountVerify === "amount") {
      console.log("send: ", amount);
    }
  }
  return { address, amount };
};
