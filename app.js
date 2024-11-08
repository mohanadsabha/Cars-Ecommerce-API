const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalEerrorHandler = require('./controllers/errorController');
const userRouter = require('./routers/userRoutes');
const carRouter = require('./routers/carRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/tours', carRouter);
app.use('/api/v1/users', userRouter);

// Unhandeld routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handeler
app.use(globalEerrorHandler);

module.exports = app;
