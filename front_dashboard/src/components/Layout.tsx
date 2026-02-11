import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import '../styles/Layout.css';
import { LAYOUT_DEFAULT_VALUES } from '../constants/defaultValue';

const Layout = () => {

  return (
    <div className="layout-container">
      <DashboardHeader />

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        {LAYOUT_DEFAULT_VALUES.FOOTER}
      </footer>
    </div>
  );
};

export default Layout;