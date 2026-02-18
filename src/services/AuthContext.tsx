import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const VALID_USERNAME = 'thilak';
const VALID_PASSWORD = 'Sai@2015';
const SESSION_KEY = 'billing_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === '1'
    );

    useEffect(() => {
        if (isAuthenticated) {
            sessionStorage.setItem(SESSION_KEY, '1');
        } else {
            sessionStorage.removeItem(SESSION_KEY);
        }
    }, [isAuthenticated]);

    const login = useCallback((username: string, password: string): boolean => {
        if (username.trim().toLowerCase() === VALID_USERNAME && password === VALID_PASSWORD) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        sessionStorage.removeItem(SESSION_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
