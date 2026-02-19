import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import InstructorDashboard from './pages/InstructorDashboard';
import CoursePlayerPage from './pages/CoursePlayerPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/courses" element={<CoursesPage />} />
                            <Route path="/courses/:id" element={<CourseDetailsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/instructor" element={<InstructorDashboard />} />
                                <Route path="/course/:courseId/lecture/:lessonId" element={<CoursePlayerPage />} />
                                <Route path="/course/:courseId/learn" element={<CoursePlayerPage />} />
                            </Route>
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
