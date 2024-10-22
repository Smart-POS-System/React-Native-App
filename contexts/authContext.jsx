import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullUser, setFullUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedUser = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          // Check if token is expired
          if (decodedUser.exp > currentTime) {
            setUser(decodedUser);
            setIsAuthenticated(true); // Token is valid, user is authenticated
            console.log("Token is valid and user is authenticated.");
          } else {
            console.log("Token expired, logging out.");
            setIsAuthenticated(false); // Token expired
            await AsyncStorage.removeItem("token"); // Remove expired token
            setUser(null); // Clear user state
          }
        }
      } catch (error) {
        console.error("Error decoding token or token not found:", error);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("token"); // Remove invalid token
      } finally {
        setLoading(false); // Always stop the loading indicator
      }
    };

    fetchToken(); // Call the async function on load
  }, []);

  // Authenticate user by setting token and storing it in AsyncStorage
  const authenticate = async (token) => {
    try {
      const decodedUser = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedUser.exp > currentTime) {
        await AsyncStorage.setItem("token", token); // Store token
        setUser(decodedUser); // Set the decoded user
        setIsAuthenticated(true); // Mark as authenticated
        console.log("User authenticated successfully.");
      } else {
        console.log("Token expired during authentication.");
        logOut(); // Log out if token is expired
      }
    } catch (error) {
      console.error("Error decoding token during authentication:", error);
      logOut(); // Log out if there is an error decoding the token
    }
  };

  function handleFullUser(user) {
    // console.log("Full user set:", user);
    setFullUser(user);
  }

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setFullUser(null);
    console.log("User logged out.");
  };

  const value = {
    authenticate,
    logOut,
    user,
    loading,
    isAuthenticated,
    handleFullUser,
    fullUser,
    isUpdated,
    setIsUpdated,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuthentication() {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return auth;
}
