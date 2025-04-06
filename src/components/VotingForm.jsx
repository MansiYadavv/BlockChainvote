import React, { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Replace this with actual API call
    const mockCandidates = [
      {
        id: '1',
        name: 'Alice Johnson',
        party: 'Party A',
        manifesto: 'Transparency and growth.',
        voteCount: 120,
      },
      {
        id: '2',
        name: 'Bob Smith',
        party: 'Party B',
        manifesto: 'Better jobs and healthcare.',
        voteCount: 90,
      },
    ];
    setCandidates(mockCandidates);
  }, []);

  const handleSelect = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleVote = () => {
    if (selectedCandidateId) {
      // Here you’d send a POST request to your backend
      setHasVoted(true);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vote for a Candidate</h2>

      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          selectable={!hasVoted}
          selected={selectedCandidateId === candidate.id}
          onSelect={handleSelect}
          showVotes={hasVoted}
        />
      ))}

      {!hasVoted ? (
        <button
          className="btn btn-primary mt-3"
          onClick={handleVote}
          disabled={!selectedCandidateId}
        >
          Submit Vote
        </button>
      ) : (
        <div className="alert alert-success mt-3">
          Thank you! Your vote has been submitted.
        </div>
      )}
    </div>
  );
};

export default Vote;
