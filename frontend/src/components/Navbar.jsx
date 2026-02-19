import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, LayoutDashboard, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass" style={{ margin: '1rem', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100, boxShadow: 'var(--shadow)' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em' }}>
                <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={24} color="white" />
                </div>
                <span className="gradient-text">LearnFlow</span>
            </Link>

            {/* Desktop Menu */}
            <div className="mobile-hide" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                <Link to="/courses" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, transition: 'var(--transition)' }}>
                    <Search size={18} /> Browse
                </Link>
                <Link to="/contact" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Contact</Link>

                {user ? (
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '0.9rem', fontWeight: 700 }}>
                                <User size={16} /> {user.name}
                            </div>
                            <button onClick={toggleTheme} className="glass" style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem', borderRadius: '10px', transition: 'var(--transition)' }}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button onClick={toggleTheme} className="glass" style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Get Started</Link>
                    </div>
                )}
            </div>

            {/* Mobile Toggle Placeholder (Hidden on Desktop via index.css) */}
            <div className="desktop-hide" style={{ display: 'none' }}>
                {/* Real mobile menu implementation would go here with a hamburger icon */}
            </div>
        </nav>
    );
};

export default Navbar;
