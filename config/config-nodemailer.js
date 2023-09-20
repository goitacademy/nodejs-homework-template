import nodemailer from "nodemailer";
import "dotenv/config";

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(config);
export const emailOptions = (email, link) => {
  return {
    from: "chraper94@gmail.com",
    to: email,
    subject: "Verify your email",
    html: `<p>Hello, please click on the link to verify your email: <a href="http://localhost:3000/api${link}">Verify</a></p>`,
  };
};
