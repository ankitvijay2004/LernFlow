import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Users, Globe } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="animate-fade">
            {/* Hero Section */}
            <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <h1 style={{ fontSize: '5rem', marginBottom: '1.5rem', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.04em' }}>
                        Elevate Your <span className="gradient-text">Future</span> <br />
                        With LearnFlow
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Experience a premium learning environment designed for the modern world.
                        Master high-demand skills with expert-led courses and certified recognition.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }} className="mobile-stack">
                        <Link to="/courses" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1.2rem 3rem' }}>
                            Explore Courses <Zap size={20} />
                        </Link>
                        <Link to="/register" className="glass" style={{ fontSize: '1.1rem', padding: '1.2rem 3rem', fontWeight: 600 }}>
                            Join for Free
                        </Link>
                    </div>
                </div>

                {/* Visual Blobs */}
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.1, zIndex: 0 }}></div>
            </section>

            {/* Features Section */}
            <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                <div className="container">
                    <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Zap size={32} color="var(--primary)" />}
                            title="Expert-Led Videos"
                            description="High-quality video content from industry leaders and academic experts."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={32} color="var(--secondary)" />}
                            title="Verified Certificates"
                            description="Earn recognition for your achievements with industry-recognized certificates."
                        />
                        <FeatureCard
                            icon={<Users size={32} color="var(--accent)" />}
                            title="Community Learning"
                            description="Connect with fellow students and mentors in our vibrant learning community."
                        />
                        <FeatureCard
                            icon={<Globe size={32} color="var(--primary)" />}
                            title="Self-Paced"
                            description="Learn at your own speed with lifetime access to all your enrolled courses."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                        <StatItem value="10K+" label="Active Students" />
                        <StatItem value="500+" label="Expert Mentors" />
                        <StatItem value="250+" label="Total Courses" />
                        <StatItem value="99%" label="Success Rate" />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="glass" style={{ padding: '2rem', transition: 'var(--transition)' }}>
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{description}</p>
    </div>
);

const StatItem = ({ value, label }) => (
    <div>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{value}</h2>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{label}</p>
    </div>
);

export default HomePage;
