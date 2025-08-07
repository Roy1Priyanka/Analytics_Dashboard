import React from 'react';
import { DollarSign, Users, Activity, TrendingUp, Globe } from 'lucide-react';
import './KPICards.css';

const KPICards = ({ currentTimeIndex }) => {
  // Data for different time periods
  const kpiDataByTime = [
    // Week 1
    {
      revenue: { value: '$1.2M', change: '+5.2% vs prev' },
      users: { value: '245K', change: '+3.1% vs prev' },
      sessions: { value: '382K', change: '+2.8% vs prev' },
      conversion: { value: '2.84%', change: '+0.3% vs prev' },
      pageViews: { value: '1205K', change: '+4.2% vs prev' }
    },
    // Week 2
    {
      revenue: { value: '$1.5M', change: '+8.7% vs prev' },
      users: { value: '298K', change: '+7.2% vs prev' },
      sessions: { value: '445K', change: '+6.1% vs prev' },
      conversion: { value: '3.12%', change: '+0.8% vs prev' },
      pageViews: { value: '1387K', change: '+7.9% vs prev' }
    },
    // Week 3
    {
      revenue: { value: '$1.7M', change: '+12.1% vs prev' },
      users: { value: '325K', change: '+9.8% vs prev' },
      sessions: { value: '498K', change: '+11.2% vs prev' },
      conversion: { value: '3.28%', change: '+1.1% vs prev' },
      pageViews: { value: '1502K', change: '+9.3% vs prev' }
    },
    // Week 4
    {
      revenue: { value: '$1.6M', change: '-2.1% vs prev' },
      users: { value: '312K', change: '-1.8% vs prev' },
      sessions: { value: '475K', change: '-3.2% vs prev' },
      conversion: { value: '3.15%', change: '-0.4% vs prev' },
      pageViews: { value: '1465K', change: '-1.2% vs prev' }
    },
    // Week 5
    {
      revenue: { value: '$1.8M', change: '+15.3% vs prev' },
      users: { value: '364K', change: '+18.2% vs prev' },
      sessions: { value: '546K', change: '+16.8% vs prev' },
      conversion: { value: '3.37%', change: '+0.7% vs prev' },
      pageViews: { value: '1617K', change: '+12.4% vs prev' }
    }
  ];

  const currentData = kpiDataByTime[currentTimeIndex] || kpiDataByTime[0];

  const kpiConfig = [
    {
      id: 1,
      title: 'Total Revenue',
      data: currentData.revenue,
      icon: DollarSign,
      iconBg: 'bg-green'
    },
    {
      id: 2,
      title: 'Active Users',
      data: currentData.users,
      icon: Users,
      iconBg: 'bg-blue'
    },
    {
      id: 3,
      title: 'Sessions',
      data: currentData.sessions,
      icon: Activity,
      iconBg: 'bg-purple'
    },
    {
      id: 4,
      title: 'Conversion Rate',
      data: currentData.conversion,
      icon: TrendingUp,
      iconBg: 'bg-orange'
    },
    {
      id: 5,
      title: 'Page Views',
      data: currentData.pageViews,
      icon: Globe,
      iconBg: 'bg-teal'
    }
  ];

  const getChangeColor = (change) => {
    if (change.includes('+')) return 'positive';
    if (change.includes('-')) return 'negative';
    return 'neutral';
  };

  return (
    <div className="kpi-cards">
      {kpiConfig.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <div key={kpi.id} className="kpi-card">
            <div className={`kpi-icon ${kpi.iconBg}`}>
              <IconComponent size={24} />
            </div>
            <div className="kpi-content">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.data.value}</div>
              <div className={`kpi-change ${getChangeColor(kpi.data.change)}`}>
                {kpi.data.change} <span className="kpi-period">period</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
