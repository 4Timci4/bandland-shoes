import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaImages, FaNewspaper, FaSitemap, FaBoxes,
  FaAddressBook, FaChevronDown, FaWrench, FaInbox
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  
  // path'in bir başlangıçla eşleşip eşleşmediğini kontrol et
  const isActiveParent = (path) => location.pathname.startsWith(path);

  const toggleContactMenu = (e) => {
    e.preventDefault();
    setIsContactOpen(!isContactOpen);
  };
  
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <h2>Admin Panel</h2>
      </div>
      <nav className="admin-sidebar__nav">
        <ul>
          <li className={isActive('/admin') ? 'active' : ''}><Link to="/admin"><FaHome /><span>Dashboard</span></Link></li>
          <li className={isActive('/admin/sliders') ? 'active' : ''}><Link to="/admin/sliders"><FaImages /><span>Slider Yönetimi</span></Link></li>
          <li className={isActive('/admin/blogs') ? 'active' : ''}><Link to="/admin/blogs"><FaNewspaper /><span>Blog Yönetimi</span></Link></li>
          <li className={isActive('/admin/products') ? 'active' : ''}><Link to="/admin/products"><FaBoxes /><span>Ürün Yönetimi</span></Link></li>
          <li className={isActive('/admin/categories') ? 'active' : ''}><Link to="/admin/categories"><FaSitemap /><span>Kategori Yönetimi</span></Link></li>

          {/* İletişim Açılır Menüsü */}
          <li className={`has-submenu ${isContactOpen || isActiveParent('/admin/contact') ? 'open' : ''}`}>
            <a href="#" onClick={toggleContactMenu}>
              <div className="menu-item-content">
                <FaAddressBook /><span>İletişim Ayarları</span>
              </div>
              <FaChevronDown className="submenu-arrow"/>
            </a>
            <ul className="submenu">
              <li className={isActive('/admin/contact-details') ? 'active-submenu' : ''}>
                <Link to="/admin/contact-details"><FaWrench /><span>Bilgileri Düzenle</span></Link>
              </li>
              <li className={isActive('/admin/contact-submissions') ? 'active-submenu' : ''}>
                <Link to="/admin/contact-submissions"><FaInbox /><span>Gelen Mesajlar</span></Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="admin-sidebar__footer">
        <Link to="/" className="admin-sidebar__back-to-site">
          Siteye Dön
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;