import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Book, Users, DollarSign, Settings, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InstructorDashboard = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showLessons, setShowLessons] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Course Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');

    // Lesson Form State
    const [lTitle, setLTitle] = useState('');
    const [lContent, setLContent] = useState('');
    const [lVideo, setLVideo] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

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

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post('/api/courses', {
                title, description, price, category
            }, config);
            setCourses([...courses, data]);
            setShowCreate(false);
            // Reset form
            setTitle(''); setDescription(''); setPrice(0); setCategory('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`/api/courses/${selectedCourse._id}/lessons`, {
                title: lTitle, content: lContent, videoUrl: lVideo, order: selectedCourse.lessons.length + 1
            }, config);
            setShowLessons(false);
            setLTitle(''); setLContent(''); setLVideo('');
            fetchCourses(); // Refresh to show new lesson count
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-fade" style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1>Instructor <span className="gradient-text">Dashboard</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your courses and track student performance.</p>
                </div>
                <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} /> Create New Course
                </button>
            </header>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard icon={<Book color="#6366f1" />} label="Total Courses" value={courses.length} />
                <StatCard icon={<Users color="#a855f7" />} label="Total Students" value="1,248" />
                <StatCard icon={<DollarSign color="#10b981" />} label="Earnings" value="$12,450" />
                <StatCard icon={<Video color="#ec4899" />} label="Video Hours" value="48h" />
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Your Courses</h2>
            {loading ? (
                <div>Loading your courses...</div>
            ) : (
                <div className="glass" style={{ overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1rem' }}>Course Name</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Price</th>
                                <th style={{ padding: '1rem' }}>Lessons</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{course.title}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{course.category}</td>
                                    <td style={{ padding: '1rem' }}>${course.price}</td>
                                    <td style={{ padding: '1rem' }}>{course.lessons?.length || 0}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => { setSelectedCourse(course); setShowLessons(true); }}
                                            style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <Settings size={18} /> Manage Lessons
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Course Modal */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass" style={{ width: '500px', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Create New Course</h2>
                        <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <input
                                placeholder="Course Title"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            />
                            <textarea
                                placeholder="Course Description"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', height: '100px' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="number" placeholder="Price"
                                    value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                    style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                                />
                                <input
                                    placeholder="Category"
                                    value={category} onChange={(e) => setCategory(e.target.value)}
                                    style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Create Course</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Manage Lessons Modal */}
            {showLessons && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass" style={{ width: '600px', padding: '2rem', maxHeight: '80vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Manage Lessons: {selectedCourse.title}</h2>

                        <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                            <h4 style={{ color: 'var(--primary)' }}>Add New Lesson</h4>
                            <input
                                placeholder="Lesson Title" required
                                value={lTitle} onChange={(e) => setLTitle(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            />
                            <textarea
                                placeholder="Lesson Content (Text/Instructions)"
                                value={lContent} onChange={(e) => setLContent(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', height: '80px' }}
                            />
                            <input
                                placeholder="YouTube Video URL"
                                value={lVideo} onChange={(e) => setLVideo(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            />
                            <button type="submit" className="btn-primary">Append Lesson</button>
                        </form>

                        <div style={{ marginTop: '1rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Current Lessons</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {selectedCourse.lessons?.map((l, idx) => (
                                    <div key={l._id || idx} className="glass" style={{ padding: '0.8rem 1rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{idx + 1}. {l.title}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>{l.videoUrl ? 'Video Included' : 'Text Only'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => setShowLessons(false)} className="btn-primary" style={{ width: '100%', marginTop: '2rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>Close Panel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
        </div>
    </div>
);

export default InstructorDashboard;
