import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import './Admin.css';

function AdminLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-layout__content">
        <div className="admin-layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
