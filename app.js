const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalEerrorHandler = require('./controllers/errorController');
const userRouter = require('./routers/userRoutes');
const carRouter = require('./routers/carRouter');
const contactRouter = require('./routers/contactRouter');

const app = express();
const limiter = rateLimit({
    max: 100, // 100 req from same ip
    windowMs: 60 * 60 * 1000, // in one hour
    message: 'Too many requests from this IP, please try again in an hour',
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security Middlewares
app.use(helmet());
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/contact', contactRouter);

// Unhandeld routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handeler
app.use(globalEerrorHandler);

module.exports = app;
