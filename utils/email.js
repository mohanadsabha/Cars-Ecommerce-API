const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create Transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    // Define email options
    const mailOptions = {
        from: options.from || 'Mohannad Abusabha <mohannad.naxol@gmail.com>',
        to: options.email || process.env.EMAIL,
        subject: options.subject,
        text: options.message || undefined,
        html: options.html || undefined,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
