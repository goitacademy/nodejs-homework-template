//Відправити листа
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY  } = process.env;


//В объект sgMail требо передати цей ключ
sgMail.setApiKey(SENDGRID_API_KEY);

//data - отримує to, subject, html, і функция прикріплюе ще поле from
const sendEmail = async(data) => {
    try {
        const email = {...data, from: "lyutenkomykola42@gmail.com"};
        await sgMail.send(email);// і відправляемо
        return true;
    } catch (error) {
        console.log("Нема ключа");
        throw error;
    }
}

module.exports = sendEmail;

// //Для того щоб лист відправити його треба створити email це просто обэкт
// const email = {
//     to: "mukola@ukr.net",//кому відправляемо листа
//     from: "lyutenkomykola42@gmail.com",//від кого тобто моя адреса
//     subject: "Новий лист", //тема листа
//     html: "<p>Нове пісьмо</p>", //тіло те що бачить людина

// }

// //Щоб відправити листа це повязано с промисами то используем then
// sgMail.send(email)
//         .then(() => console.log("Success send"))
//         .catch(error => console.log(error.message));

// //И весь цей код записують в окрему утилиту наприклад helpers або util в нашому випадку helpers в цій папці ствеорюемо файл sendMail.js

