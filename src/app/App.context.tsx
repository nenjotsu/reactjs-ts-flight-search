import React from 'react';

export interface IAppContext {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const AppContextDefaultValue = {
  isLoggedIn: false,
  onLogin: () => false,
  onLogout: () => false,
};

const AppContext = React.createContext<IAppContext>(AppContextDefaultValue);

export default AppContext;
