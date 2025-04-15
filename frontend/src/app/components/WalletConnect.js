'use client'
import { useState, useEffect } from "react";
import {ethers} from "ethers";


const WalletConnect = () => {
    const { walletAddress, connectWithMetaMask, connectWithWeb3Auth, walletType } = useWallet();

    return (
      <div className="p-4">
        <h1 className="text-xl mb-4">Connect Wallet</h1>
  
        {!walletAddress ? (
          <>
            <button onClick={connectWithMetaMask} className="btn">Connect with MetaMask</button>
            <button onClick={connectWithWeb3Auth} className="btn ml-2">Sign in with Email</button>
          </>
        ) : (
          <div>
            Connected with {walletType}: <br />
            <span className="text-green-500">{walletAddress}</span>
          </div>
        )}
      </div>
    );
}

export default WalletConnect