'use client'
import { useState, useEffect, useContext, createContext } from "react";
import { contractAddress, contractABI } from "./constants";
import { ethers } from "ethers";
import { useWallet } from "./WalletContext";

export const ContractContext = createContext();

export const ContractProvider = ({children}) => {
    const { walletAddress } = useWallet();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const loadContract = async () => {
            try {
                if (window.ethereum && walletAddress) {
                    const provider = new ethers.BrowserProvider(window.ethereum); // ✅ FIXED HERE
                    const signer = await provider.getSigner();
                    const instance = new ethers.Contract(contractAddress, contractABI, signer);
                    setContract(instance);
                } else {
                    console.log("Please connect your wallet!");
                }
            } catch (error) {
                console.log("An error occurred while creating contract:", error);
            }
        };

        loadContract(); // ✅ Don't forget to call it
    }, [walletAddress]);

    return (
        <ContractContext.Provider value={{ contract }}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContract = () => useContext(ContractContext);
