// Simple test component to verify the play functionality
import React, { useState, useEffect } from 'react';

const SimplePlayTest = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % 5);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h3>Play Test</h3>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <p>Current Index: {currentIndex}</p>
      <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  );
};

export default SimplePlayTest;
