const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middlewares/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoute');
const coursePaymentRoutes = require('./routes/coursePaymentRoute');
const courseBatchRoutes = require('./routes/courseBatchRoute');
const classRoutes = require('./routes/classRoute');
const enrollmentRoutes = require('./routes/enrollmentRoute');
const attendanceRoutes = require('./routes/attendanceRoute');
const eventRoutes = require('./routes/eventRoute');
const feedbackRoutes = require('./routes/feedbackRoute');
const forumRoutes = require('./routes/forumRoute');
const gradeBookRoutes = require('./routes/gradeBookRoute');
const libraryRoutes = require('./routes/libraryRoute');
const paymentRoutes = require('./routes/paymentRoute');
const supportRoutes = require('./routes/supportRoute');
const walletRoutes = require('./routes/walletRoute');
const centerInfoRoutes = require('./routes/centerInfoRoute');

const app = express();
exports.app = app;

// Middlewares
app.use(cors());
app.use(express.json({
    verify: (req, res, buf) => {
        console.log('Raw body:', buf.toString());
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/coursePayments', coursePaymentRoutes);
app.use('/api/coursebatches', courseBatchRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/grades', gradeBookRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/center-info', centerInfoRoutes);

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;