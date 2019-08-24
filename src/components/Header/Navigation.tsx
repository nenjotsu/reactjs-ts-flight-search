import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from 'appRoot/App.context';

const Navigation = () => {
  const { isLoggedIn, onLogin, onLogout } = React.useContext(AppContext);

  return (
    <div className="item link-items">
      {isLoggedIn ? (
        <>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/test" className="link">
            Test
          </Link>
          <Link to="/public" className="link">
            Public
          </Link>
          <button className="action-button" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="action-button" onClick={onLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navigation;
