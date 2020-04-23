import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SigInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  sigIn(credentials: SigInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:token');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const sigIn = useCallback(async ({ email, password }) => {
    const resp = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = resp.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:token', JSON.stringify(user));

    setData({ token, user });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, sigIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
