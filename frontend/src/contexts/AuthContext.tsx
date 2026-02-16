import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  getIdToken,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  signOut: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const unsub = onAuthStateChanged(auth, (u) => {
      if (!mounted.current) return;
      setUser(u);
      setLoading(false);
    });

    const unsubId = onIdTokenChanged(auth, (u) => {
      if (!mounted.current) return;
      setUser(u);
    });

    return () => {
      mounted.current = false;
      unsub();
      unsubId();
    };
  }, []);

  const getIdTokenFn = async (forceRefresh = false) => {
    if (!auth.currentUser) return null;
    return await getIdToken(auth.currentUser, forceRefresh);
  };

  const signOut = async () => firebaseSignOut(auth);

  const signInEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        getIdToken: getIdTokenFn,
        signOut,
        signInEmail,
        signUpEmail,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
