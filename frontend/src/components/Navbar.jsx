import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, LayoutDashboard, Search, Sun, Moon, Menu, X, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme, styleVariant, toggleStyleVariant } = useTheme();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <nav className="site-nav glass">
            <Link
                to="/"
                onClick={() => setIsOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.03em' }}
            >
                <div style={{ background: 'var(--primary)', padding: '0.45rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={24} color="white" />
                </div>
                <span className="gradient-text">LearnFlow</span>
            </Link>

            <div className="mobile-hide" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                <Link to="/courses" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 700, transition: 'var(--transition)' }}>
                    <Search size={18} /> Browse
                </Link>
                <Link to="/contact" style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Contact</Link>

                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.8rem', borderRadius: '999px', border: '1px solid var(--glass-border)', fontSize: '0.84rem', fontWeight: 700 }}>
                                <User size={16} /> {user.name}
                            </div>
                            <button onClick={toggleTheme} className="glass" style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }} aria-label="Toggle theme">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={toggleStyleVariant}
                                className="glass"
                                style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                                aria-label="Toggle style"
                                title={`Style: ${styleVariant === 'portfolio' ? 'Portfolio' : 'Neo-Brutalist'}`}
                            >
                                <Palette size={20} />
                            </button>
                            <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.14)', color: '#ef4444', padding: '0.5rem', borderRadius: '10px', transition: 'var(--transition)' }} aria-label="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button onClick={toggleTheme} className="glass" style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }} aria-label="Toggle theme">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={toggleStyleVariant}
                            className="glass"
                            style={{ padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                            aria-label="Toggle style"
                            title={`Style: ${styleVariant === 'portfolio' ? 'Portfolio' : 'Neo-Brutalist'}`}
                        >
                            <Palette size={20} />
                        </button>
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 700 }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Get Started</Link>
                    </div>
                )}
            </div>

            <div className="desktop-hide">
                <button
                    className="glass"
                    onClick={() => setIsOpen((prev) => !prev)}
                    style={{ padding: '0.5rem', borderRadius: '10px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Open menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {isOpen && (
                    <div className="glass mobile-nav-panel animate-fade">
                        <Link to="/courses" onClick={() => setIsOpen(false)}>Browse Courses</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                <button onClick={toggleTheme} className="btn-ghost" type="button">
                                    {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                                </button>
                                <button onClick={toggleStyleVariant} className="btn-ghost" type="button">
                                    {styleVariant === 'portfolio' ? 'Use Neo-Brutalist' : 'Use Portfolio Style'}
                                </button>
                                <button onClick={handleLogout} className="btn-primary" type="button">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary">Get Started</Link>
                                <button onClick={toggleTheme} className="btn-ghost" type="button">
                                    {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                                </button>
                                <button onClick={toggleStyleVariant} className="btn-ghost" type="button">
                                    {styleVariant === 'portfolio' ? 'Use Neo-Brutalist' : 'Use Portfolio Style'}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
