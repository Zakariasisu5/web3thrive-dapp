"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWeb3AuthUser, setIsWeb3AuthUser] = useState(false);
  const [walletType, setWalletType] = useState("");

  const clientId = "BDIff3ZkWHu6PSF_wY8tyZsoa1eGh-wzoEazC4y-Ey9KDO78FqpXVfSnzKsRxBlNkNhJmsId7wo8Cd6ONFheq4Y";

  // 👇 ApeChain Custom RPC Config (Testnet or Mainnet)
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x8157", // ApeChain testnet
    rpcTarget: "https://curtis.rpc.caldera.xyz/http", // Replace with correct ApeChain RPC
    displayName: "ApeChain Testnet",
    blockExplorer: "https://curtis.explorer.caldera.xyz/",
    ticker: "APE",
    tickerName: "ApeCoin",
  };

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

        const web3authInstance = new Web3Auth({
          clientId,
          chainConfig,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        if (web3authInstance.connected) {
          const provider = new ethers.BrowserProvider(web3authInstance.provider);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setWeb3Provider(provider);
          setWalletAddress(address);
          setIsAuthenticated(true);
          setIsWeb3AuthUser(true);
          
        }
      } catch (err) {
        console.error("Web3Auth Init Error:", err);
      }
    };

    initWeb3Auth();
  }, []);

  const connectWithWeb3Auth = async () => {
    if (!web3auth) return;

    try {
      const provider = await web3auth.connect();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();

      setWeb3Provider(ethersProvider);
      setWalletAddress(address);
      setIsAuthenticated(true);
      setIsWeb3AuthUser(true);
      setWalletType("Web3Auth");
    } catch (err) {
      console.error("Web3Auth Connection Error:", err);
    }
  };

  const connectWithMetaMask = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWeb3Provider(provider);
      setWalletAddress(address);
      setIsAuthenticated(true);
      setIsWeb3AuthUser(false);
      setWalletType("Metamask");
    } catch (err) {
      console.error("MetaMask Connection Error:", err);
    }
  };

  const disconnect = async () => {
    if (isWeb3AuthUser && web3auth) {
      await web3auth.logout();
    }

    setWeb3Provider(null);
    setWalletAddress(null);
    setIsAuthenticated(false);
    setIsWeb3AuthUser(false);
    setWalletType("");
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletType,
        isAuthenticated,
        web3Provider,
        connectWithWeb3Auth,
        connectWithMetaMask,
        disconnect,
        isWeb3AuthUser,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
