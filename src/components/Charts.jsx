import React from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Charts.css';

const Charts = ({ currentTimeIndex }) => {
  // Data for different time periods
  const chartDataByTime = [
    // Week 1
    {
      revenue: [
        { name: 'Jan 1', value: 250000 },
        { name: 'Jan 2', value: 280000 },
        { name: 'Jan 3', value: 290000 },
        { name: 'Jan 4', value: 275000 },
        { name: 'Jan 5', value: 320000 },
        { name: 'Jan 6', value: 310000 },
        { name: 'Jan 7', value: 340000 },
      ],
      userActivity: [
        { name: 'Jan 1', desktop: 80000, mobile: 60000 },
        { name: 'Jan 2', desktop: 85000, mobile: 65000 },
        { name: 'Jan 3', desktop: 90000, mobile: 70000 },
        { name: 'Jan 4', desktop: 82000, mobile: 68000 },
        { name: 'Jan 5', desktop: 95000, mobile: 75000 },
        { name: 'Jan 6', desktop: 88000, mobile: 72000 },
        { name: 'Jan 7', desktop: 98000, mobile: 78000 },
      ],
      traffic: [
        { name: 'Organic', value: 45, color: '#10b981' },
        { name: 'Paid', value: 30, color: '#f59e0b' },
        { name: 'Social', value: 25, color: '#ef4444' },
      ],
      conversion: [
        { name: 'Jan 1', conversion: 2.5, bounce: 55 },
        { name: 'Jan 2', conversion: 2.8, bounce: 52 },
        { name: 'Jan 3', conversion: 3.0, bounce: 48 },
        { name: 'Jan 4', conversion: 2.7, bounce: 50 },
        { name: 'Jan 5', conversion: 3.2, bounce: 45 },
        { name: 'Jan 6', conversion: 2.9, bounce: 47 },
        { name: 'Jan 7', conversion: 3.1, bounce: 44 },
      ]
    },
    // Week 2
    {
      revenue: [
        { name: 'Jan 8', value: 320000 },
        { name: 'Jan 9', value: 350000 },
        { name: 'Jan 10', value: 380000 },
        { name: 'Jan 11', value: 365000 },
        { name: 'Jan 12', value: 390000 },
        { name: 'Jan 13', value: 385000 },
        { name: 'Jan 14', value: 410000 },
      ],
      userActivity: [
        { name: 'Jan 8', desktop: 95000, mobile: 75000 },
        { name: 'Jan 9', desktop: 100000, mobile: 80000 },
        { name: 'Jan 10', desktop: 105000, mobile: 85000 },
        { name: 'Jan 11', desktop: 98000, mobile: 82000 },
        { name: 'Jan 12', desktop: 110000, mobile: 88000 },
        { name: 'Jan 13', desktop: 108000, mobile: 86000 },
        { name: 'Jan 14', desktop: 115000, mobile: 90000 },
      ],
      traffic: [
        { name: 'Organic', value: 43, color: '#10b981' },
        { name: 'Paid', value: 32, color: '#f59e0b' },
        { name: 'Social', value: 25, color: '#ef4444' },
      ],
      conversion: [
        { name: 'Jan 8', conversion: 3.0, bounce: 48 },
        { name: 'Jan 9', conversion: 3.2, bounce: 45 },
        { name: 'Jan 10', conversion: 3.4, bounce: 42 },
        { name: 'Jan 11', conversion: 3.1, bounce: 46 },
        { name: 'Jan 12', conversion: 3.5, bounce: 40 },
        { name: 'Jan 13', conversion: 3.3, bounce: 43 },
        { name: 'Jan 14', conversion: 3.6, bounce: 38 },
      ]
    },
    // Week 3
    {
      revenue: [
        { name: 'Jan 15', value: 380000 },
        { name: 'Jan 16', value: 410000 },
        { name: 'Jan 17', value: 420000 },
        { name: 'Jan 18', value: 405000 },
        { name: 'Jan 19', value: 445000 },
        { name: 'Jan 20', value: 435000 },
        { name: 'Jan 21', value: 460000 },
      ],
      userActivity: [
        { name: 'Jan 15', desktop: 110000, mobile: 88000 },
        { name: 'Jan 16', desktop: 118000, mobile: 92000 },
        { name: 'Jan 17', desktop: 125000, mobile: 95000 },
        { name: 'Jan 18', desktop: 115000, mobile: 90000 },
        { name: 'Jan 19', desktop: 130000, mobile: 98000 },
        { name: 'Jan 20', desktop: 125000, mobile: 95000 },
        { name: 'Jan 21', desktop: 135000, mobile: 102000 },
      ],
      traffic: [
        { name: 'Organic', value: 41, color: '#10b981' },
        { name: 'Paid', value: 35, color: '#f59e0b' },
        { name: 'Social', value: 24, color: '#ef4444' },
      ],
      conversion: [
        { name: 'Jan 15', conversion: 3.2, bounce: 46 },
        { name: 'Jan 16', conversion: 3.4, bounce: 43 },
        { name: 'Jan 17', conversion: 3.6, bounce: 40 },
        { name: 'Jan 18', conversion: 3.3, bounce: 44 },
        { name: 'Jan 19', conversion: 3.7, bounce: 38 },
        { name: 'Jan 20', conversion: 3.5, bounce: 41 },
        { name: 'Jan 21', conversion: 3.8, bounce: 36 },
      ]
    },
    // Week 4
    {
      revenue: [
        { name: 'Jan 22', value: 385000 },
        { name: 'Jan 23', value: 375000 },
        { name: 'Jan 24', value: 390000 },
        { name: 'Jan 25', value: 380000 },
        { name: 'Jan 26', value: 395000 },
        { name: 'Jan 27', value: 385000 },
        { name: 'Jan 28', value: 400000 },
      ],
      userActivity: [
        { name: 'Jan 22', desktop: 120000, mobile: 95000 },
        { name: 'Jan 23', desktop: 115000, mobile: 90000 },
        { name: 'Jan 24', desktop: 125000, mobile: 98000 },
        { name: 'Jan 25', desktop: 118000, mobile: 92000 },
        { name: 'Jan 26', desktop: 128000, mobile: 100000 },
        { name: 'Jan 27', desktop: 122000, mobile: 96000 },
        { name: 'Jan 28', desktop: 130000, mobile: 102000 },
      ],
      traffic: [
        { name: 'Organic', value: 40, color: '#10b981' },
        { name: 'Paid', value: 36, color: '#f59e0b' },
        { name: 'Social', value: 24, color: '#ef4444' },
      ],
      conversion: [
        { name: 'Jan 22', conversion: 3.3, bounce: 48 },
        { name: 'Jan 23', conversion: 3.1, bounce: 50 },
        { name: 'Jan 24', conversion: 3.4, bounce: 45 },
        { name: 'Jan 25', conversion: 3.2, bounce: 47 },
        { name: 'Jan 26', conversion: 3.5, bounce: 43 },
        { name: 'Jan 27', conversion: 3.3, bounce: 46 },
        { name: 'Jan 28', conversion: 3.6, bounce: 41 },
      ]
    },
    // Week 5
    {
      revenue: [
        { name: 'Jan 29', value: 400000 },
        { name: 'Jan 30', value: 430000 },
        { name: 'Jan 31', value: 450000 },
        { name: 'Feb 1', value: 440000 },
        { name: 'Feb 2', value: 470000 },
        { name: 'Feb 3', value: 460000 },
        { name: 'Feb 4', value: 485000 },
      ],
      userActivity: [
        { name: 'Jan 29', desktop: 125000, mobile: 100000 },
        { name: 'Jan 30', desktop: 135000, mobile: 105000 },
        { name: 'Jan 31', desktop: 140000, mobile: 110000 },
        { name: 'Feb 1', desktop: 132000, mobile: 108000 },
        { name: 'Feb 2', desktop: 145000, mobile: 115000 },
        { name: 'Feb 3', desktop: 138000, mobile: 112000 },
        { name: 'Feb 4', desktop: 150000, mobile: 118000 },
      ],
      traffic: [
        { name: 'Organic', value: 42, color: '#10b981' },
        { name: 'Paid', value: 34, color: '#f59e0b' },
        { name: 'Social', value: 24, color: '#ef4444' },
      ],
      conversion: [
        { name: 'Jan 29', conversion: 3.2, bounce: 52 },
        { name: 'Jan 30', conversion: 3.4, bounce: 48 },
        { name: 'Jan 31', conversion: 3.6, bounce: 45 },
        { name: 'Feb 1', conversion: 3.3, bounce: 50 },
        { name: 'Feb 2', conversion: 3.7, bounce: 42 },
        { name: 'Feb 3', conversion: 3.5, bounce: 46 },
        { name: 'Feb 4', conversion: 3.8, bounce: 40 },
      ]
    }
  ];

  const currentData = chartDataByTime[currentTimeIndex] || chartDataByTime[0];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? 
                (entry.value > 1000 ? `${(entry.value / 1000).toFixed(0)}K` : entry.value) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      {/* Revenue Trend */}
      <div className="chart-card">
        <h3 className="chart-title">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentData.revenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis 
              stroke="#9ca3af"
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#8b5cf6' }}
              animationDuration={1200}
              animationBegin={0}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Activity */}
      <div className="chart-card">
        <h3 className="chart-title">User Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={currentData.userActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis 
              stroke="#9ca3af"
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="desktop" 
              stackId="1"
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.8}
              animationDuration={1200}
              animationBegin={0}
              animationEasing="ease-in-out"
            />
            <Area 
              type="monotone" 
              dataKey="mobile" 
              stackId="1"
              stroke="#10b981" 
              fill="#10b981"
              fillOpacity={0.8}
              animationDuration={1200}
              animationBegin={100}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic Sources */}
      <div className="chart-card">
        <h3 className="chart-title">Traffic Sources</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={currentData.traffic}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1200}
              animationBegin={0}
              animationEasing="ease-in-out"
            >
              {currentData.traffic.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-legend">
          {currentData.traffic.map((entry, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="legend-text">{entry.name}</span>
              <span className="legend-value">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion & Bounce Rates */}
      <div className="chart-card">
        <h3 className="chart-title">Conversion & Bounce Rates</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={currentData.conversion}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="conversion" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1200}
              animationBegin={0}
              animationEasing="ease-in-out"
            />
            <Bar 
              dataKey="bounce" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1200}
              animationBegin={100}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
