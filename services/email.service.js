const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationToken = async (email, verificationToken) => {
	const msg = {
		to: email,
		from: 'ramedlawkaibuk@gmail.com',
		subject: 'Email verification',
		html: `<div><h2>Hello User!</h2></div><h3>Let's verify your email adress: ${email}</h3><strong> By clicking on the following link, you are confirming your email address <a href=${`http://localhost:3000/api/users/verify/${verificationToken}`}>confirm email address</a></strong>`,
	};

	await sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch(error => {
			console.error(error);
		});
};

module.exports = { sendVerificationToken };
