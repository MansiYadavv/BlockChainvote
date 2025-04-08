// // import React, { useState, useEffect } from 'react';
// // import { useWeb3 } from '../hooks/useWeb3';

// // const Vote = () => {
// //   const { web3, account, contract, loading, error } = useWeb3();
// //   const [candidates, setCandidates] = useState([]);
// //   const [selectedCandidate, setSelectedCandidate] = useState('');
// //   const [hasVoted, setHasVoted] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [message, setMessage] = useState({ type: '', content: '' });
// //   const [electionStatus, setElectionStatus] = useState({
// //     isActive: false,
// //     hasStarted: false,
// //     hasEnded: false,
// //     timeRemaining: 0
// //   });

// //   useEffect(() => {
// //     if (contract && account) {
// //       loadCandidatesAndVoteStatus();
// //       loadElectionStatus();
// //       const interval = setInterval(loadElectionStatus, 10000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [contract, account]);

// //   const loadCandidatesAndVoteStatus = async () => {
// //     try {
// //       const voted = await contract.methods.hasVoted(account).call();
// //       setHasVoted(voted);

// //       const candidatesCount = await contract.methods.candidatesCount().call();
// //       const candidatesArray = [];

// //       for (let i = 1; i <= candidatesCount; i++) {
// //         const candidate = await contract.methods.candidates(i).call();
// //         candidatesArray.push(candidate);
// //       }

// //       setCandidates(candidatesArray);
// //     } catch (err) {
// //       console.error("Error loading candidates:", err);
// //     }
// //   };

// //   const loadElectionStatus = async () => {
// //     try {
// //       const status = await contract.methods.getElectionStatus().call();
// //       setElectionStatus({
// //         isActive: status[0],
// //         hasStarted: status[1],
// //         hasEnded: status[2],
// //         timeRemaining: status[3]
// //       });
// //     } catch (err) {
// //       console.error("Error getting election status:", err);
// //     }
// //   };

// //   const castVote = async () => {
// //     if (!selectedCandidate) return;

// //     try {
// //       setIsSubmitting(true);
// //       await contract.methods.vote(selectedCandidate).send({ from: account });
// //       setMessage({ type: 'success', content: 'Vote cast successfully!' });
// //       setHasVoted(true);
// //     } catch (err) {
// //       setMessage({ type: 'danger', content: 'Vote failed!' });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (loading) return <div>Loading Web3...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div>
// //       <h1>Vote for your candidate</h1>

// //       {hasVoted ? (
// //         <p>You have already voted.</p>
// //       ) : (
// //         <>
// //           <ul>
// //             {candidates.map((c) => (
// //               <li key={c.id}>
// //                 <label>
// //                   <input
// //                     type="radio"
// //                     value={c.id}
// //                     checked={selectedCandidate === c.id}
// //                     onChange={(e) => setSelectedCandidate(e.target.value)}
// //                   />
// //                   {c.name} - {c.party}
// //                 </label>
// //               </li>
// //             ))}
// //           </ul>
// //           <button disabled={isSubmitting} onClick={castVote}>
// //             {isSubmitting ? 'Voting...' : 'Submit Vote'}
// //           </button>
// //         </>
// //       )}

// //       {message.content && (
// //         <p className={message.type === 'success' ? 'text-success' : 'text-danger'}>
// //           {message.content}
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Vote;
// // src/pages/Vote.js
// import React, { useState, useEffect } from 'react';
// import { useWeb3 } from '../hooks/useWeb3';
// import CandidateCard from '../components/CandidateCard';

// const Vote = () => {
//   const { web3, account, contract, loading, error } = useWeb3();
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState('');
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: '', content: '' });
//   const [electionStatus, setElectionStatus] = useState({
//     isActive: false,
//     hasStarted: false,
//     hasEnded: false,
//     timeRemaining: 0
//   });

//   useEffect(() => {
//     if (contract && account) {
//       loadCandidatesAndVoteStatus();
//       loadElectionStatus();
//       const interval = setInterval(loadElectionStatus, 10000); // Update every 10 seconds
//       return () => clearInterval(interval);
//     }
//   }, [contract, account]);

