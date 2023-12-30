// @ts-check
const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
	auth: {
		user: "biomir.vet@gmail.com",
		pass: META_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
	const email = { ...data, from: "biomir.vet@gmail.com" };
	await transport.sendMail(email);
	return true;
};

module.exports = sendEmail;