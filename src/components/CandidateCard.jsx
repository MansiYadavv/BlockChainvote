// // src/components/CandidateCard.js
import React from 'react';

const CandidateCard = ({ candidate, selectable, selected, onSelect, showVotes }) => {
  if (!candidate) {
    return <div className="alert alert-danger">Candidate data is missing.</div>;
  }

  return (
    <div className={`card mb-3 ${selected ? 'border-primary' : ''}`} style={selected ? { boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.25)' } : {}}>
      <div className="card-body">
        <h5 className="card-title">{candidate.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{candidate.party}</h6>
        
        {candidate.manifesto && (
          <p className="card-text">{candidate.manifesto}</p>
        )}
        
        {showVotes && (
          <div className="mt-2">
            <strong>Votes: </strong> 
            <span className="badge bg-info">{candidate.voteCount}</span>
          </div>
        )}
        
        {selectable && (
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="candidateSelection"
              id={`select-candidate-${candidate.id}`}
              checked={selected}
              onChange={() => onSelect(candidate.id)}
            />
            <label className="form-check-label" htmlFor={`select-candidate-${candidate.id}`}>
              Select this candidate
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
export default CandidateCard;