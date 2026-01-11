import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for saved auth on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('adminUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (id, password) => {
        if (id === 'skywebg' && password === 'sky@123') {
            const adminUser = { username: "skywebg", role: "admin" };
            setUser(adminUser);
            localStorage.setItem('adminUser', JSON.stringify(adminUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
