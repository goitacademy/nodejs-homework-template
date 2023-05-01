const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Отправляет электронное письмо
 * @param {Object} mailOptions - Объект с настройками отправки электронной почты
 * @param {string} mailOptions.to - Адрес электронной почты получателя
 * @param {string} mailOptions.subject - Тема электронной почты
 * @param {string} mailOptions.html - Тело электронной почты в формате HTML
 */
const sendEmail = async data => {
    const email = { ...data, from: SENDGRID_EMAIL };
    await sgMail.send(email);
    return true;
};

module.exports = sendEmail;
