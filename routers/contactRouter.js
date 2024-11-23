const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const router = express.Router();

router.route('/').post(
    catchAsync(async (req, res, next) => {
        if (!req.body.email || !req.body.name || !req.body.message) {
            return next(
                new AppError(
                    'Missing required fields: email, name, or message',
                    400
                )
            );
        }
        await sendEmail({
            from: req.body.email,
            subject: 'Conact Form',
            html: `
        <p><strong>Name:</strong> ${req.body.name}.</p>
         <p><strong>Email:</strong> ${req.body.email}.</p>
        <p><strong>Message:</strong> ${req.body.message}.</p>
        `,
        });
    })
);

module.exports = router;
