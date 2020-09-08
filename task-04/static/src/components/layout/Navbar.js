import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <Link to='/documents'>
          <li className='navigation__item'>Documents</li>
        </Link>

        <Link to='/managers'>
          <li className='navigation__item'>Managers</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
