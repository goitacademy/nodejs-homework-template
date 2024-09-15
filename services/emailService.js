const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: process.env.BREVO_SMTP_HOST,
   port: process.env.BREVO_SMTP_PORT,
   auth: {
    user: process.env.BREVO_API_KEY,
    pass: process.env.BREVO_API_PASS,
   }
});

const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;

    const mailOptions = {
        from: process.env.BREVO_EMAIL,
        to: email,
        subject: "Verify your email adress",
        html: `Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent to", email);
    } catch (err) {
        console.error("Error sending email:", err);
        throw err;
    }
};

module.exports = {
    sendVerificationEmail,
}