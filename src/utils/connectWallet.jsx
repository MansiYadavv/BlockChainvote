// // // src/components/ConnectWallet.js
// // import React from 'react';
// // import { useWeb3 } from '../hooks/useWeb3';

// // const ConnectWallet = () => {
// //   const { web3, account, loading, error } = useWeb3();

// //   const connectToMetaMask = async () => {
// //     try {
// //       if (window.ethereum) {
// //         await window.ethereum.request({ method: 'eth_requestAccounts' });
// //         window.location.reload(); // Refresh to update state
// //       } else {
// //         alert('MetaMask is not installed. Please install MetaMask to use this application.');
// //       }
// //     } catch (error) {
// //       console.error('Error connecting to MetaMask:', error);
// //       alert('Failed to connect to MetaMask: ' + error.message);
// //     }
// //   };

// //   return (
// //     <div className="connect-wallet">
// //       {!web3 ? (
// //         <button className="btn btn-primary" onClick={connectToMetaMask}>Connect Wallet</button>
// //       ) : account ? (
// //         <div>
// //           <button className="btn btn-outline-success" disabled>
// //             Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
// //           </button>
// //         </div>
// //       ) : (
// //         <button className="btn btn-warning" onClick={connectToMetaMask}>
// //           Wallet Detected - Click to Connect
// //         </button>
// //       )}
      
// //       {error && <div className="alert alert-danger mt-2">{error}</div>}
// //     </div>
// //   );
// // };

// // export default ConnectWallet;
// import React from 'react';
// import { useWeb3 } from '../hooks/useWeb3';

// const ConnectWallet = () => {
//   const { web3, account, loading, error } = useWeb3();

//   const connectToMetaMask = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         window.location.reload(); // Refresh to update state
//       } else {
//         alert('MetaMask is not installed. Please install MetaMask to use this application.');
//       }
//     } catch (error) {
//       console.error('Error connecting to MetaMask:', error);
//       alert('Failed to connect to MetaMask: ' + error.message);
//     }
//   };

//   return (
//     <div className="connect-wallet" style={styles.container}>
//       <div className="connect-card" style={styles.card}>
//         {!web3 ? (
//           <button className="btn btn-primary" onClick={connectToMetaMask} style={styles.button}>
//             Connect Wallet
//           </button>
//         ) : account ? (
//           <div>
//             <button className="btn btn-outline-success" disabled style={styles.connectedButton}>
//               Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
//             </button>
//           </div>
//         ) : (
//           <button className="btn btn-warning" onClick={connectToMetaMask} style={styles.warningButton}>
//             Wallet Detected - Click to Connect
//           </button>
//         )}

//         {error && <div className="alert alert-danger mt-2" style={styles.error}>{error}</div>}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     height: '100vh',
//     padding: '10px', // Add padding to avoid content sticking to edges
//     boxSizing: 'border-box',
//     overflowY: 'auto',
//   },
//   card: {
//     width: '100%',
//     maxWidth: '400px', // Prevents it from growing too large
//     margin: '10px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     boxSizing: 'border-box',
//   },
//   button: {
//     padding: '0.75rem 2rem',
//     fontSize: '1.2rem',
//     borderRadius: '8px',
//     border: 'none',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     backgroundColor: '#0d6efd',
//     color: 'white',
//     fontWeight: '600',
//     marginTop: '1rem',
//   },
//   connectedButton: {
//     padding: '0.75rem 2rem',
//     fontSize: '1.2rem',
//     borderRadius: '8px',
//     border: '1px solid #28a745',
//     backgroundColor: 'transparent',
//     color: '#28a745',
//     fontWeight: '600',
//     marginTop: '1rem',
//     cursor: 'not-allowed',
//   },
//   warningButton: {
//     padding: '0.75rem 2rem',
//     fontSize: '1.2rem',
//     borderRadius: '8px',
//     border: '1px solid #ffc107',
//     backgroundColor: '#ffc107',
//     color: 'black',
//     fontWeight: '600',
//     marginTop: '1rem',
//     cursor: 'pointer',
//   },
//   error: {
//     backgroundColor: '#f8d7da',
//     color: '#721c24',
//     padding: '0.75rem',
//     borderRadius: '8px',
//     marginTop: '1rem',
//     fontSize: '1rem',
//     fontWeight: '600',
//   },
// };

// export default ConnectWallet;

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

  const styles = {
    walletContainer: {
      width: '100%',
      maxWidth: '360px',
      margin: '0 auto 8px', // Reduced margin to minimize gap
      padding: '16px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#4361ee',
      color: 'white',
      fontWeight: '600',
      width: '100%',
    },
    connectedButton: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #28a745',
      backgroundColor: 'transparent',
      color: '#28a745',
      fontWeight: '600',
      width: '100%',
      cursor: 'default',
    },
    warningButton: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#ffc107',
      color: '#212529',
      fontWeight: '600',
      width: '100%',
      cursor: 'pointer',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '12px',
      borderRadius: '6px',
      marginTop: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.walletContainer}>
      {!web3 ? (
        <button style={styles.button} onClick={connectToMetaMask}>
          Connect Wallet
        </button>
      ) : account ? (
        <div>
          <button style={styles.connectedButton}>
            Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </button>
        </div>
      ) : (
        <button style={styles.warningButton} onClick={connectToMetaMask}>
          Wallet Detected - Click to Connect
        </button>
      )}

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default ConnectWallet;
