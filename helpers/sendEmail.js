import nodemailer from "nodemailer";

const { META_NET_EMAIL, META_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_NET_EMAIL,
    pass: META_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: META_NET_EMAIL };
  return transport.sendMail(email);
};

export default sendEmail;
