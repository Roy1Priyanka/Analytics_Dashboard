import React, { useState } from 'react';
import { BarChart3, Calendar, Play, Pause, SkipBack, SkipForward, ChevronDown } from 'lucide-react';
import KPICards from './KPICards';
import Charts from './Charts';
import TimePeriodSelector from './TimePeriodSelector';
import './Dashboard.css';

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState({
    start: 'Jan 1',
    end: 'Jan 7',
    current: 'Jan 1 - Jan 7',
    weeks: 1
  });

  const handleTimeChange = (timeIndex) => {
    console.log('Dashboard received time change:', timeIndex);
    setCurrentTimeIndex(timeIndex);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <BarChart3 className="title-icon" />
          <h1>Analytics Dashboard</h1>
        </div>
      </header>

      <TimePeriodSelector 
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onTimeChange={handleTimeChange}
      />

      <KPICards currentTimeIndex={currentTimeIndex} />
      
      <Charts currentTimeIndex={currentTimeIndex} />
    </div>
  );
};

export default Dashboard;
