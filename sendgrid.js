require('dotenv').config({ path: 'sendgrid.env' }); // Завантажує змінні з файлу sendgrid.env

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'serarfima@gmail.com', // Адреса отримувача
  from: 'serarfima@gmail.com', // Ваша адреса
  subject: 'Тема листа',
  text: 'Текст повідомлення',
  html: '<p>HTML-версія повідомлення</p>',
};

sgMail.send(msg)
  .then(() => {
    console.log('Лист відправлений');
  })
  .catch((error) => {
    console.error(error);
  });

  module.exports = sgMail;