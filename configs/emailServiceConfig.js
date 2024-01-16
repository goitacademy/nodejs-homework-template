exports.emailServiceConfig = {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    EMAIL_FROM: process.env.EMAIL_FROM || 'mail@example.com'
}