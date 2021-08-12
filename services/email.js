const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
    #sender = sendgrid
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000'
                break
            case 'production':
                this.link = 'link for production'
                break
            default:
                this.link = 'http://localhost:3000'
                break
        }
    }
    #createTemplateVerifyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'default',
            product: {
                name: 'nodejs-rest-api',
                link: this.link
            }
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to nodejs-rest-api!',
                action: {
                    instructions: 'Please click here:',
                    button: {
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                }
            }
        }
        const emailBody = mailGenerator.generate(email)
        return emailBody
    }
    async sendVerifyEmail(verifyToken, email, name) {
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
        const mail = {
            to: email,
            from: 'mr.vovk.anton@gmail.com',
            subject: 'Verify email',
            html: this.#createTemplateVerifyEmail(verifyToken, name)
        }
        this.#sender.send(mail)
    }
}

module.exports = EmailService