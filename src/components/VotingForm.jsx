
import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock candidates data - 4 entries as requested
    const mockCandidates = [
      {
        id: '1',
        name: 'Alice Johnson',
        party: 'Party A',
        manifesto: 'Transparency and growth for all citizens. Focus on economic development and social justice.',
        voteCount: 120,
      },
      {
        id: '2',
        name: 'Bob Smith',
        party: 'Party B',
        manifesto: 'Better jobs and healthcare for everyone. Promising reform in education and healthcare systems.',
        voteCount: 90,
      },
      {
        id: '3',
        name: 'Carol Martinez',
        party: 'Party C',
        manifesto: 'Environmental protection and sustainable development. Pushing for renewable energy initiatives.',
        voteCount: 105,
      },
      {
        id: '4',
        name: 'David Wilson',
        party: 'Party D',
        manifesto: 'Education reform and technological innovation. Supporting small businesses and entrepreneurs.',
        voteCount: 78,
      },
    ];
    setCandidates(mockCandidates);
  }, []);

  const handleSelect = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleVote = async () => {
    if (selectedCandidateId && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update local state to show success
        setCandidates(prevCandidates => 
          prevCandidates.map(candidate => 
            candidate.id === selectedCandidateId 
              ? {...candidate, voteCount: candidate.voteCount + 1} 
              : candidate
          )
        );
        
        setHasVoted(true);
      } catch (error) {
        console.error("Failed to submit vote:", error);
        alert("Failed to submit your vote. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    submitButton: {
      backgroundColor: selectedCandidateId ? '#4361ee' : '#e9ecef',
      color: selectedCandidateId ? 'white' : '#6c757d',
      padding: '14px 28px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: selectedCandidateId ? 'pointer' : 'not-allowed',
      maxWidth: '300px',
      width: '100%',
      margin: '0 auto',
      display: 'block',
      transition: 'all 0.2s',
      boxShadow: selectedCandidateId ? '0 4px 8px rgba(67, 97, 238, 0.25)' : 'none',
    },
    submittingButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      cursor: 'wait',
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '16px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '18px',
      maxWidth: '500px',
      margin: '0 auto 24px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    resultsHeader: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
      marginTop: '24px',
      marginBottom: '16px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Vote for a Candidate</h1>
      
      {hasVoted && (
        <div style={styles.successMessage}>
          Thank you! Your vote has been submitted.
        </div>
      )}
      
      <div style={styles.cardGrid}>
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selectable={!hasVoted}
            selected={selectedCandidateId === candidate.id}
            onSelect={handleSelect}
            showVotes={true}
          />
        ))}
      </div>

      {!hasVoted ? (
        <button 
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submittingButton : {})
          }}
          onClick={handleVote}
          disabled={!selectedCandidateId || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Vote'}
        </button>
      ) : (
        <div style={styles.resultsHeader}>
          Final Results
        </div>
      )}
    </div>
  );
};

export default Vote;






























// // import React, { useEffect, useState } from 'react';
// import CandidateCard from './CandidateCard';
// import React, { useState, useEffect } from 'react'; // Add useState here

// const Vote = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     // Replace this with actual API call
//     const mockCandidates = [
//       {
//         id: '1',
//         name: 'Alice Johnson',
//         party: 'Party A',
//         manifesto: 'Transparency and growth.',
//         voteCount: 120,
//       },
//       {
//         id: '2',
//         name: 'Bob Smith',
//         party: 'Party B',
//         manifesto: 'Better jobs and healthcare.',
//         voteCount: 90,
//       },
//     ];
//     setCandidates(mockCandidates);
//   }, []);

//   const handleSelect = (candidateId) => {
//     setSelectedCandidateId(candidateId);
//   };

//   const handleVote = () => {
//     if (selectedCandidateId) {
//       // Here you’d send a POST request to your backend
//       setHasVoted(true);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Vote for a Candidate</h2>

//       <div style={styles.cardDeck}>
//         {candidates.map((candidate) => (
//           <CandidateCard
//             key={candidate.id}
//             candidate={candidate}
//             selectable={!hasVoted}
//             selected={selectedCandidateId === candidate.id}
//             onSelect={handleSelect}
//             showVotes={hasVoted}
//           />
//         ))}
//       </div>

//       {!hasVoted ? (
//         <button
//           style={styles.submitButton}
//           onClick={handleVote}
//           disabled={!selectedCandidateId}
//         >
//           Submit Vote
//         </button>
//       ) : (
//         <div style={styles.successMessage}>
//           Thank you! Your vote has been submitted.
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '960px',
//     margin: '0 auto',
//     padding: '2rem',
//     textAlign: 'center',
//   },
//   header: {
//     fontSize: '2rem',
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: '1rem',
//   },
//   cardDeck: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '1rem',
//     marginBottom: '2rem',
//   },
//   submitButton: {
//     backgroundColor: '#0d6efd',
//     color: 'white',
//     padding: '0.75rem 1.5rem',
//     fontSize: '1.2rem',
//     fontWeight: '600',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     width: '100%',
//     transition: 'all 0.3s',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#d6d6d6',
//     cursor: 'not-allowed',
//   },
//   successMessage: {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '1rem',
//     borderRadius: '8px',
//     fontWeight: '600',
//     fontSize: '1.2rem',
//     marginTop: '1rem',
//   },
// };

