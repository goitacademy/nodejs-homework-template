const nodemailer = require('nodemailer');
require('dotenv').config();
const { EMAIL_USER, EMAIL_PASS } = process.env;

async function sendEmail({ to, subject, html }) {
	const email = {
		from: EMAIL_USER,
		to,
		subject,
		html,
		// text: 'Привіт. Ми тестуємо надсилання листів!',
	};

	const transport = nodemailer.createTransport({
		host: 'smtp.meta.ua',
		port: 465,
		secure: true,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS,
		},
	});

	await transport.sendMail(email);
}

module.exports = sendEmail;
