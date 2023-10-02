import React, {
  createContext
} from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/useAuth";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface AuthContext {
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children, token }: { children: React.ReactNode, token: RequestCookie | undefined; }) => {

  useAuthStore.setState((state) => ({...state, isAuth: !!token}))

  return (
    <AuthContext.Provider value={{isAuth: !!token}}>{children}</AuthContext.Provider>
  );
};
