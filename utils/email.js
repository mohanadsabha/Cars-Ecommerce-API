const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create Transporter
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        // secure: true,
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 100000
    });

    // Define email options
    const mailOptions = {
        from: options.from || 'Mohannad Abusabha <mohannad.naxol@gmail.com>',
        to: options.email || process.env.EMAIL_USERNAME,
        subject: options.subject,
        text: options.message || undefined,
        html: options.html || undefined,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
