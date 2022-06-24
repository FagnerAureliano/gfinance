import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api/auth-header/api.service";
import AuthService, {
  LoginProps,
} from "../services/api/auth-service/auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProps | null;
  signIn: (data: LoginProps) => Promise<void>;
}
interface UserProps {
  username: string;
  password: string;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserProps | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { fin_auth_token: token } = parseCookies();
    if (token) {
      const _token = JSON.parse(token); 
      setUser(_token.user); 
    }
  }, [user]);
  async function signIn({ username, password }: LoginProps) {
    const { token, user } = await AuthService.login({ username, password });

    setCookie(undefined, "fin_auth_token", JSON.stringify(token), {
      maxAge: 60 * 60 * 1,
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/main");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
