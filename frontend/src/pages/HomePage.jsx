import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Users, Globe, ArrowRight, Sparkles, Trophy, Compass } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="animate-fade">
            <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center' }}>
                <div className="container hero-grid">
                    <div>
                        <div className="home-badge">
                            <Sparkles size={16} /> Cohort-based, AI-assisted, career-focused
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', marginBottom: '1.3rem', lineHeight: 0.95, fontWeight: 800, letterSpacing: '-0.04em' }}>
                            Learn In A
                            <span className="gradient-text"> Bolder Way</span>
                            <br />
                            Build Real Skills
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.12rem', marginBottom: '2rem', maxWidth: '620px', lineHeight: 1.7 }}>
                            LearnFlow is designed like a modern creative portfolio: meaningful projects,
                            visible progress, and outcomes you can show recruiters. Go from watching lessons
                            to shipping work.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/courses" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 1.5rem' }}>
                                Explore Paths <ArrowRight size={18} />
                            </Link>
                            <Link to="/register" className="btn-ghost" style={{ fontSize: '1rem', padding: '1rem 1.5rem' }}>
                                Start Learning Free
                            </Link>
                        </div>
                        <div style={{ display: 'flex', gap: '1.8rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                            <StatItem value="10K+" label="Active Learners" />
                            <StatItem value="92%" label="Course Completion" />
                            <StatItem value="250+" label="Deep-Dive Courses" />
                        </div>
                    </div>

                    <div className="glass hero-card-stack">
                        <div className="hero-card-row">
                            <FeaturePill icon={<Compass size={18} />} title="Roadmaps" text="Step-by-step plans with checkpoints." />
                            <FeaturePill icon={<Trophy size={18} />} title="Proof" text="Project-based certificates and reviews." />
                        </div>
                        <div className="hero-progress-card glass">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                <strong>Frontend Portfolio Track</strong>
                                <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>78%</span>
                            </div>
                            <div className="meter-bg">
                                <div className="meter-fill" style={{ width: '78%' }}></div>
                            </div>
                            <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                                Next milestone: deploy your capstone on Render and publish your case study.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', inset: 'auto auto 5% -8%', width: '380px', height: '380px', background: 'var(--orb-one)', filter: 'blur(70px)', opacity: 0.22, zIndex: 0 }}></div>
                <div style={{ position: 'absolute', top: '8%', right: '-8%', width: '340px', height: '340px', background: 'var(--orb-two)', filter: 'blur(80px)', opacity: 0.2, zIndex: 0 }}></div>
            </section>

            <section className="section-padding" style={{ paddingTop: '0.5rem' }}>
                <div className="container">
                    <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <FeatureCard
                            icon={<Zap size={26} color="var(--primary)" />}
                            title="Live Sprint Sessions"
                            description="Weekly focused sessions to keep your momentum high."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={26} color="var(--secondary)" />}
                            title="Verified Outcomes"
                            description="Portfolio checkpoints reviewed by mentors."
                        />
                        <FeatureCard
                            icon={<Users size={26} color="var(--accent)" />}
                            title="Peer Pod Teams"
                            description="Small cohorts for collaboration and accountability."
                        />
                        <FeatureCard
                            icon={<Globe size={26} color="var(--primary)" />}
                            title="Anywhere Access"
                            description="Learn on your schedule with cloud-synced progress."
                        />
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ paddingTop: '0.5rem' }}>
                <div className="container">
                    <div className="glass" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>
                                From Course Catalog To <span className="gradient-text">Career Momentum</span>
                            </h2>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                Discover a more intentional learning flow with project milestones, dashboard tracking,
                                and practical learning loops built for creators, engineers, and instructors.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
                            <Link to="/dashboard" className="btn-ghost" style={{ justifyContent: 'space-between' }}>
                                Open Personal Dashboard <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn-ghost" style={{ justifyContent: 'space-between' }}>
                                Talk To Learning Team <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeaturePill = ({ icon, title, text }) => (
    <div className="glass" style={{ padding: '1rem', borderRadius: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.45rem', fontWeight: 700 }}>
            {icon}
            {title}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</p>
    </div>
);

const FeatureCard = ({ icon, title, description }) => (
    <div className="glass card-hover" style={{ padding: '1.4rem', transition: 'var(--transition)' }}>
        <div style={{ marginBottom: '0.8rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{description}</p>
    </div>
);

const StatItem = ({ value, label }) => (
    <div>
        <h2 className="gradient-text" style={{ fontSize: '1.9rem', marginBottom: '0.1rem' }}>{value}</h2>
        <p style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
    </div>
);

export default HomePage;
