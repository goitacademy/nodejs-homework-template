const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;

const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
}
);

const mailOptions = (email, code) => {
    return {
        from: 'sebastianzasadni04@gmail.com',
        to: email,
        subject: `Verification code to xyz.com`,
        text: `Hi user. This is your verification code: ${code}`,
        html: `<p>Hi user. <br> 
        You can verify your email.</p>
        <a href="http://localhost:3000/api/users/verify/${code}">Verification link</a>`
    }
};

const sendEmail = (email, code) => transporter.sendMail(mailOptions(email, code), function (error, info) {
    if (error) {
        return console.log(error);
    } else {
        return console.log('Email sent: ' + info.response);
    }
});

module.exports = sendEmail;

