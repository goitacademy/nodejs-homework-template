import sendgridMail from '@sendgrid/mail'

class SenderSendGrid {
    async send(msg) {
        sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sendgridMail.send({...msg, from: process.env.MAIL_SENDGRID})
    }
}

export default SenderSendGrid