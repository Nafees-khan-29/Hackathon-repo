import React from 'react';
import { FaDesktop, FaMobileAlt } from 'react-icons/fa';

const MobileRestriction = () => {
  return (
    <div className="mobile-restriction-overlay">
      <div className="restriction-content">
        <FaMobileAlt className="mobile-icon" />
        <FaDesktop className="desktop-icon" />
        <h2>Desktop Only Access</h2>
        <p>This application requires a desktop or laptop computer to access. Please switch to a larger device.</p>
      </div>
    </div>
  );
};

export default MobileRestriction;