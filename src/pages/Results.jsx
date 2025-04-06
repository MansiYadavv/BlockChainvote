import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const Results = () => {
  const { contract } = useWeb3();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (contract) {
      fetchResults();
    }
  }, [contract]);

  const fetchResults = async () => {
    const count = await contract.methods.candidatesCount().call();
    const data = [];
    for (let i = 1; i <= count; i++) {
      const c = await contract.methods.candidates(i).call();
      data.push(c);
    }
    setCandidates(data);
  };

  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {candidates.map((c) => (
          <li key={c.id}>{c.name} - {c.party} | Votes: {c.voteCount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
