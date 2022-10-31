const nodemailer = require("nodemailer");

const config = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,

    auth: {
        user: "hell_x@ukr.net",
        pass: process.env.PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

const sendMail = async (data) => {
    await transporter.sendMail({ ...data, from: "hell_x@ukr.net" });
    return true;
};

module.exports = sendMail;
