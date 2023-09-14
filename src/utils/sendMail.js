import { createTransport } from "nodemailer";

const sendMail = (email, verificationToken) => {
  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,
    auth: {
      user: "damiantchorzewski0@gmail.com",
      pass: process.env.SMTP_KEY,
    },
  });

  const mailOptions = {
    from: "damiantchorzewski0@gmail.com",
    to: email,
    subject: "E-mail verification Contacts",
    html: `<p style="font-size:20px;">Verify your e-mail address by clicking on this link - <a href="http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}" target="_blank" rel="noopener noreferrer nofollow"><strong>Verification Link</strong></a></p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Error sending e-mail: ${err.message}`);
    } else {
      console.log(`E-mail sent successfully. Response: ${info.response}`);
    }
  });
};

export default sendMail;
