import React from 'react';
import '../styles/DashboardHeader.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { HEADER_TITLE } from '../constants/labels';
import { TITLE } from '../constants/defaultValue';
interface DashboardHeaderProps { }

export const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="dashboard-header">
      <div className="header-left"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}>
        <h1 className="dashboard-title">
          {TITLE.MAIN}
        </h1>
      </div>

      <nav className="dashboard-actions">
        <span
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          {HEADER_TITLE.DASHBOARD}
        </span>
        <span
          className={`nav-link ${location.pathname === '/detail' ? 'active' : ''}`}
          onClick={() => navigate('/detail')}
        >
          {HEADER_TITLE.DETAIL_PAGE}
        </span>
      </nav>
    </header>
  );
};