import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import TransactionArtifact from "../contracts/Transaction.json";

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // Replace with your deployed contract address

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const init = async () => {
      await checkNetwork();
      await checkIfWalletIsConnected();
    };
    init();
  }, []);

  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0xaa36a7") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
        } catch {
          toast.error("Please switch to the Sepolia testnet in your wallet");
        }
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setAccount(accounts[0]);
      await getBalance(accounts[0]);
      await getTransactionHistory();
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await getBalance(accounts[0]);
      await getTransactionHistory();
      toast.success("Wallet connected successfully");
    } catch {
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setBalance("");
    setTransactions([]);
    toast.info("Wallet disconnected");
  };

  const getBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch {
      console.error("Error getting balance");
    }
  };

  const sendTransaction = async (to, amount, keyword, message) => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        TransactionArtifact.abi,
        signer
      );

      if (!ethers.utils.isAddress(to) || isNaN(amount) || amount <= 0) {
        throw new Error("Invalid input");
      }

      const parsedAmount = ethers.utils.parseEther(amount.toString());
      const transaction = await contract.addToBlockchain(
        to,
        parsedAmount,
        message,
        keyword,
        { value: parsedAmount }
      );

      toast.info("Transaction is being processed...");
      await transaction.wait();
      toast.success("Transaction successful!");

      await getTransactionHistory();
      await getBalance(account);
    } catch {
      toast.error("Transaction failed. Please try again.");
    }
  };

  const getTransactionHistory = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        TransactionArtifact.abi,
        provider
      );
      const transactions = await contract.getAllTransactions();

      const structuredTransactions = transactions.map((transaction) => ({
        addressFrom: transaction.sender,
        addressTo: transaction.receiver,
        amount: ethers.utils.formatEther(transaction.amount),
        message: transaction.message,
        timestamp: new Date(
          transaction.timestamp.toNumber() * 1000
        ).toLocaleString(),
        keyword: transaction.keyword,
      }));

      setTransactions(structuredTransactions);
    } catch {
      console.error("Error getting transaction history");
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        transactions,
        connectWallet,
        disconnectWallet,
        sendTransaction,
        getTransactionHistory,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
