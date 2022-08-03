import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intialToken);
  const userLoggedIn = !!token;

  const loginHandler = (token, deadLine) => {
    localStorage.setItem("token", token);
    localStorage.setItem("deadLine", deadLine);
    logoutTimer = setTimeout(logoutHandler, deadLine - Date.now());
    setToken(token);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("deadLine");
    clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem("deadLine") - Date.now();
      // if (timeLeft < 6000) timeLeft = 0;
      logoutTimer = setTimeout(logoutHandler, timeLeft);
    }
  }, [token, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
