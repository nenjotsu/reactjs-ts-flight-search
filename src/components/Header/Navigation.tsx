import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import AppContext from 'app/App.context';

const Navigation = () => {
  const { isLoggedIn, onLogin, onLogout } = React.useContext(AppContext);

  return (
    <div className="item link-items">
      {isLoggedIn ? (
        <>
          <Link to="/" className="link">
            Home
          </Link>
          {/* <Link to="/test" className="link">
            Test
          </Link> */}
          <Link to="/about" className="link">
            About
          </Link>
          <Button className="action-button" onClick={onLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button className="action-button" onClick={onLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Navigation;