// export default Vote;
// import React, { useState, useEffect } from 'react';
// import CandidateCard from './CandidateCard';
// import ConnectWallet from '../utils/connectWallet';

// const Vote = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Mock candidates data - 4 entries as requested
//     const mockCandidates = [
//       {
//         id: '1',
//         name: 'Alice Johnson',
//         party: 'Party A',
//         manifesto: 'Transparency and growth for all citizens. Focus on economic development and social justice.',
//         voteCount: 120,
//       },
//       {
//         id: '2',
//         name: 'Bob Smith',
//         party: 'Party B',
//         manifesto: 'Better jobs and healthcare for everyone. Promising reform in education and healthcare systems.',
//         voteCount: 90,
//       },
//       {
//         id: '3',
//         name: 'Carol Martinez',
//         party: 'Party C',
//         manifesto: 'Environmental protection and sustainable development. Pushing for renewable energy initiatives.',
//         voteCount: 105,
//       },
//       {
//         id: '4',
//         name: 'David Wilson',
//         party: 'Party D',
//         manifesto: 'Education reform and technological innovation. Supporting small businesses and entrepreneurs.',
//         voteCount: 78,
//       },
//     ];
//     setCandidates(mockCandidates);
//   }, []);

//   const handleSelect = (candidateId) => {
//     setSelectedCandidateId(candidateId);
//   };

//   const handleVote = async () => {
//     if (selectedCandidateId && !isSubmitting) {
//       setIsSubmitting(true);
      
//       try {
//         // Simulate API call with a delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Update local state to show success
//         setCandidates(prevCandidates => 
//           prevCandidates.map(candidate => 
//             candidate.id === selectedCandidateId 
//               ? {...candidate, voteCount: candidate.voteCount + 1} 
//               : candidate
//           )
//         );
        
//         setHasVoted(true);
//       } catch (error) {
//         console.error("Failed to submit vote:", error);
//         alert("Failed to submit your vote. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: '1000px',
//       margin: '0 auto',
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif',
//     },
//     header: {
//       fontSize: '2rem',
//       fontWeight: '700',
//       color: '#333',
//       marginBottom: '20px',
//       textAlign: 'center',
//     },
//     cardGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//       gap: '16px',
//       marginBottom: '24px',
//     },
//     submitButton: {
//       backgroundColor: selectedCandidateId ? '#4361ee' : '#e9ecef',
//       color: selectedCandidateId ? 'white' : '#6c757d',
//       padding: '14px 28px',
//       fontSize: '18px',
//       fontWeight: '600',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: selectedCandidateId ? 'pointer' : 'not-allowed',
//       maxWidth: '300px',
//       width: '100%',
//       margin: '0 auto',
//       display: 'block',
//       transition: 'all 0.2s',
//       boxShadow: selectedCandidateId ? '0 4px 8px rgba(67, 97, 238, 0.25)' : 'none',
//     },
//     submittingButton: {
//       backgroundColor: '#6c757d',
//       color: 'white',
//       cursor: 'wait',
//     },
//     successMessage: {
//       backgroundColor: '#d4edda',
//       color: '#155724',
//       padding: '16px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       fontSize: '18px',
//       maxWidth: '500px',
//       margin: '0 auto 24px',
//       textAlign: 'center',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
//     },
//     resultsHeader: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#333',
//       marginTop: '24px',
//       marginBottom: '16px',
//       textAlign: 'center',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {/* Wallet Connection */}
//       <ConnectWallet />
      
//       <h1 style={styles.header}>Vote for a Candidate</h1>
      
//       {hasVoted && (
//         <div style={styles.successMessage}>
//           Thank you! Your vote has been submitted.
//         </div>
//       )}
      
//       <div style={styles.cardGrid}>
//         {candidates.map((candidate) => (
//           <CandidateCard
//             key={candidate.id}
//             candidate={candidate}
//             selectable={!hasVoted}
//             selected={selectedCandidateId === candidate.id}
//             onSelect={handleSelect}
//             showVotes={true}
//           />
//         ))}
//       </div>

//       {!hasVoted ? (
//         <button 
//           style={{
//             ...styles.submitButton,
//             ...(isSubmitting ? styles.submittingButton : {})
//           }}
//           onClick={handleVote}
//           disabled={!selectedCandidateId || isSubmitting}
//         >
//           {isSubmitting ? 'Submitting...' : 'Submit Vote'}
//         </button>
//       ) : (
//         <div style={styles.resultsHeader}>
//           Final Results
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vote;