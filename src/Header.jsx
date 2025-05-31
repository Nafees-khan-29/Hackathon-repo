import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import useSound from 'use-sound';
import hoverSound from './assets/sounds/hover.mp3';
import clickSound from './assets/sounds/click.mp3';
import './styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(() => {
    const saved = localStorage.getItem('soundPreference');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [playHover] = useSound(hoverSound, { 
    volume: 0.5,
    soundEnabled: isSoundOn 
  });

  const [playClick] = useSound(clickSound, { 
    volume: 0.5,
    soundEnabled: isSoundOn 
  });

  useEffect(() => {
    localStorage.setItem('soundPreference', JSON.stringify(isSoundOn));
  }, [isSoundOn]);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    playClick();
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <button 
            className="sound-toggle-btn"
            onClick={toggleSound}
            onMouseEnter={() => isSoundOn && playHover()}
            aria-label={isSoundOn ? 'Mute sound' : 'Unmute sound'}
          >
            {isSoundOn ? 
              <FaVolumeUp className="sound-icon" /> : 
              <FaVolumeMute className="sound-icon" />
            }
          </button>
          <Link 
            to="/" 
            className="nav-logo"
            onMouseEnter={() => isSoundOn && playHover()}
            onClick={() => isSoundOn && playClick()}
          >
            CyberSpy
          </Link>
        </div>

        <div className="nav-links-desktop">
          {['Home', 'Features', 'Dashboard', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="nav-link"
              onMouseEnter={() => isSoundOn && playHover()}
              onClick={() => isSoundOn && playClick()}
            >
              {item}
            </Link>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            isSoundOn && playClick();
          }}
          onMouseEnter={() => isSoundOn && playHover()}
        >
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="nav-links-mobile">
          {['Home', 'Features', 'Dashboard', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="nav-link-mobile"
              onClick={() => {
                setIsOpen(false);
                isSoundOn && playClick();
              }}
              onMouseEnter={() => isSoundOn && playHover()}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
