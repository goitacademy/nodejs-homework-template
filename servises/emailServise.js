// const sgMail = require('@sendgrid/mail');
const path = require('path');
const pug = require('pug');
const { convert } = require('html-to-text');
const nodemailer = require('nodemailer');



class Email {
	constructor(user, url) {
		this.to = user.email;
		this.name = user.name;
		this.url = url;
		this.from = process.env.EMAIL_FROM;
	}

	_initTransport() {
		// use MAILGUN in 'prod'
		return nodemailer.createTransport({
			// service: 'Sendgrid',
			host: 'smtp.sendgrid.net',
			port: 465,
			auth: {
				user: 'apikey',
				pass: process.env.SENDGRID_API_KEY,
			},
		});
	}


	async _send(template, subject) {
		// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', `${template}.pug`), {
			name: this.name,
			url: this.url,
			subject,
		});


		const msg = {
			to: this.to, // Change to your recipient
			from: this.from, // Change to your verified sender
			subject,
			text: convert(html),
			html,
		}
		// sgMail
		// 	.send(msg)
		// 	.then(() => {
		// 		console.log('Email sent')
		// 	})
		// 	.catch((error) => {
		// 		console.error(error)
		// 	})
		await this._initTransport().sendMail(msg);
	}


	async sendHello() {
		await this._send('verification', 'Welcome mail');
	}

	async sendPasswdReset() {
		await this._send('restorePassword', 'Password reset instructions');
	}
}



module.exports = Email;
