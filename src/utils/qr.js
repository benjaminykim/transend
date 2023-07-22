export const qrParse = ({ type, data }) => {
  const dataString = data.toString();
  console.log("QR: ", dataString);
  let amount = 0;
  let address = "";
  if (dataString.startsWith("0x")) {
    address = dataString;
    console.log("rainbow wallet address: ", address);
  } else if (dataString.startsWith("ethereum:")) {
    address = dataString.split("ethereum:")[1];
    console.log("metamask:", address);
  } else {
    // const addressVerify = dataString.split(",")[0].split("=")[0];
    address = dataString.split(",")[0].split("=")[1];
    // const amountVerify = dataString.split(",")[1].split("=")[0];
    amount = dataString.split(",")[1].split("=")[1];

    // if (address && addressVerify === "address") {
    //   console.log("address: ", address);
    // }
    // if (amount && amountVerify === "amount") {
    //   console.log("send: ", amount);
    // }
  }
  return { address, amount };
};
