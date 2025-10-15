import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, refreshAccessToken } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      const access = getAccessToken();
      if (access) {
        if (mounted) { setAuthenticated(true); setAuthChecked(true); }
        return;
      }
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        if (mounted) setAuthenticated(true);
      }
      if (mounted) setAuthChecked(true);
    }
    check();
    return () => { mounted = false; };
  }, []);

  if (!authChecked) return null; // or a spinner
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
