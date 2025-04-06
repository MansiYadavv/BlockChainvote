// import React, { useState, useEffect } from 'react';
// import { useWeb3 } from '../hooks/useWeb3';

// const Admin = () => {
//   const { web3, account, contract, loading, error } = useWeb3();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [message, setMessage] = useState({ type: '', content: '' });
//   const [electionStatus, setElectionStatus] = useState({
//     isActive: false,
//     hasStarted: false,
//     hasEnded: false,
//     timeRemaining: 0
//   });
  
//   // Form states
//   const [candidateName, setCandidateName] = useState('');
//   const [candidateParty, setCandidateParty] = useState('');
//   const [candidateManifesto, setCandidateManifesto] = useState('');
//   const [electionDuration, setElectionDuration] = useState(60); // Default 60 minutes
  
//   useEffect(() => {
//     if (contract && account) {
//       checkAdminStatus();
//       loadElectionStatus();
//       const interval = setInterval(loadElectionStatus, 10000); // Update every 10 seconds
//       return () => clearInterval(interval);
//     }
//   }, [contract, account]);

//   const checkAdminStatus = async () => {
//     try {
//       const adminAddress = await contract.methods.admin().call();
//       setIsAdmin(adminAddress.toLowerCase() === account.toLowerCase());
//     } catch (error) {
//       console.error("Error checking admin status:", error);
//     }
//   };

//   const loadElectionStatus = async () => {
//     try {
//       const status = await contract.methods.getElectionStatus().call();
//       setElectionStatus({
//         isActive: status.isActive,
//         hasStarted: status.hasStarted,
//         hasEnded: status.hasEnded,
//         timeRemaining: Number(status.timeRemaining)
//       });
//     } catch (error) {
//       console.error("Error loading election status:", error);
//     }
//   };

//   const handleAddCandidate = async (e) => {
//     e.preventDefault();
//     setMessage({ type: '', content: '' });
    
//     if (!candidateName || !candidateParty) {
//       setMessage({ type: 'warning', content: 'Please provide both name and party' });
//       return;
//     }
    
//     try {
//       await contract.methods
//         .addCandidate(candidateName, candidateParty, candidateManifesto)
//         .send({ from: account });
      
//       setMessage({ type: 'success', content: 'Candidate added successfully!' });
//       setCandidateName('');
//       setCandidateParty('');
//       setCandidateManifesto('');
//     } catch (error) {
//       console.error("Error adding candidate:", error);
//       setMessage({ 
//         type: 'danger', 
//         content: error.message.includes('revert') ? 
//           'Cannot add candidate during active election' : 
//           'Error adding candidate. Please try again.' 
//       });
//     }
//   };

//   const handleStartElection = async () => {
//     setMessage({ type: '', content: '' });
    
//     try {
//       await contract.methods
//         .startElection(electionDuration)
//         .send({ from: account });
      
//       setMessage({ type: 'success', content: 'Election started successfully!' });
//       loadElectionStatus();
//     } catch (error) {
//       console.error("Error starting election:", error);
//       setMessage({ 
//         type: 'danger', 
//         content: error.message.includes('revert') ? 
//           'Cannot start election. It may already be active.' : 
//           'Error starting election. Please try again.' 
//       });
//     }
//   };

//   const handleEndElection = async () => {
//     setMessage({ type: '', content: '' });
    
//     try {
//       await contract.methods
//         .endElection()
//         .send({ from: account });
      
//       setMessage({ type: 'success', content: 'Election ended successfully!' });
//       loadElectionStatus();
//     } catch (error) {
//       console.error("Error ending election:", error);
//       setMessage({ 
//         type: 'danger', 
//         content: 'Error ending election. Please try again.' 
//       });
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!web3) return <p>Please install MetaMask to use this application</p>;
//   if (!isAdmin) return (
//     <div className="alert alert-warning">
//       <h2>Access Denied</h2>
//       <p>You need administrator privileges to access this page.</p>
//       <p>Current account: {account}</p>
//     </div>
//   );

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     return `${hours}h ${minutes}m ${secs}s`;
//   };

//   return (
//     <div className="admin-page">
//       <h1>Election Administration</h1>
      
//       {message.content && (
//         <div className={`alert alert-${message.type}`}>{message.content}</div>
//       )}
      
