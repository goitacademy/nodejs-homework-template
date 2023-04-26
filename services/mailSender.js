const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_PASS: pass, MAIL_HOST: host, MAIL_PORT: port, MAIL_USER: user } = process.env;

const mailerConfig = {
	host,
	port,
	secure: true,
	auth: {
		user,
		pass,
	},
	logger: true,
	debug: true,
};

const mailSender = async (data) => {
	const transporter = nodemailer.createTransport(mailerConfig);

	transporter.sendMail(data, (error, info) => {
		if (error) {
			console.log(error.message);
			return process.exit(1);
		}
		console.log("Email sent success", info.response);
		return process.exit(1);
	});
};

module.exports = mailSender;
