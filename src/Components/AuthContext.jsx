// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZDE1My0xMDItODktMjMtMTE4Lm5ncm9rLWZyZWUuYXBwL2FwaS9zZWxsZXIvc2lnbi1pbiIsImlhdCI6MTcyMDAyNTM2NSwiZXhwIjoxNzIyNjE3MzY1LCJuYmYiOjE3MjAwMjUzNjUsImp0aSI6Ijg5dEdEWmtsM1ZNY25uZ2UiLCJzdWIiOiIxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.PUxSm_zdvCWGhuGZ4LjKvv0BAxSrhpSI1JtwtWcu8IQ';

  // Function to refresh the token
  const fetchNewToken = async () => {
    try {
      // Make a request to refresh the token
      const response = await fetch(token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      });

      const result = await response.json();
      if (response.ok && result.token) {
        setAuthToken(result.token);
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  // Refresh token periodically
  // useEffect(() => {
  //   const interval = setInterval(refreshAuthToken, 15 * 60 * 1000); // Refresh every 15 minutes
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, statusCode, setStatusCode, fetchNewToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useContext } from 'react';

// const StatusContext = createContext();

// export const StatusProvider = ({ children }) => {
//   const [statusCode, setStatusCode] = useState(null);

//   return (
//     <StatusContext.Provider value={{ statusCode, setStatusCode }}>
//       {children}
//     </StatusContext.Provider>
//   );
// };

// export const useStatus = () => useContext(StatusContext);
