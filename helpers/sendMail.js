import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text, html }) => {
	const msg = {
		to,
		from,
		subject,
		text,
		html,
	};

	return sgMail.send(msg)
};

export default sendEmail;
