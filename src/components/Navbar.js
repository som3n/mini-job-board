import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? 'bg-green-600 text-white'
        : 'text-gray-700 hover:bg-green-100'
    }`;

  return (
    <nav className="bg-white fixed w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-green-600">JobBoard</div>
        <div className="space-x-4">
          <Link to="/" className={linkClass('/')}>
            Home
          </Link>
          <Link to="/add-job" className={linkClass('/add-job')}>
            Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
