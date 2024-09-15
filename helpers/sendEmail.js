const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua", // адреса поштового сервера, до якого потрібно підключитися
  port: 465, // 465 - захищений порт 25 2525 - не захищені. порт поштового сервера, до якого потрібно підключитися
  secure: true, // треба  шифрувати трафік чи ні. Оскільки порт 465, то треба
  auth: {
    user: "goit_ruslana@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);  //  обект, який буде займатись доставкою пошти

const sendEmail = async (data) => {
  const email = { ...data, from: "goit_ruslana@meta.ua" };
  
  transport.sendMail(email)
      .then(() => console.log("Email send success"))
      .catch((error) => console.log(error.message));
    
  return true;
};

module.exports = sendEmail;







// const email = {
//   to: "hisacev844@ubinert.com",
//   from: "goit_ruslana@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport.sendMail(email)
//     .then(() => console.log("Email send success"))
//     .catch(error => console.log(error.message));


// const sendEmail = async (data) => {
//   const email = { ...data, from: "bogdan.lyamzin.d@gmail.com" };
//   await sgMail.send(email);
//   return true;
// };



