const nodemailer = require('nodemailer');


require('dotenv').config();

const { META_PASSWORD } = process.env;
 

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'solomiia.lutska@meta.ua',
        pass: META_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const emailOptions = {
    from: 'solomiia.lutska@meta.ua',
    to: 'solomia.lutska@gmail.com',
    subject: 'Nodemailer test',
    html: '<p>Привіт. Як справи?</p>',
};


const sendEmail = async (data) => {
    const email = {
        ...data,
        from: 'solomiia.lutska@meta.ua',
    };
    try {
        await transporter.sendMail(email);
        return true;
    } catch (error) {
        console.error('Помилка відправлення листа:', error);
        return false;
    }
}

sendEmail(emailOptions).then((result) => {
    if (result) {
        console.log('The letter was sent successfully');
    } else {
        console.log('Failed to send email');
    }
})
    .catch((error) => {
        console.error('Помилка:', error);
    });


    module.exports = sendEmail;