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

transporter
	.sendMail({
		from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'habababa',
		text: "Hello from nodemailer",
		html: "<h1>Hello!</h1><br/><b>nodemailer</b> here !",
	})
	.then((info) => console.log(info))
	.catch(console.error);
