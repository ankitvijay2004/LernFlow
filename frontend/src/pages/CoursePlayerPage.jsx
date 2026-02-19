import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, PlayCircle, Book, CheckCircle } from 'lucide-react';

const CoursePlayerPage = () => {
    const { courseId, lessonId } = useParams();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`/api/courses/${courseId}`);
                setCourse(data);
                if (lessonId) {
                    setActiveLesson(data.lessons.find(l => l._id === lessonId));
                } else if (data.lessons.length > 0) {
                    setActiveLesson(data.lessons.sort((a, b) => a.order - b.order)[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId, lessonId]);

    if (loading) return <div style={{ textAlign: 'center', padding: '10rem' }}>Opening the classroom...</div>;
    if (!course) return <div style={{ textAlign: 'center', padding: '10rem' }}>Course content not found.</div>;

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
            {/* Sidebar Syllabus */}
            <div className="glass" style={{ width: '350px', borderRight: '1px solid var(--glass-border)', overflowY: 'auto' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <Link to={`/courses/${courseId}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        <ChevronLeft size={16} /> Back to Syllabus
                    </Link>
                    <h3 style={{ fontSize: '1.1rem' }}>{course.title}</h3>
                </div>
                <div style={{ padding: '1rem' }}>
                    {course.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                        <Link
                            key={lesson._id}
                            to={`/course/${courseId}/lecture/${lesson._id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '12px',
                                marginBottom: '0.5rem',
                                background: activeLesson?._id === lesson._id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                color: activeLesson?._id === lesson._id ? 'var(--primary)' : 'var(--text-main)',
                                transition: 'var(--transition)'
                            }}
                        >
                            <div style={{ color: activeLesson?._id === lesson._id ? 'var(--primary)' : 'var(--text-muted)' }}>
                                {index + 1}.
                            </div>
                            <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: activeLesson?._id === lesson._id ? 600 : 400 }}>{lesson.title}</div>
                            <PlayCircle size={18} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Video / Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
                {activeLesson ? (
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem' }}>
                        <div className="glass" style={{ width: '100%', aspectRatio: '16/9', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {activeLesson.videoUrl ? (
                                <iframe
                                    width="100%" height="100%"
                                    src={activeLesson.videoUrl.replace('watch?v=', 'embed/')}
                                    title="Video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <Video size={64} style={{ marginBottom: '1rem' }} />
                                    <p>No video attached to this lesson.</p>
                                </div>
                            )}
                        </div>
                        <h1 style={{ marginBottom: '1.5rem' }}>{activeLesson.title}</h1>
                        <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                            {activeLesson.content}
                        </div>

                        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                            <button className="glass" style={{ padding: '0.8rem 1.5rem', color: 'white' }}>Previous Lesson</button>
                            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Complete & Continue</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '10rem' }}>Select a lesson to start learning.</div>
                )}
            </div>
        </div>
    );
};

export default CoursePlayerPage;