//   const loadCandidatesAndVoteStatus = async () => {
//     try {
//       // Check if user has already voted
//       const voted = await contract.methods.hasVoted(account).call();
//       setHasVoted(voted);

//       // Load candidates
//       const candidatesCount = await contract.methods.candidatesCount().call();
//       const candidatesArray = [];
      
//       for (let i = 1; i <= candidatesCount; i++) {
//         const candidate = await contract.methods.candidates(i).call();
//         candidatesArray.push({
//           id: candidate.id,
//           name: candidate.name,
//           party: candidate.party,
//           manifesto: candidate.manifesto,
//           voteCount: candidate.voteCount
//         });
//       }
      
//       setCandidates(candidatesArray);
//     } catch (error) {
//       console.error("Error loading candidates:", error);
//       setMessage({ type: 'danger', content: 'Error loading candidates' });
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

//   const castVote = async () => {
//     if (!selectedCandidate) {
//       setMessage({ type: 'warning', content: 'Please select a candidate' });
//       return;
//     }

//     setIsSubmitting(true);
//     setMessage({ type: '', content: '' });

//     try {
//       await contract.methods.vote(selectedCandidate).send({ from: account });
//       setHasVoted(true);
//       setMessage({ type: 'success', content: 'Your vote has been cast successfully!' });
//       loadCandidatesAndVoteStatus();
//     } catch (error) {
//       console.error("Error casting vote:", error);
//       setMessage({ type: 'danger', content: error.message.includes('revert') ? 
//         'Transaction failed. You may have already voted or the election is not active.' : 
//         'Error casting vote. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!web3) return <p>Please install MetaMask to use this application</p>;

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     return `${hours}h ${minutes}m ${secs}s`;
//   };

//   return (
//     <div className="vote-page">
//       <h1>Cast Your Vote</h1>
      
//       {!electionStatus.isActive && !electionStatus.hasStarted && (
//         <div className="alert alert-info">The election has not started yet.</div>
//       )}
      
//       {!electionStatus.isActive && electionStatus.hasEnded && (
//         <div className="alert alert-warning">The election has ended.</div>
//       )}
      
//       {electionStatus.isActive && electionStatus.hasStarted && !electionStatus.hasEnded && (
//         <div className="alert alert-success">
//           Election is active! Time remaining: {formatTime(electionStatus.timeRemaining)}
//         </div>
//       )}
      
//       {message.content && (
//         <div className={`alert alert-${message.type}`}>{message.content}</div>
//       )}
      
//       {hasVoted ? (
//         <div className="alert alert-info mt-3">
//           <h4>Thank you for voting!</h4>
//           <p>You have already cast your vote in this election.</p>
//         </div>
//       ) : (
//         <div className="mt-3">
//           <h3>Select a Candidate</h3>
          
//           <div className="row">
//             {candidates.map(candidate => (
//               <div className="col-md-6 col-lg-4 mb-3" key={candidate.id}>
//                 <CandidateCard 
//                   candidate={candidate}
//                   selectable={true}
//                   selected={selectedCandidate === candidate.id}
//                   onSelect={() => setSelectedCandidate(candidate.id)}
//                   showVotes={false}
//                 />
//               </div>
//             ))}
//           </div>
          
//           <button 
//             className="btn btn-primary mt-3" 
//             onClick={castVote} 
//             disabled={
//               !electionStatus.isActive || 
//               !selectedCandidate || 
//               isSubmitting
//             }
//           >
//             {isSubmitting ? 'Submitting...' : 'Cast Vote'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vote;
// Updated Vote.js
// Updated Vote.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import CandidateCard from '../components/CandidateCard';

