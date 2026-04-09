import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container section-padding animate-fade">
            <header className="mobile-stack" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Explore <span className="gradient-text">Courses</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Pick a course and start your learning journey today.</p>
                </div>
                <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1.25rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <Search size={20} style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none', fontSize: '1rem' }}
                    />
                </div>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Loading premium catalog...</div>
                </div>
            ) : (
                <>
                    {filteredCourses.length > 0 ? (
                        <div className="resp-grid perspective-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {filteredCourses.map((course, idx) => (
                                <div key={course._id} className={`glass card-hover card-3d animate-fade stagger-${(idx % 3) + 1}`} style={{ overflow: 'hidden' }}>
                                    <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div style={{
                                            height: '100%',
                                            background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                                            display: course.thumbnail ? 'none' : 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Book size={48} color="white" />
                                        </div>
                                    </div>
                                    <div style={{ padding: '2rem 1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{course.category}</span>
                                            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-main)' }}>${course.price}</span>
                                        </div>
                                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 700 }}>{course.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', height: '4.2rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                                            {course.description}
                                        </p>
                                        <Link to={`/courses/${course._id}`} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                            View Syllabus
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                            <Search size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.3 }} />
                            <h2 style={{ marginBottom: '0.5rem' }}>No courses found</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search terms to find what you're looking for.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CoursesPage;
