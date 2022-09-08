const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);
const msg = (email, verificationToken) => {
  return {
    to: `${email}`, // Change to your recipient
    from: "ajzack33@gmail.com", // Change to your verified sender
    subject: "ContactBook by Tom User Verification",
    text: `To verify Your account at ContactBook by Tom just click link below http://localhost:8155/api/users/verify/${verificationToken}`,
    html: `<body style="font-family: sans-serif; text-align: center;">
              <h1 style="color: rgb(126, 164, 245); margin-top: 80px;">&#128214; ContactBook by Tom &#128214;</h1>
              <p style="font-size: 20px; margin-top: 50px;">To verify Your user account at <em style="color: rgb(126, 164, 245);">ContactBook by Tom</em> just click button below</p>
              <a href="http://localhost:8155/api/users/verify/${verificationToken}"><button style="width: 380px; height: 80px; font-size: 20px; border-radius: 30px; background-color: rgb(199, 238, 238); margin-top: 50px; ">VERIFY EMAIL &#9989;</button><a/>
              <p style="font-size: 10px;margin-top: 50px; color: rgb(126, 164, 245);">Or just copy this link to Your browser: http://localhost:8155/api/users/verify/${verificationToken}</p>
        </body>`,
  };
};

const sendMail = (email, verificationToken) => {
  sgMail
    .send(msg(email, verificationToken))
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { sendMail };