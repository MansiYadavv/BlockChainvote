// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => (
//   <nav style={{ padding: '1rem', background: '#eee', marginBottom: '2rem' }}>
//     <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
//     <Link to="/vote" style={{ marginRight: '1rem' }}>Vote</Link>
//     <Link to="/results" style={{ marginRight: '1rem' }}>Results</Link>
//     <Link to="/admin">Admin</Link>
//   </nav>
// );

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={styles.navbar}>
    <div style={styles.navLinks}>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/vote" style={styles.navLink}>Vote</Link>
      <Link to="/results" style={styles.navLink}>Results</Link>
      <Link to="/admin" style={styles.navLink}>Admin</Link>
    </div>
  </nav>
);

const styles = {
  navbar: {
    backgroundColor: '#0d6efd',
    padding: '1rem 2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '500',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#0056b3',
  },
};

export default Navbar;
