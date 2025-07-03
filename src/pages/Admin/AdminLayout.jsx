import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import './Admin.css';

function AdminLayout() {
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
