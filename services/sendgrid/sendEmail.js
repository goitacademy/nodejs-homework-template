const dotenv = require("dotenv");
dotenv.config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(__dirname);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: {
      email: "ghbgfhfn@gmail.com",
    },
  };

  try {
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
