import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock checking auth status
    useEffect(() => {
        const checkAuth = async () => {
            // In real app, verify token with backend
            // const res = await fetch('/api/auth/me');
            // const data = await res.json();
            // if (res.ok) setUser(data);
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        // Implement login logic
        console.log("Login", email, password);
        setUser({ username: "DemoUser", role: "user" }); // Mock
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
