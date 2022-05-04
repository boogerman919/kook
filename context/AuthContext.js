import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react';
import {userAuth} from '../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    return userAuth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = userAuth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
