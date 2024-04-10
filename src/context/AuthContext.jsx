import {createContext, useContext, useEffect, useState} from "react";
import {AUTH_ENDPOINTS} from "../api/authApi.js";
import {usePostMutation} from "../hooks/usePostMutation.js";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [token, setToken] = useState('');

    const userKey = 'authenticatedUser';
    const tokenKey = 'token';

    useEffect(() => {
        const savedUser = localStorage.getItem(userKey);
        const savedToken = localStorage.getItem(tokenKey) || '';
        setAuthenticatedUser(savedUser ? JSON.parse(savedUser) : null);
        setToken(savedToken)
    }, []);

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem(tokenKey);
    };

    const setUser = (data) => {
        setAuthenticatedUser(data);
        if(data){
            localStorage.setItem(userKey, JSON.stringify(data));
        } else{
            localStorage.removeItem(userKey)
        }
    }

    const setUserToken = (token) => {
        setToken(token);
        if(token){
            localStorage.setItem(tokenKey, token);
        } else{
            localStorage.removeItem(tokenKey)
        }
    }

    return (
        <AuthContext.Provider value={{authenticatedUser, token, logout, setUser, setUserToken}}>
            {children}
        </AuthContext.Provider>
    )
}