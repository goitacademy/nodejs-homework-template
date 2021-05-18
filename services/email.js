const sendgrid = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const Mailgen = require('mailgen')

class EmailService {
    #sender = sendgrid
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://lpcalhost:3000'
                break;
            case 'prodaction':
                this.link = 'kink for prodaction'
                break;
            default:
                this.link = 'http://lpcalhost:3000'
                break;
        }
    }
    #createTemplateVerifyEmail(veryfiToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'default',
            product: {
                name: 'Phone Contacts',
                link: this.link,
            }
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to Phone Contacts! We are very exited to have you o board. ',
                action: {
                    instructions: 'To get started with Phone Contacts, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${veryfiToken}`
                    }
                }
            }
        }
        const emailBody = mailGenerator.generate(email)
        return emailBody
    }
    async sendVerifyEmail(veryfiToken, email,name) {
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: email,
            from: 'datura288@meta.ua',
            subject: 'Verify email',
            html: this.#createTemplateVerifyEmail(veryfiToken, name)
        }
        this.#sender.send(msg)
    }
}

module.exports = EmailService