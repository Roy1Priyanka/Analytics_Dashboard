import React, { useEffect, useRef } from 'react';
import { Calendar, Play, Pause, SkipBack, SkipForward, ChevronDown, ToggleLeft, ToggleRight } from 'lucide-react';
import './TimePeriodSelector.css';

// Custom Check icon for range mode
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
  </svg>
);

const TimePeriodSelector = ({ timePeriod, setTimePeriod, isPlaying, setIsPlaying, onTimeChange }) => {
  const [showSinglePoint, setShowSinglePoint] = React.useState(true); // Start with Single Point mode
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0); // 0 to 1 for smooth animation
  const [rangeStart, setRangeStart] = React.useState(0); // For range mode
  const [rangeEnd, setRangeEnd] = React.useState(2); // For range mode
  const [isDragging, setIsDragging] = React.useState(null); // Track which handle is being dragged
  
  // Use refs to avoid dependency issues
  const setTimePeriodRef = useRef(setTimePeriod);
  const onTimeChangeRef = useRef(onTimeChange);
  
  // Update refs when props change
  setTimePeriodRef.current = setTimePeriod;
  onTimeChangeRef.current = onTimeChange;

  const timePoints = [
    { start: 'Jan 1', end: 'Jan 7', current: 'Jan 1 - Jan 7', weeks: 1 },
    { start: 'Jan 1', end: 'Jan 14', current: 'Jan 8 - Jan 14', weeks: 2 },
    { start: 'Jan 1', end: 'Jan 21', current: 'Jan 15 - Jan 21', weeks: 3 },
    { start: 'Jan 1', end: 'Jan 28', current: 'Jan 22 - Jan 28', weeks: 4 },
    { start: 'Jan 1', end: 'Feb 4', current: 'Jan 29 - Feb 4', weeks: 5 }
  ];

  useEffect(() => {
    console.log('Animation effect triggered, isPlaying:', isPlaying, 'isDragging:', isDragging);
    let animationId;
    let startTime = null;
    
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const cycleDuration = 5000; // 5 seconds for full cycle
      const normalizedTime = (elapsed / cycleDuration) % 1; // 0 to 1
      
      if (showSinglePoint) {
        // Single point mode - animate the single point
        setProgress(normalizedTime);
        
        // Calculate which time period we should be in
        const totalSteps = timePoints.length;
        const currentStep = Math.floor(normalizedTime * totalSteps);
        const newIndex = currentStep % totalSteps;
        
        setCurrentIndex(prevIndex => {
          if (newIndex !== prevIndex) {
            console.log('Updating to time period:', newIndex);
            const newTimePeriod = timePoints[newIndex];
            setTimePeriodRef.current(newTimePeriod);
            if (onTimeChangeRef.current) {
              onTimeChangeRef.current(newIndex);
            }
          }
          return newIndex;
        });
      } else {
        // Range mode - animate the range (only if not dragging)
        if (!isDragging) {
          const maxRange = timePoints.length - 1;
          const rangeSize = rangeEnd - rangeStart;
          const maxStartPosition = maxRange - rangeSize;
          const newStartPosition = Math.floor(normalizedTime * (maxStartPosition + 1));
          
          setRangeStart(newStartPosition);
          setRangeEnd(newStartPosition + rangeSize);
        }
      }

      // Continue animation
      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying && !isDragging) {
      console.log('Starting animation...');
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      console.log('Cleaning up animation');
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, showSinglePoint, isDragging]); // Added isDragging to dependencies

  // Initialize with first time period on mount
  useEffect(() => {
    if (timePoints.length > 0) {
      setTimePeriodRef.current(timePoints[0]);
      setCurrentIndex(0);
      setProgress(0);
      if (onTimeChangeRef.current) {
        onTimeChangeRef.current(0);
      }
    }
  }, []); // Empty dependency array

  const handleSliderChange = (e) => {
    if (isDragging) return; // Don't handle clicks while dragging
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    if (showSinglePoint) {
      // Single point mode
      const newIndex = Math.round(percentage * (timePoints.length - 1));
      setCurrentIndex(newIndex);
      setProgress(newIndex / (timePoints.length - 1));
      const newTimePeriod = timePoints[newIndex];
      setTimePeriodRef.current(newTimePeriod);
      if (onTimeChangeRef.current) {
        onTimeChangeRef.current(newIndex);
      }
    } else {
      // Range mode - clicking sets the closest handle
      const newIndex = Math.round(percentage * (timePoints.length - 1));
      const distanceToStart = Math.abs(newIndex - rangeStart);
      const distanceToEnd = Math.abs(newIndex - rangeEnd);
      
      if (distanceToStart <= distanceToEnd) {
        // Move start handle
        if (newIndex < rangeEnd) {
          setRangeStart(newIndex);
        }
      } else {
        // Move end handle
        if (newIndex > rangeStart) {
          setRangeEnd(newIndex);
        }
      }
    }
  };

  const handleMouseDown = (e, handleType) => {
    if (!showSinglePoint) {
      e.stopPropagation();
      setIsDragging(handleType);
      setIsPlaying(false); // Stop animation while dragging
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !showSinglePoint) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newIndex = Math.round(percentage * (timePoints.length - 1));
      
      if (isDragging === 'start' && newIndex < rangeEnd) {
        setRangeStart(newIndex);
      } else if (isDragging === 'end' && newIndex > rangeStart) {
        setRangeEnd(newIndex);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Add global mouse event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, rangeStart, rangeEnd]);

  const handlePrevious = () => {
    setIsPlaying(false);
    if (showSinglePoint) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : timePoints.length - 1;
      setCurrentIndex(newIndex);
      setProgress(newIndex / (timePoints.length - 1));
      const newTimePeriod = timePoints[newIndex];
      setTimePeriodRef.current(newTimePeriod);
      if (onTimeChangeRef.current) {
        onTimeChangeRef.current(newIndex);
      }
    } else {
      // Range mode - move range backwards
      if (rangeStart > 0) {
        setRangeStart(rangeStart - 1);
        setRangeEnd(Math.max(rangeEnd - 1, rangeStart));
      }
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (showSinglePoint) {
      const newIndex = currentIndex < timePoints.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      setProgress(newIndex / (timePoints.length - 1));
      const newTimePeriod = timePoints[newIndex];
      setTimePeriodRef.current(newTimePeriod);
      if (onTimeChangeRef.current) {
        onTimeChangeRef.current(newIndex);
      }
    } else {
      // Range mode - move range forwards
      if (rangeEnd < timePoints.length - 1) {
        setRangeStart(Math.min(rangeStart + 1, timePoints.length - 2));
        setRangeEnd(rangeEnd + 1);
      }
    }
  };

  return (
    <div className="time-period-selector">
      <div className="time-period-header">
        <div className="time-period-info">
          <Calendar className="calendar-icon" />
          <span className="label">Time Period</span>
          <span className="period-range">{timePeriod.start} - {timePeriod.end}</span>
          <span className="arrow">→</span>
          <span className="current-period">{timePeriod.current}</span>
          <span className="weeks-count">{timePeriod.weeks} weeks</span>
        </div>
        
        <div className="playback-controls">
          <button className="control-btn" onClick={handlePrevious}>
            <SkipBack size={16} />
          </button>
          <button 
            className="play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="control-btn" onClick={handleNext}>
            <SkipForward size={16} />
          </button>
          <span className="status">{isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
      </div>

      <div className="time-period-controls">
        <div className="time-unit-selector">
          <span>Time Unit: Week</span>
          <ChevronDown size={16} />
        </div>

        <div className="view-toggle">
          <span>Single Point</span>
          <button 
            className="toggle-btn"
            onClick={() => setShowSinglePoint(!showSinglePoint)}
          >
            {showSinglePoint ? <ToggleLeft /> : <ToggleRight className="toggle-active" />}
          </button>
          <span>Range</span>
        </div>
      </div>

      <div className="time-slider">
        <div 
          className="slider-track" 
          onClick={handleSliderChange}
          onMouseMove={handleMouseMove}
        >
          {showSinglePoint ? (
            // Single Point Mode - just a simple dot without background line
            <div 
              className="slider-handle single-point" 
              style={{ left: `${progress * 100}%` }}
            ></div>
          ) : (
            // Range Mode
            <>
              <div 
                className="slider-range" 
                style={{ 
                  left: `${(rangeStart / (timePoints.length - 1)) * 100}%`,
                  width: `${((rangeEnd - rangeStart) / (timePoints.length - 1)) * 100}%` 
                }}
              ></div>
              <div 
                className="slider-handle start" 
                style={{ left: `${(rangeStart / (timePoints.length - 1)) * 100}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'start')}
              >
                <CheckIcon />
              </div>
              <div 
                className="slider-handle end" 
                style={{ left: `${(rangeEnd / (timePoints.length - 1)) * 100}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'end')}
              >
                <CheckIcon />
              </div>
            </>
          )}
        </div>
        <div className="time-labels">
          <span>Jan 1 - Jan 7</span>
          <span>{showSinglePoint ? timePoints[currentIndex]?.current : `${timePoints[rangeStart]?.start} - ${timePoints[rangeEnd]?.end}`}</span>
          <span>Dec 30 - Jan 5</span>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodSelector;
