const nodemailer = require('nodemailer');

class SendEmail {
    constructor(user, url) {
        this.to = user.email;
        this.url = url;
        this.from = process.env.EMAIL_FROM;
    }

    _initTransport() {

        return nodemailer.createTransport({
            host: "smtp.ukr.net",
            port: 2525,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
        })
    }

    async _sendEmail() {
        const emailConfig = {
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject: "Veryfi Email", // Subject line
            text: this.url, // plain text body
        }

        await this._initTransport().sendMail(emailConfig)
    }

    async veryfiEmail() {
        await this._sendEmail()
    }
}

module.exports = SendEmail;