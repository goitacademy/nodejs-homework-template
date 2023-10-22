import nodemailer from 'nodemailer';

let transporter = null;
export const configureEmailService = (user, pass) => {
	transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: { user, pass },
	});
};

export const sendEmail = async (email, verificationToken) => {
	if (!transporter) {
		throw new Error('Email service not configured');
	}

	const mailOptions = {
		from: 'bearaczek.rc@gmail.pl',
		to: email,
		subject: 'Verification',
		text: `http://localhost:3000/api/users/verify/${verificationToken}`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent:', info.response);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
