const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    await transporter.sendMail({
      from: `"Twoja aplikacja" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Zweryfikuj swój adres e-mail",
      html: `<p>Witaj,</p>
             <p>Aby zweryfikować swój adres e-mail, kliknij poniższy link:</p>
             <a href="${verificationLink}">Zweryfikuj swój adres e-mail</a>
             <p>Jeśli nie rejestrowałeś konta, zignoruj tę wiadomość.</p>`,
    });
    console.log("E-mail weryfikacyjny został wysłany.");
  } catch (error) {
    console.error("Błąd podczas wysyłania e-maila:", error);
  }
};

module.exports = sendVerificationEmail;
