import React, { createContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          setWeb3(web3Instance);

          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0]);
          });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          const networkId = await web3Instance.eth.net.getId();
          setNetworkId(networkId);

          const deployedNetwork = ElectionContract.networks[networkId];
          if (!deployedNetwork) {
            throw new Error("Contract not deployed on the current network");
          }

          const contract = new web3Instance.eth.Contract(
            ElectionContract.abi,
            deployedNetwork.address
          );

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setContract(contract);
        } else {
          setError("Non-Ethereum browser detected. Try MetaMask!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, networkId, contract, loading, error }}>
      {children}
    </Web3Context.Provider>
  );
};
