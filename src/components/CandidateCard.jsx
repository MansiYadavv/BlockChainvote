// // import React from 'react';

// const CandidateCard = ({ candidate, selectable, selected, onSelect, showVotes }) => {
//   if (!candidate) {
//     return (
//       <div style={styles.loader}>
//         <p>Loading candidate data...</p>
//       </div>
//     );
//   }

//   const cardStyle = {
//     ...styles.card,
//     ...(selected ? styles.cardSelected : {}),
//   };

//   return (
//     <div style={cardStyle}>
//       <div style={styles.cardBody}>
//         <div style={styles.cardTitleWrapper}>
//           <h5 style={styles.cardTitle}>{candidate.name || 'Unnamed Candidate'}</h5>
//         </div>
//         <h6 style={styles.cardSubtitle}>{candidate.party || 'No Party'}</h6>

//         {candidate.manifesto && (
//           <p style={styles.cardText}>{candidate.manifesto}</p>
//         )}

//         {showVotes && (
//           <div style={styles.voteCount}>
//             <span><strong>Votes:</strong></span>
//             <span style={styles.voteBadge}>{candidate.voteCount || 0}</span>
//           </div>
//         )}

//         {selectable && (
//           <div style={styles.selectionControl}>
//             <input
//               style={selected ? styles.formCheckInputChecked : styles.formCheckInput}
//               type="radio"
//               name="candidateSelection"
//               id={`select-candidate-${candidate.id}`}
//               checked={selected}
//               onChange={() => onSelect && onSelect(candidate.id)}
//             />
//             <label style={styles.formCheckLabel} htmlFor={`select-candidate-${candidate.id}`}>
//               Select this candidate
//             </label>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     transition: 'all 0.3s ease',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
//     backgroundColor: '#ffffff',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '1rem',
//     cursor: 'pointer',
//   },
//   cardSelected: {
//     border: '2px solid #0d6efd',
//     boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.25)',
//   },
//   cardBody: {
//     padding: '1.5rem',
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   cardTitleWrapper: {
//     backgroundColor: 'orange',
//     borderRadius: '6px',
//     padding: '0.5rem',
//     marginBottom: '0.5rem',
//     textAlign: 'center',
//   },
//   cardTitle: {
//     color: 'white',
//     fontSize: '1.4rem',
//     fontWeight: '600',
//     margin: 0,
//   },
//   cardSubtitle: {
//     color: '#6c757d',
//     fontSize: '1rem',
//     fontWeight: '500',
//     marginBottom: '1rem',
//     textAlign: 'center',
//   },
//   cardText: {
//     color: '#6c757d',
//     lineHeight: 1.6,
//     marginBottom: '1.5rem',
//     flexGrow: 1,
//   },
//   voteCount: {
//     backgroundColor: '#f8f9fa',
//     borderRadius: '6px',
//     padding: '0.5rem 1rem',
//     marginBottom: '1rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   voteBadge: {
//     backgroundColor: '#0dcaf0',
//     color: 'white',
//     fontWeight: '600',
//     padding: '0.35em 0.65em',
//     borderRadius: '6px',
//   },
//   selectionControl: {
//     marginTop: 'auto',
//     paddingTop: '1rem',
//     borderTop: '1px solid #f0f0f0',
//   },
//   formCheckInput: {
//     marginRight: '0.5rem',
//   },
//   formCheckInputChecked: {
//     marginRight: '0.5rem',
//     backgroundColor: '#0d6efd',
//     borderColor: '#0d6efd',
//   },
//   formCheckLabel: {
//     fontWeight: 500,
//     color: '#495057',
//   },
//   loader: {
//     textAlign: 'center',
//     padding: '2rem',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '8px',
//     color: '#6c757d',
//   },
// };

// export default CandidateCard;
import React from 'react';

const CandidateCard = ({ candidate, selectable, selected, onSelect, showVotes }) => {
  if (!candidate) {
    return (
      <div style={styles.loader}>
        <p>Loading candidate data...</p>
      </div>
    );
  }

  const cardStyle = {
    ...styles.card,
    ...(selected ? styles.cardSelected : {}),
  };

  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(candidate.id);
    }
  };

  return (
    <div style={cardStyle} onClick={handleCardClick}>
      <div style={styles.cardBody}>
        <div style={styles.cardTitleWrapper}>
          <h5 style={styles.cardTitle}>{candidate.name || 'Unnamed Candidate'}</h5>
        </div>
        <h6 style={styles.cardSubtitle}>{candidate.party || 'No Party'}</h6>

        {candidate.manifesto && (
          <p style={styles.cardText}>{candidate.manifesto}</p>
        )}

        {showVotes && (
          <div style={styles.voteCount}>
            <span><strong>Votes:</strong></span>
            <span style={styles.voteBadge}>{candidate.voteCount || 0}</span>
          </div>
        )}

        {selectable && (
          <div style={styles.selectionControl}>
            <input
              style={selected ? styles.formCheckInputChecked : styles.formCheckInput}
              type="radio"
              name="candidateSelection"
              id={`select-candidate-${candidate.id}`}
              checked={selected}
              onChange={() => onSelect && onSelect(candidate.id)}
              onClick={(e) => e.stopPropagation()} // Prevent double-firing of event
            />
            <label style={styles.formCheckLabel} htmlFor={`select-candidate-${candidate.id}`}>
              Select this candidate
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    cursor: 'pointer',
    border: '2px solid transparent',
  },
  cardSelected: {
    border: '2px solid #0d6efd',
    boxShadow: '0 0 0 3px rgba(13, 110, 253, 0.25)',
    transform: 'translateY(-2px)',
  },
  cardBody: {
    padding: '1.25rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitleWrapper: {
    backgroundColor: '#ff9800', // Slightly adjusted orange
    borderRadius: '6px',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  cardTitle: {
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: '600',
    margin: 0,
  },
  cardSubtitle: {
    color: '#6c757d',
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
    textAlign: 'center',
  },
  cardText: {
    color: '#6c757d',
    lineHeight: 1.5,
    marginBottom: '1rem',
    flexGrow: 1,
    fontSize: '0.9rem',
  },
  voteCount: {
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteBadge: {
    backgroundColor: '#0dcaf0',
    color: 'white',
    fontWeight: '600',
    padding: '0.25em 0.6em',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  selectionControl: {
    marginTop: 'auto',
    paddingTop: '0.75rem',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
  },
  formCheckInput: {
    marginRight: '0.5rem',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  formCheckInputChecked: {
    marginRight: '0.5rem',
    width: '16px',
    height: '16px',
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
    cursor: 'pointer',
  },
  formCheckLabel: {
    fontWeight: 500,
    color: '#495057',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  loader: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#6c757d',
  },
};

export default CandidateCard;