import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Book, Play, Clock, Award, Users, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await axios.get('/api/enrollments/my', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setEnrollments(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchMyCourses();
    }, [user]);

    return (
        <div className="container section-padding animate-fade">
            <header className="mobile-stack" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Welcome Back, <span className="gradient-text">{user?.name}</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You have <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{enrollments.length}</span> courses in progress.</p>
                </div>
                <div className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>12</div>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Hours</div>
                    </div>
                    <div style={{ height: '30px', width: '1px', background: 'var(--glass-border)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>04</div>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Badges</div>
                    </div>
                </div>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Syncing your progress...</div>
                </div>
            ) : (
                <section>
                    <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>Your Enrolled Courses</h2>
                    {enrollments.length > 0 ? (
                        <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {enrollments.map(({ course, completedLessons }, idx) => (
                                <div key={course._id} className={`glass card-hover animate-fade stagger-${(idx % 3) + 1}`} style={{ overflow: 'hidden' }}>
                                    <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ height: '100%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Book size={40} color="white" />
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '2rem 1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 }}>{course.title}</h3>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Users size={14} /> {course.instructor?.name || 'Instructor'}
                                        </p>

                                        {/* Progress Bar */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
                                                <span>Progress</span>
                                                <span style={{ color: 'var(--text-main)' }}>{Math.round((completedLessons.length / course.lessons.length) * 100) || 0}%</span>
                                            </div>
                                            <div style={{ background: 'rgba(255,255,255,0.05)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                                <div style={{
                                                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                                    height: '100%',
                                                    borderRadius: '5px',
                                                    width: `${(completedLessons.length / course.lessons.length) * 100 || 0}%`,
                                                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}></div>
                                            </div>
                                        </div>

                                        <Link to={`/course/${course._id}/learn`} className="btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                                            <Play size={18} fill="white" /> Continue Learning
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                            <Book size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.3 }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Start your journey today</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>Explore our catalog of premium courses and start learning high-demand skills.</p>
                            <Link to="/courses" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Browse Catalog <ChevronRight size={18} /></Link>
                        </div>
                    )}
                </section>
            )}

            {/* Achievements Mockup */}
            <section style={{ marginTop: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Achievements</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Award size={24} color="#fbbf24" />
                        <span>Quick Learner</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
