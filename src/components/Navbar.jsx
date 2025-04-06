import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#eee', marginBottom: '2rem' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
    <Link to="/vote" style={{ marginRight: '1rem' }}>Vote</Link>
    <Link to="/results" style={{ marginRight: '1rem' }}>Results</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

export default Navbar;