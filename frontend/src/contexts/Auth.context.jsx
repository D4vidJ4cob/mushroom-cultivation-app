import { useState, useCallback, useMemo } from 'react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { getById, post } from '../api';
import { JWT_TOKEN_KEY, AuthContext } from './auth';

export default function AuthProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));

  const {trigger: doLogin, error: loginError, isMutating: loginLoading} = useSWRMutation('sessions', post);

  const {data: user, error: userError, isLoading: userLoading} = useSWR(token?'users/me':'', getById);

  // const hasRole = (role) => {
  // // heeft de gebruiker de juiste rol?
  // };

  const login = useCallback(async (email, password) => {
    try {
      const {token} = await doLogin({email, password});
      setToken(token);
      localStorage.setItem(JWT_TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [doLogin]);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const value = useMemo(() => ({token, user, login, logout, 
    error: loginError || userError, loading: loginLoading || userLoading,
    isAuthed: Boolean(token), ready: !userLoading}),
  [token, user, login, logout, loginError, userError, loginLoading, userLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}