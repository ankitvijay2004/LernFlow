import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, KeyRound, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="container section-padding animate-fade">
            <div className="auth-grid">
                <section className="glass auth-info-panel">
                    <p className="home-badge"><Sparkles size={16} /> Return to your learning flow</p>
                    <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3.1rem)' }}>
                        Welcome back to
                        <span className="gradient-text"> LearnFlow</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.7rem' }}>
                        Continue your portfolio journey with synced progress, curated lessons, and mentor feedback.
                    </p>
                    <div className="auth-benefits">
                        <p><ShieldCheck size={16} /> Secure authentication and session management</p>
                        <p><Sparkles size={16} /> Smart recommendations for your next lesson</p>
                    </div>
                </section>

                <section className="glass auth-form-panel">
                    <h2 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Login</h2>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div>
                            <label className="auth-label">Email Address</label>
                            <div className="auth-input-wrap glass">
                                <Mail size={16} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="auth-label">Password</label>
                            <div className="auth-input-wrap glass">
                                <KeyRound size={16} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem 1.1rem' }}>
                            Login to Account
                        </button>
                    </form>

                    <p style={{ marginTop: '1.1rem', color: 'var(--text-muted)' }}>
                        Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--secondary)', fontWeight: 700 }}>Create one</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Login;
