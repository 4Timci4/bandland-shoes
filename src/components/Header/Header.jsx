import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { categoryService } from '../../services/categoryService';
import './Header.css';
import logo from '../../assets/images/mt-logo.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownTimeoutRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategoriesWithSubCategories();
        setCategories(data);
      } catch (error) {
        console.error('Kategoriler yüklenemedi', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__content">
          <div className="header__logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Badland Shoes Logo" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Ana Sayfa
                </NavLink>
              </li>
              <li
                className="dropdown"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink to="/products" className="dropdown-toggle">
                  Ürünler
                </NavLink>
                <div
                  className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu--open' : ''}`}
                >
                  <div className="dropdown-menu__grid">
                    {categories.map((category) => (
                      <div key={category.id} className="dropdown-column">
                        <h4 className="dropdown-header">
                          <NavLink
                            to={`/category/${encodeURIComponent(category.name.toLowerCase())}?category_id=${category.id}`}
                            className="dropdown-link main-category-link"
                            onClick={closeMenu}
                          >
                            {category.name}
                          </NavLink>
                        </h4>
                        {category.sub_categories.map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={`/category/${encodeURIComponent(category.name.toLowerCase())}/${encodeURIComponent(sub.name.toLowerCase())}?category_id=${category.id}&subcategory_id=${sub.id}`}
                            className="dropdown-link"
                            onClick={closeMenu}
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Hakkımızda
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  İletişim
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header__menu-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          <nav
            className={`header__mobile-nav ${isOpen ? 'header__mobile-nav--open' : ''}`}
          >
            <ul className="header__mobile-nav-list">
              <li>
                <NavLink to="/" onClick={toggleMenu}>
                  Ana Sayfa
                </NavLink>
              </li>
              {categories.map((category) => (
                <li key={category.id} className="mobile-dropdown">
                  <NavLink
                    to={`/category/${encodeURIComponent(category.name.toLowerCase())}?category_id=${category.id}`}
                    className="mobile-dropdown-header"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </NavLink>
                  <ul className="mobile-submenu">
                    {category.sub_categories.map((sub) => (
                      <li key={sub.id}>
                        <NavLink
                          to={`/category/${encodeURIComponent(category.name.toLowerCase())}/${encodeURIComponent(sub.name.toLowerCase())}?category_id=${category.id}&subcategory_id=${sub.id}`}
                          onClick={toggleMenu}
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li>
                <NavLink to="/about" onClick={toggleMenu}>
                  Hakkımızda
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={toggleMenu}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleMenu}>
                  İletişim
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div
        className={`header-overlay ${isDropdownOpen ? 'header-overlay--open' : ''}`}
      ></div>
    </>
  );
}

export default Header;
