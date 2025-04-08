// // Updated Results.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const Results = () => {
  const { contract, loading, error } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionInfo, setElectionInfo] = useState({
    name: '',
    description: '',
    isActive: false,
    hasEnded: false
  });
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    if (contract) {
      console.log("Loading election results data...");
      loadElectionData();
      loadResults();
    }
  }, [contract]);

  const loadElectionData = async () => {
    try {
      console.log("Loading election info...");
      const info = await contract.methods.electionInfo().call();
      console.log("Election info:", info);
      
      const status = await contract.methods.getElectionStatus().call();
      
      setElectionInfo({
        name: info.name,
        description: info.description,
        isActive: status.isActive,
        hasEnded: status.hasEnded
      });
    } catch (error) {
      console.error("Error loading election info:", error);
    }
  };

  const loadResults = async () => {
    setLoadingResults(true);
    try {
      // Load candidates
      console.log("Loading candidates for results...");
      const candidatesCount = await contract.methods.candidatesCount().call();
      console.log("Candidates count:", candidatesCount);
      
      const candidatesArray = [];
      
      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        console.log("Candidate data:", candidate);
        
        candidatesArray.push({
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          voteCount: parseInt(candidate.voteCount)
        });
      }
      
      // Sort by vote count (descending)
      candidatesArray.sort((a, b) => b.voteCount - a.voteCount);
      console.log("Sorted candidates:", candidatesArray);
      setCandidates(candidatesArray);
      
      // Get total votes
      console.log("Getting total votes...");
      const total = await contract.methods.getTotalVotes().call();
      console.log("Total votes:", total);
      setTotalVotes(parseInt(total));
      
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  if (loading || loadingResults) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!contract) return <p>Contract not loaded. Please make sure you're connected to the correct network.</p>;

  // Calculate percentages and find winner
  const calculatePercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  };
  
  const winner = candidates.length > 0 && totalVotes > 0 ? candidates[0] : null;

  return (
    <div className="results-page">
      <h1>Election Results</h1>
      <h2>{electionInfo.name}</h2>
      <p>{electionInfo.description}</p>
      
      {!electionInfo.hasEnded && !electionInfo.isActive && (
        <div className="alert alert-info">
          The election has not started yet. Results will be available once voting begins.
        </div>
      )}
      
      {electionInfo.isActive && (
        <div className="alert alert-warning">
          The election is currently in progress. These are live results and may change.
        </div>
      )}
      
      {electionInfo.hasEnded && (
        <div className="alert alert-success">
          The election has ended. These are the final results.
        </div>
      )}
      
      {candidates.length === 0 ? (
        <div className="alert alert-info">
          No candidates have been added yet.
        </div>
      ) : (
        <div className="card mt-4">
          <div className="card-header">
            <h3>Results Summary</h3>
          </div>
          <div className="card-body">
            <p><strong>Total Votes Cast:</strong> {totalVotes}</p>
            
            {winner && electionInfo.hasEnded && (
              <div className="alert alert-info">
                <h4>Winner: {winner.name} ({winner.party})</h4>
                <p>With {winner.voteCount} votes ({calculatePercentage(winner.voteCount)}%)</p>
              </div>
            )}
            
            <h4 className="mt-4">Candidate Results</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Candidate</th>
                    <th>Party</th>
                    <th>Votes</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, index) => (
                    <tr key={candidate.id}>
                      <td>{index + 1}</td>
                      <td>{candidate.name}</td>
                      <td>{candidate.party}</td>
                      <td>{candidate.voteCount}</td>
                      <td>{calculatePercentage(candidate.voteCount)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {candidates.length > 0 && (
              <div className="mt-4">
                <h4>Results Visualization</h4>
                <div className="results-bars">
                  {candidates.map(candidate => (
                    <div key={candidate.id} className="result-bar-container mb-3">
                      <div className="d-flex justify-content-between">
                        <strong>{candidate.name}</strong>
                        <span>{calculatePercentage(candidate.voteCount)}%</span>
                      </div>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${calculatePercentage(candidate.voteCount)}%` }}
                          aria-valuenow={calculatePercentage(candidate.voteCount)} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          {candidate.voteCount} votes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;