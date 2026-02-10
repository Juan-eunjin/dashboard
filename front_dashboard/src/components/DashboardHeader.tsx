import React from 'react';
import '../styles/DashboardHeader.css';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 임포트

interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const navigate = useNavigate(); // 2. 네비게이트 함수 선언

  return (
    <header className="dashboard-header" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
      <h1 className="dashboard-title">{title}</h1>
    </header>
  );
};