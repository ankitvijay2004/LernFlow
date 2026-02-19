import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Play, CheckCircle, Clock, Users, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: courseData } = await axios.get(`/api/courses/${id}`);
                setCourse(courseData);

                if (user) {
                    const { data: enrollStatus } = await axios.get(`/api/enrollments/check/${id}`, {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setIsEnrolled(enrollStatus.isEnrolled);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, user]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await axios.post('/api/enrollments', { courseId: id }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setIsEnrolled(true);
            // Optionally redirect to player
            navigate(`/course/${id}/learn`);
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '10rem' }}>Loading course syllabus...</div>;
    if (!course) return <div style={{ textAlign: 'center', padding: '10rem' }}>Course not found.</div>;

    return (
        <div className="container section-padding animate-fade">
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                {/* Course Info */}
                <div>
                    <header style={{ marginBottom: '2.5rem' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em' }}>{course.category}</span>
                        <h1 style={{ fontSize: '3.5rem', margin: '0.75rem 0', fontWeight: 800, letterSpacing: '-0.03em' }}>{course.title}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '800px' }}>{course.description}</p>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}><Users size={20} color="var(--primary)" /> 1,248 Students</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}><Clock size={20} color="var(--secondary)" /> 12.5 Hours</div>
                        </div>
                    </header>

                    <section style={{ marginTop: '4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem' }}>Course Content</h2>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{course.lessons?.length || 0} Lessons</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {course.lessons && course.lessons.length > 0 ? (
                                course.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                                    <div key={lesson._id} className="glass card-hover" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                                                {index + 1}
                                            </div>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{lesson.title}</span>
                                        </div>
                                        {isEnrolled ? (
                                            <Link to={`/course/${course._id}/lecture/${lesson._id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                                <Play size={16} fill="white" />
                                            </Link>
                                        ) : (
                                            <Lock size={20} style={{ color: 'var(--text-muted)', marginRight: '1rem' }} />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No lessons added to this syllabus yet.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Enrollment Card */}
                <div className="mobile-stack">
                    <div className="glass" style={{ padding: '2.5rem', position: 'sticky', top: '8rem', boxShadow: 'var(--shadow)' }}>
                        <div style={{ height: '220px', borderRadius: '16px', overflow: 'hidden', background: 'var(--card-bg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Play size={80} color="var(--primary)" opacity={0.5} />
                            )}
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                            {isEnrolled ? <span className="gradient-text">Enrolled</span> : `$${course.price}`}
                        </div>

                        {isEnrolled ? (
                            <Link to={`/course/${id}/learn`} className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
                                <Play size={20} /> Continue Learning
                            </Link>
                        ) : (
                            <button onClick={handleEnroll} className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                                Enroll Now <ChevronRight size={20} />
                            </button>
                        )}

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem', fontWeight: 500 }}>Full Lifetime Access</p>

                        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle size={18} color="#10b981" /> {isEnrolled ? 'Full content unlocked' : 'Lifetime access'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle size={18} color="#10b981" /> Downloadable resources</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle size={18} color="#10b981" /> Certificate of completion</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetailsPage;
