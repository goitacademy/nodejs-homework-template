const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');

class EmailService {
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://localhost:5001';
                break;
                case 'test':
                    this.link = 'http://localhost:500';
                    break;
                    case 'production':
                        this.link = 'http://heroku';
                        break;
            default:
                this.link = 'http://localhost:5001';
        }
    }

    createEmailTemplate(username,token) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Mailgen',
                link: this.link
            }
        });

        const email = {
            body: {
                name: username,
                intro: 'Welcome! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Mailgen, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${token}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        return mailGenerator.generate(email);;
    }
    

    async sendVerifyEmail (username, email, token) {

        const emailBody = this.createEmailTemplate(username,token);
        const msg = {
            to: email, // Change to your recipient
            from: 'mellsson@protonmail.com', // Change to your verified sender
            subject: 'VerifyEmail',
            html: emailBody,
          }

          try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
              const result = await sgMail.send(msg);
              console.log(result);
              return true;
          } catch (error) {
              console.error(error.message);
              return false;
          }

    }
}

module.exports = EmailService;