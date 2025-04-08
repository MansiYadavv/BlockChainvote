// // src/components/ConnectWallet.js
import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const ConnectWallet = () => {
  const { web3, account, loading, error } = useWeb3();

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.location.reload(); // Refresh to update state
      } else {
        alert('MetaMask is not installed. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask: ' + error.message);
    }
  };

  return (
    <div className="connect-wallet">
      {!web3 ? (
        <button className="btn btn-primary" onClick={connectToMetaMask}>Connect Wallet</button>
      ) : account ? (
        <div>
          <button className="btn btn-outline-success" disabled>
            Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </button>
        </div>
      ) : (
        <button className="btn btn-warning" onClick={connectToMetaMask}>
          Wallet Detected - Click to Connect
        </button>
      )}
      
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default ConnectWallet;