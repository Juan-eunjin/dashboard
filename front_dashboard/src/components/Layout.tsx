/**
 * Layoyt 컴포넌트
 * : 여러 페이지에서 공통으로 사용하는 레이아웃을 정의(헤더 + 본문 영역)
 * 
 * outlet > 자식 라우트가 렌더링될 자리, 즉 각 페이지의 본문 내용이 여기에 표시됨
 */

import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import '../styles/Layout.css';

const Layout = () => {
  // 실제로는 여기서 API 호출 로직 등을 관리하거나 
  // 특정 상태를 하위로 전달할 수 있습니다.

  return (
    <div className="layout-container">
      {/* 설계서에 맞는 타이틀을 Props로 전달 */}
      <DashboardHeader 
        title="JIRA Dashboard" 
      />
      
      <main className="layout-main">
        {/* 라우트된 자식 컴포넌트들이 여기에 렌더링됩니다 */}
        <Outlet />
      </main>

      <footer className="layout-footer">
        © 2026 Dashboard Project. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;