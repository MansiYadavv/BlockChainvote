import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Results from './pages/Results';
import Admin from './pages/Admin';
import CandidateCard from '../src/components/CandidateCard';
import VotingForm from '../src/components/VotingForm';

import ConnectWallet from './utils/connectWallet';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Navbar />
        <ConnectWallet />
        <CandidateCard  />
        <VotingForm/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
}

export default App;
