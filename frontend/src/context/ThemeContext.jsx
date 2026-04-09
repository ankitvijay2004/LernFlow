import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [styleVariant, setStyleVariant] = useState(localStorage.getItem('styleVariant') || 'portfolio');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-style', styleVariant);
        localStorage.setItem('styleVariant', styleVariant);
    }, [styleVariant]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleStyleVariant = () => {
        setStyleVariant(prev => prev === 'portfolio' ? 'neo' : 'portfolio');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, styleVariant, toggleStyleVariant }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
