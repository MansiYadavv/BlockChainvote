// import React from 'react';

// const Home = () => (
//   <div>
//     <h1>Welcome to the Blockchain Voting DApp</h1>
//     <p>This is a decentralized voting system built on Ethereum blockchain.</p>
//   </div>
// );
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../hooks/useWeb3';
import CandidateCard from '../components/CandidateCard';

const Home = () => {
  const { web3, account, contract, loading, error } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [electionInfo, setElectionInfo] = useState({
    name: '',
    description: '',
    isActive: false,
    hasStarted: false,
    hasEnded: false,
    timeRemaining: 0
  });

  useEffect(() => {
    if (contract) {
      loadElectionData();
      loadCandidates();
    }
  }, [contract]);

  const loadElectionData = async () => {
    try {
      const info = await contract.methods.electionInfo().call();
      const status = await contract.methods.getElectionStatus().call();
      
      setElectionInfo({
        name: info.name,
        description: info.description,
        isActive: status.isActive,
        hasStarted: status.hasStarted,
        hasEnded: status.hasEnded,
        timeRemaining: Number(status.timeRemaining)
      });
    } catch (error) {
      console.error("Error loading election info:", error);
    }
  };

  const loadCandidates = async () => {
    try {
      const candidatesCount = await contract.methods.candidatesCount().call();
      const candidatesArray = [];
      
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidatesArray.push({
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          manifesto: candidate.manifesto,
          voteCount: parseInt(candidate.voteCount)
        });
      }
      
      setCandidates(candidatesArray);
    } catch (error) {
      console.error("Error loading candidates:", error);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!web3) return (
    <div className="alert alert-warning">
      <h4>MetaMask Required</h4>
      <p>Please install MetaMask browser extension to use this decentralized application.</p>
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Get MetaMask
      </a>
    </div>
  );

  return (
    <div className="home-page">
      <div className="jumbotron p-4 bg-light rounded">
        <h1>{electionInfo.name || "Blockchain Voting"}</h1>
        <p className="lead">{electionInfo.description || "A decentralized voting application powered by Ethereum blockchain."}</p>
        
        <hr className="my-4" />
        
        {electionInfo.isActive ? (
          <div className="alert alert-success">
            <h4>Election is Live!</h4>
            <p>Time remaining: {formatTime(electionInfo.timeRemaining)}</p>
            <Link to="/vote" className="btn btn-primary">Cast Your Vote</Link>
          </div>
        ) : electionInfo.hasEnded ? (
          <div className="alert alert-warning">
            <h4>Election has ended</h4>
            <p>The voting period has concluded. Check out the results.</p>
            <Link to="/results" className="btn btn-info">View Results</Link>
          </div>
        ) : (
          <div className="alert alert-info">
            <h4>Election has not started yet</h4>
            <p>Please check back later when the election is active.</p>
          </div>
        )}
      </div>
      
      <h2 className="mt-4">Meet the Candidates</h2>
      {candidates.length === 0 ? (
        <p>No candidates have been registered yet.</p>
      ) : (
        <div className="row mt-3">
          {candidates.map(candidate => (
            <div className="col-md-6 col-lg-4 mb-3" key={candidate.id}>
              <CandidateCard 
                candidate={candidate} 
                selectable={false}
                showVotes={electionInfo.hasEnded}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-5">
        <h3>How It Works</h3>
        <div className="card">
          <div className="card-body">
            <ol>
              <li>Connect your Ethereum wallet via MetaMask</li>
              <li>View the list of candidates and their platforms</li>
              <li>Cast your vote securely on the blockchain</li>
              <li>Results are transparently recorded and available to all</li>
            </ol>
            
            <p>
              This application ensures that:
              <ul>
                <li>Each voter can vote only once</li>
                <li>Votes cannot be tampered with</li>
                <li>The entire process is transparent</li>
                <li>Results are immediately available and verifiable</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;