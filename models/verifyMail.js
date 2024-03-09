const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
        user: process.env.API_USER,
        pass: process.env.API_PASS,
    },
    });

    const sendMail = (to, token, isMailWasSent) => {
    const from = "mmbwdap@gmail.com";
    const subject = "Test Mail";
    const html = `<form action="http://localhost:3000/api/auth/verify/${token}" method="get">
    <h2>This is my testing form</h2>
    <p>To verify your mail, pleas click the button.</p>
    <button type="submit">Click and verified</button>
    ${isMailWasSent ? "<p> This message has been resent</p>" : "<br />"}
    <p>Enjoy.</p>
    </form>`;

    return transporter.sendMail({ to, from, subject, html });
};

module.exports = { sendMail };
