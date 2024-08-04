const nodemailer = require("nodemailer");
const mgMail = require("@mailgun/mail");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
        user: "postmaster@sandbox9cab1fdc00254a859bf4b329af9215b1.mailgun.org",
        pass: "dec8cecc1a727f073dc6b092162d0b88-afce6020-884407cb",
    },
});

module.exports = {
    sendVerificationEmail: async (email, verificationToken, req) => {
        try {
            const verificationLink = `${req.protocol}://${req.get(
                "host"
            )}/api/users/verify/${verificationToken}`;

            const html = await ejs.renderFile(
                path.join(__dirname, "../../views/verificationEmail.ejs"),
                { verificationLink }
            );

            const mailOptions = {
                to: email,
                from: process.env.SENDER_EMAIL,
                subject: "Verify Your Email",
                html: html,
            };

            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error("Error sending verification email:", err);
            throw new Error("Error sending verification email");
        }
    },
};