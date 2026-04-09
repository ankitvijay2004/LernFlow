const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/courseModel');
const User = require('./models/userModel');

const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const courses = [
    {
        title: 'Full-Stack Web Development',
        description: 'Master the MERN stack from scratch with hands-on projects and professional guidance.',
        price: 99.99,
        category: 'Development',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Modern UI/UX Design',
        description: 'Learn the principles of glassmorphism, accessibility, and high-conversion design.',
        price: 79.99,
        category: 'Design',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Data Science with Python',
        description: 'Analyze complex datasets and build predictive models using NumPy, Pandas, and Scikit-learn.',
        price: 89.99,
        category: 'Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Advanced JavaScript Patterns',
        description: 'Deep dive into closures, prototypes, and modern asynchronous programming.',
        price: 59.99,
        category: 'Development',
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Digital Marketing Mastery',
        description: 'SEO, SEM, and social media strategies to scale your business in 2026.',
        price: 49.99,
        category: 'Marketing',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Machine Learning A-Z',
        description: 'Build robust AI models from deep learning to reinforcement learning.',
        price: 129.99,
        category: 'Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Mobile App Development',
        description: 'Create cross-platform apps for iOS and Android using React Native.',
        price: 85.00,
        category: 'Development',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Cybersecurity Fundamentals',
        description: 'Protect systems from attacks and learn ethical hacking techniques.',
        price: 110.00,
        category: 'IT & Software',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Cloud Architecture (AWS)',
        description: 'Design scalable and highly available applications on the Amazon Cloud.',
        price: 95.00,
        category: 'IT & Software',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Professional Photography',
        description: 'Master your camera, lighting, and post-processing in Adobe Lightroom.',
        price: 65.00,
        category: 'Photography',
        thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Business Strategy 2026',
        description: 'Navigate the post-AI economy with strategic leadership and innovation.',
        price: 55.00,
        category: 'Business',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Graphic Design Masterclass',
        description: 'Master Photoshop, Illustrator, and InDesign for professional branding.',
        price: 75.00,
        category: 'Design',
        thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Financial Analysis 101',
        description: 'Understand balance sheets, cash flows, and investment modeling.',
        price: 80.00,
        category: 'Finance',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Product Management Suite',
        description: 'Learn the lifecycle of software products from discovery to launch.',
        price: 90.00,
        category: 'Business',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Responsive Web Design',
        description: 'Build beautiful websites that look great on any screen size.',
        price: 45.00,
        category: 'Development',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    }

];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Delete existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses.');

        // We need an instructor user to assign these courses to
        let instructor = await User.findOne({ role: 'instructor' });
        if (!instructor) {
            // Create a default instructor if none exists
            instructor = await User.create({
                name: 'John Doe',
                email: 'instructor@example.com',
                password: 'password123',
                role: 'instructor'
            });
            console.log('Created default instructor user.');
        }

        const coursesWithInstructor = courses.map(course => ({
            ...course,
            instructor: instructor._id,
            lessons: [] // To be added via UI or future script
        }));

        await Course.insertMany(coursesWithInstructor);
        console.log('Successfully seeded 15 courses!');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
