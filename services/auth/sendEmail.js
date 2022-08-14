// сервіс з надсилання листа користувачеві


const sgEmail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
    console.log(email, verificationToken);

    const mail = {
        from: 'grekulkristi@gmail.com',  // Змінити на перевіреного відправника
        to: email,  // Змінити на одержувача
        subject: 'Verify email',
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email</a>`,
    }

    await sgEmail
        .send(mail)
        .then(() => console.log('Email send success'))
        .catch((error) => console.log(error.response));
};

module.exports = sendEmail;
