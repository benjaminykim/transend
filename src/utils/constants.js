export const POLYGON_RPC_URL =
  "https://polygon-mainnet.g.alchemy.com/v2/A0e9HJB-A_asv3HVauKvAqpIVHRgkaD-";

export const USDC_CONTRACT_ADDRESS =
  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

export const USDC_ABI = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const currencyData = [
  { label: "USDC", value: "1" },
  { label: "MATIC", value: "2" },
];
