import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);


    const login = (username, password) => {
        if (username === "admin" && password === "1234") {

            const fakeToken = "dG9rZW5GYWxzbzEyMzQ=";
            setToken(fakeToken);
            setUser(username);
            localStorage.setItem("token", fakeToken);
            localStorage.setItem("user", username);

            return true;
        }
        return false;
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

