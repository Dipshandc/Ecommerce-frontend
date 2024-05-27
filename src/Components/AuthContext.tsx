import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh")
  );

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ access: string; refresh: string }>(
        "http://127.0.0.1:8000/api/token/",
        { username, password }
      );
      const token = response.data;
      setRefreshToken(token.refresh);
      setAccessToken(token.access);

      localStorage.setItem("access", token.access);
      localStorage.setItem("refresh", token.refresh);

      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      if (refreshToken) {
        const response = await axios.post<{ access: string; refresh: string }>(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: refreshToken }
        );
        const token = response.data;
        setRefreshToken(token.refresh);
        setAccessToken(token.access);

        localStorage.setItem("access", token.access);
        localStorage.setItem("refresh", token.refresh);
        console.log("Refreshed");
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  };

  useEffect(() => {
    const refreshTokenInterval = setInterval(refreshAccessToken, 4 * 60 * 1000);
    return () => clearInterval(refreshTokenInterval);
  }, [refreshToken]);

  const contextValue: AuthContextType = {
    accessToken,
    refreshToken,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
