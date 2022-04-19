const mail = require("@sendgrid/mail");
require("dotenv").config();

mail.setApiKey(process.env.SENDGRID_KEY);
const msg = (email, verificationToken) => {
  return {
    to: `${email}`,
    from: "szatkowskipawel1988@gmail.com",
    subject: "Verification",
    text: `To verify Your account click the following link below http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<body style="font-family: sans-serif; text-align: center;">
              <a href="http://localhost:3000/api/users/verify/${verificationToken}"><button style="width: 300px; height: 60px; font-size: 18px; border-radius: 15px; background-color: #d3d3d3; margin-top: 50px; ">VERIFY EMAIL;</button><a/>
              <p style="font-size: 10px;margin-top: 50px; color: rgb(126, 164, 245);">Or copy this link to Your browser: http://localhost:3000/api/users/verify/${verificationToken}</p>
        </body>`,
  };
};

const sendMail = (email, verificationToken) => {
  mail
    .send(msg(email, verificationToken))
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { sendMail };
