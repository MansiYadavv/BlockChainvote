// import React from 'react';

// const CandidateCard = ({ candidate, selectable, selected, onSelect, showVotes }) => {
//   return (
//     <div className={`card mb-3 ${selected ? 'border-primary' : ''}`}>
//       <div className="card-body">
//         <h5 className="card-title">{candidate.name}</h5>
//         <h6 className="card-subtitle mb-2 text-muted">{candidate.party}</h6>
        
//         {candidate.manifesto && (
//           <p className="card-text">{candidate.manifesto}</p>
//         )}
        
//         {showVotes && (
//           <div className="mt-2">
//             <strong>Votes: </strong> 
//             <span className="badge bg-info">{candidate.voteCount}</span>
//           </div>
//         )}
        
//         {selectable && (
//           <div className="form-check mt-2">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="candidateSelection"
//               id={`select-candidate-${candidate.id}`}
//               checked={selected}
//               onChange={() => onSelect(candidate.id)}
//             />
//             <label className="form-check-label" htmlFor={`select-candidate-${candidate.id}`}>
//               Select this candidate
//             </label>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateCard;
import React, { useState } from 'react';
import CandidateCard from '../components/CandidateCard';

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    manifesto: '',
  });
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleAddCandidate = (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    // Basic validation
    if (!formData.name.trim() || !formData.party.trim()) {
      alert("Please enter both name and party.");
      return;
    }

    // Create a new candidate
    const newCandidate = {
      id: Date.now(), // Unique ID
      name: formData.name,
      party: formData.party,
      manifesto: formData.manifesto,
      voteCount: 0
    };

    // ✅ Add to state
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);

    // ✅ Clear form
    setFormData({ name: '', party: '', manifesto: '' });
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Candidate</h2>
      <form onSubmit={handleAddCandidate}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="party"
            value={formData.party}
            placeholder="Party"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="manifesto"
            value={formData.manifesto}
            placeholder="Manifesto"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Candidate</button>
      </form>

      <hr />

      <h3>Candidate List</h3>
      {candidates.length === 0 ? (
        <p>No candidates added yet.</p>
      ) : (
        candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selectable={true}
            selected={candidate.id === selectedId}
            onSelect={handleSelect}
            showVotes={true}
          />
        ))
      )}
    </div>
  );
};

export default CandidateManager;

