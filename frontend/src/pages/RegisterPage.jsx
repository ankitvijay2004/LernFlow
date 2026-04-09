import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, UserRound, Mail, KeyRound, GraduationCap } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container section-padding animate-fade">
            <div className="auth-grid">
                <section className="glass auth-info-panel">
                    <p className="home-badge"><Rocket size={16} /> Build your next career milestone</p>
                    <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        Create your
                        <span className="gradient-text"> learning account</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.4rem' }}>
                        Join as a student or instructor, track progress from day one, and create projects that feel portfolio-ready.
                    </p>
                    <div className="auth-benefits">
                        <p><GraduationCap size={16} /> Personalized path based on your role</p>
                        <p><Rocket size={16} /> Faster onboarding to your first course</p>
                    </div>
                </section>

                <section className="glass auth-form-panel">
                    <h2 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Register</h2>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div>
                            <label className="auth-label">Full Name</label>
                            <div className="auth-input-wrap glass">
                                <UserRound size={16} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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

                        <div>
                            <label className="auth-label">I am a...</label>
                            <div className="auth-input-wrap glass">
                                <GraduationCap size={16} />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem 1.1rem' }}>
                            Start My Journey
                        </button>
                    </form>

                    <p style={{ marginTop: '1.1rem', color: 'var(--text-muted)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 700 }}>Login here</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Register;