const Vote = () => {
  const { web3, account, contract, loading, error } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [electionStatus, setElectionStatus] = useState({
    isActive: false,
    hasStarted: false,
    hasEnded: false,
    timeRemaining: 0
  });

  useEffect(() => {
    if (contract && account) {
      console.log("Loading vote data...");
      loadCandidatesAndVoteStatus();
      loadElectionStatus();
      const interval = setInterval(loadElectionStatus, 10000);
      return () => clearInterval(interval);
    }
  }, [contract, account]);

  const loadCandidatesAndVoteStatus = async () => {
    try {
      console.log("Checking vote status for account:", account);
      
      // Check if user has already voted
      const voted = await contract.methods.hasVoted(account).call();
      console.log("Has voted:", voted);
      setHasVoted(voted);

      // Load candidates
      console.log("Loading candidates...");
      const candidatesCount = await contract.methods.candidatesCount().call();
      console.log("Candidates count:", candidatesCount);
      
      const candidatesArray = [];
      
      for (let i = 1; i <= candidatesCount; i++) {
        console.log("Loading candidate", i);
        const candidate = await contract.methods.candidates(i).call();
        console.log("Candidate data:", candidate);
        
        candidatesArray.push({
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          manifesto: candidate.manifesto,
          voteCount: parseInt(candidate.voteCount)
        });
      }
      
      console.log("Candidates loaded:", candidatesArray);
      setCandidates(candidatesArray);
    } catch (error) {
      console.error("Error loading candidates:", error);
      setMessage({ type: 'danger', content: 'Error loading candidates: ' + error.message });
    }
  };

  const loadElectionStatus = async () => {
    try {
      const status = await contract.methods.getElectionStatus().call();
      setElectionStatus({
        isActive: status.isActive,
        hasStarted: status.hasStarted,
        hasEnded: status.hasEnded,
        timeRemaining: Number(status.timeRemaining)
      });
    } catch (error) {
      console.error("Error loading election status:", error);
    }
  };

  const castVote = async () => {
    if (!selectedCandidate) {
      setMessage({ type: 'warning', content: 'Please select a candidate' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: 'info', content: 'Transaction pending. Please confirm in MetaMask...' });

    try {
      console.log("Casting vote for candidate ID:", selectedCandidate);
      const tx = await contract.methods.vote(selectedCandidate).send({ from: account });
      console.log("Vote transaction:", tx);
      
      setHasVoted(true);
      setMessage({ type: 'success', content: 'Your vote has been cast successfully!' });
      loadCandidatesAndVoteStatus();
    } catch (error) {
      console.error("Error casting vote:", error);
      setMessage({ type: 'danger', content: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!web3) return <p>Please install MetaMask to use this application</p>;
  if (!contract) return <p>Contract not loaded. Please make sure you're connected to the correct network.</p>;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="vote-page">
      <h1>Cast Your Vote</h1>
      
      {!electionStatus.isActive && !electionStatus.hasStarted && (
        <div className="alert alert-info">The election has not started yet.</div>
      )}
      
      {!electionStatus.isActive && electionStatus.hasEnded && (
        <div className="alert alert-warning">The election has ended.</div>
      )}
      
      {electionStatus.isActive && electionStatus.hasStarted && !electionStatus.hasEnded && (
        <div className="alert alert-success">
          Election is active! Time remaining: {formatTime(electionStatus.timeRemaining)}
        </div>
      )}
      
      {message.content && (
        <div className={`alert alert-${message.type}`}>
          {message.content}
        </div>
      )}
      
      {candidates.length === 0 && (
        <div className="alert alert-info mt-3">
          No candidates are available. {isAdmin ? 'Please add candidates in the Admin page.' : 'Please wait for the admin to add candidates.'}
        </div>
      )}
      
      {hasVoted ? (
        <div className="alert alert-info mt-3">
          <h4>Thank you for voting!</h4>
          <p>You have already cast your vote in this election.</p>
        </div>
      ) : (
        <div className="mt-3">
          <h3>Select a Candidate</h3>
          
          {candidates.length > 0 ? (
            <div className="row">
              {candidates.map(candidate => (
                <div className="col-md-6 col-lg-4 mb-3" key={candidate.id}>
                  <CandidateCard 
                    candidate={candidate}
                    selectable={electionStatus.isActive && !hasVoted}
                    selected={selectedCandidate === candidate.id}
                    onSelect={() => setSelectedCandidate(candidate.id)}
                    showVotes={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No candidates available to vote for.</p>
          )}
          
          <button 
            className="btn btn-primary mt-3" 
            onClick={castVote} 
            disabled={
              !electionStatus.isActive || 
              !selectedCandidate || 
              isSubmitting || 
              candidates.length === 0
            }
          >
            {isSubmitting ? 'Submitting...' : 'Cast Vote'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Vote;