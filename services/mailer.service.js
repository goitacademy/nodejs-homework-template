const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

const sendMail = async (options) => {
	try {
		await transporter.sendMail(options);
	} catch (error) {
		console.error(error);
		throw new Error("Mail sending failed!");
	}
};

const sendUserVerificationMail = async (email, verificationToken) => {
	const mailOptions = {
		to: email,
		subject: `Welcome to our site ${email}!`,
		text: `Hello! Please verify your account by visiting http://localhost:3000/api/users/verify/${verificationToken}`,
		html: `<h2>Hello!</h2><br/>Please verify your account by clicking <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a>!`,
	};

	await sendMail(mailOptions);
};

module.exports = {
	sendUserVerificationMail,
};