//       <div className="card mb-4">
//         <div className="card-header">
//           <h3>Election Status</h3>
//         </div>
//         <div className="card-body">
//           <p>
//             <strong>Status:</strong> {' '}
//             {electionStatus.isActive ? 
//               <span className="badge bg-success">Active</span> : 
//               <span className="badge bg-secondary">Inactive</span>
//             }
//           </p>
          
//           {electionStatus.isActive && (
//             <p><strong>Time Remaining:</strong> {formatTime(electionStatus.timeRemaining)}</p>
//           )}
          
//           <div className="d-flex gap-2 mt-3">
//             <button 
//               className="btn btn-success" 
//               onClick={handleStartElection} 
//               disabled={electionStatus.isActive}
//             >
//               Start Election
//             </button>
            
//             <div className="input-group" style={{ maxWidth: '200px' }}>
//               <input 
//                 type="number" 
//                 className="form-control" 
//                 placeholder="Duration (min)" 
//                 value={electionDuration}
//                 onChange={(e) => setElectionDuration(e.target.value)}
//                 disabled={electionStatus.isActive}
//               />
//               <span className="input-group-text">min</span>
//             </div>
            
//             <button 
//               className="btn btn-danger" 
//               onClick={handleEndElection} 
//               disabled={!electionStatus.isActive}
//             >
//               End Election
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="card">
//         <div className="card-header">
//           <h3>Add Candidate</h3>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleAddCandidate}>
//             <div className="mb-3">
//               <label htmlFor="candidateName" className="form-label">Candidate Name</label>
//               <input 
//                 type="text" 
//                 className="form-control" 
//                 id="candidateName"
//                 value={candidateName}
//                 onChange={(e) => setCandidateName(e.target.value)}
//                 disabled={electionStatus.isActive}
//               />
//             </div>
            
//             <div className="mb-3">
//               <label htmlFor="candidateParty" className="form-label">Political Party</label>
//               <input 
//                 type="text" 
//                 className="form-control" 
//                 id="candidateParty"
//                 value={candidateParty}
//                 onChange={(e) => setCandidateParty(e.target.value)}
//                 disabled={electionStatus.isActive}
//               />
//             </div>
            
//             <div className="mb-3">
//               <label htmlFor="candidateManifesto" className="form-label">Manifesto/Platform (Optional)</label>
//               <textarea 
//                 className="form-control" 
//                 id="candidateManifesto"
//                 rows="3"
//                 value={candidateManifesto}
//                 onChange={(e) => setCandidateManifesto(e.target.value)}
//                 disabled={electionStatus.isActive}
//               ></textarea>
//             </div>
            
//             <button 
//               type="submit" 
//               className="btn btn-primary"
//               disabled={electionStatus.isActive}
//             >
//               Add Candidate
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingContract from "../../artifacts/contracts/Lock.sol/Voting.json";

const AdminPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [account, setAccount] = useState("");
  const contractAddress = "0x2a5c54730DcF2C396A1C7142a6053CafeF898a93";

  const getCandidates = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, VotingContract.abi, provider);
      const allCandidates = await contract.getAllCandidates();
      setCandidates(allCandidates);
    }
  };

  const handleAddCandidate = async () => {
    if (window.ethereum && name && party && manifesto) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VotingContract.abi, signer);

      try {
        const tx = await contract.addCandidate(name, party, manifesto);
        await tx.wait();
        getCandidates(); // refresh list
        setName("");
        setParty("");
        setManifesto("");
      } catch (err) {
        console.error("Error adding candidate:", err);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(([acc]) => setAccount(acc));
      getCandidates();
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Connected: {account}</h2>

      <h3 className="text-xl font-semibold">Add a New Candidate</h3>
      <input className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input className="border p-2 w-full" value={party} onChange={(e) => setParty(e.target.value)} placeholder="Party" />
      <textarea className="border p-2 w-full" value={manifesto} onChange={(e) => setManifesto(e.target.value)} placeholder="Manifesto" />
      <button onClick={handleAddCandidate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Candidate
      </button>

      <div>
        <h3 className="text-xl font-semibold mt-6">Candidate List ({candidates.length})</h3>
        {candidates.length === 0 ? (
          <p className="text-gray-500">No candidates added yet.</p>
        ) : (
          <ul className="list-disc pl-6">
            {candidates.map((cand, index) => (
              <li key={index}>
                <strong>{cand.name}</strong> — {cand.party}<br />
                <em>{cand.manifesto}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
