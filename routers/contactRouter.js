const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const router = express.Router();

router.route('/').post(
    catchAsync(async (req, res, next) => {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return next(
                new AppError(
                    'Missing required fields: email, name, or message',
                    400
                )
            );
        }
        await sendEmail({
            from: email,
            subject: 'Conact Form Cars Website!',
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        `,
        });
        res.status(200).json({
            status: 'success',
        });
    })
);

module.exports = router;
