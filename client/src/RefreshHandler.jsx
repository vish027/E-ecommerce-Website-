// RefreshHandler.jsx
import { useEffect } from "react";

function RefreshHandler({ setIsAuthenticated }) {
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);  // ✅ User is authenticated
    } else {
      setIsAuthenticated(false); // ❌ No token, user is not authenticated
    }
  }, [setIsAuthenticated]);

  // This component does not render anything
  return null;
}

export default RefreshHandler;
