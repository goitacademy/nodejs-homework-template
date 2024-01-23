const sgMail = require('@sendgrid/mail');
const path = require('path');
const pug = require('pug');
const { convert } = require('html-to-text');



class Email {
	constructor(user, url) {
		this.to = user.email;
		this.name = user.name;
		this.url = url;
		this.from = 'vladislav.shihar@ukr.net';
	}




	async _send(template, subject) {
		sgMail.setApiKey('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');
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
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent')
			})
			.catch((error) => {
				console.error(error)
			})
	}


	async sendHello() {
		await this._send('verification', 'Welcome mail');
	}

	async sendPasswdReset() {
		await this._send('restorePassword', 'Password reset instructions');
	}
}



module.exports = Email;
