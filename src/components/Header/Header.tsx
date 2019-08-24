import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <section className="header-section">
      <div className="item">
        <span className="title"></span>
      </div>

      <Navigation />
    </section>
  );
};

export default Header;
