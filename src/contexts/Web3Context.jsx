// Improved Web3Context.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import ElectionContract from "../../artifacts/contracts/Election.sol/Election.json";


export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const connectingRef = useRef(false);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Prevent multiple simultaneous connection attempts
        if (connectingRef.current) return;
        connectingRef.current = true;

        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          
          try {
            // Check if already connected first
            const accounts = await web3Instance.eth.getAccounts();
            
            if (accounts.length === 0) {
              // Only request if not already connected
              await window.ethereum.request({ method: 'eth_requestAccounts' });
            }
            
            setWeb3(web3Instance);
            
            // Set up listeners
            window.ethereum.on('accountsChanged', (newAccounts) => {
              setAccount(newAccounts[0]);
            });
            
            window.ethereum.on('chainChanged', () => {
              window.location.reload();
            });
            
            // Get network ID
            const networkId = await web3Instance.eth.net.getId();
            setNetworkId(networkId);
            
            // Load contract
            const deployedNetwork = ElectionContract.networks[networkId];
            if (!deployedNetwork) {
              throw new Error("Contract not deployed on the current network");
            }
            
            const contractInstance = new web3Instance.eth.Contract(
              ElectionContract.abi,
              deployedNetwork.address
            );
            
            setContract(contractInstance);
            
            // Get account after possible connection
            const currentAccounts = await web3Instance.eth.getAccounts();
            setAccount(currentAccounts[0]);
            
          } catch (error) {
            console.error("Error in web3 initialization:", error);
            setError("Failed to connect to MetaMask: " + error.message);
          }
        } 
        else if (window.web3) {
          const web3Instance = new Web3(window.web3.currentProvider);
          setWeb3(web3Instance);
        } 
        else {
          setError("MetaMask not detected. Please install MetaMask to use this application.");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("Failed to connect to blockchain: " + error.message);
      } finally {
        setLoading(false);
        connectingRef.current = false;
      }
    };
    
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ 
      web3, 
      account, 
      networkId, 
      contract, 
      loading, 
      error 
    }}>
      {children}
    </Web3Context.Provider>
  );
};