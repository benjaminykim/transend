import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { USDC_CONTRACT_ADDRESS, USDC_ABI } from "./constants";

export const executeTransaction = async (
  recipientAddress,
  amount,
  currency
) => {
  const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
  const wallet = new ethers.Wallet(walletData.privateKey, provider);

  const usdcContract = new ethers.Contract(
    USDC_CONTRACT_ADDRESS,
    USDC_ABI,
    wallet
  );
  const amountInWei = ethers.utils.parseUnits(amount.toString(), 6);

  const nonce = await wallet.getTransactionCount();
  const gasPrice = await provider.getGasPrice();
  const gasLimit = await usdcContract.estimateGas.transfer(
    recipientAddress,
    amountInWei
  );

  const transaction = {
    to: USDC_CONTRACT_ADDRESS,
    nonce,
    gasPrice,
    gasLimit,
    data: usdcContract.interface.encodeFunctionData("transfer", [
      recipientAddress,
      amountInWei,
    ]),
  };

  const transactionResponse = await wallet.sendTransaction(transaction);
  const transactionReceipt = await transactionResponse.wait();

  return transactionReceipt;
};

export const generateWallet = async (seedPhrase) => {
  const useSeed = seedPhrase !== "";
  var walletData = {
    address: "",
    privateKey: "",
    mnemonic: "",
  };
  try {
    var wallet;
    if (useSeed) {
      wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    } else {
      wallet = ethers.Wallet.createRandom();
    }
    const generatedAddress = await wallet.getAddress();
    walletData = {
      address: generatedAddress,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
    return walletData;
  } catch (error) {
    console.error(error);
  }
  return walletData;
};

export function isValidSession(walletData) {
  if (
    !walletData ||
    walletData.address === "" ||
    walletData.privateKey === "" ||
    walletData.mnemonic === ""
  ) {
    return false;
  }
  return true;
}
