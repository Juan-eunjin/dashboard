/**
 * DashboardHeader Component
 * 
 * 상단에 타이틀.
 */

import React from 'react';
import '../styles/DashboardHeader.css';

// TypeScript 인터페이스 정의
interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title
}) => {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">{title}</h1>
    </header>
  );
};