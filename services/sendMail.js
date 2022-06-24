import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

export const sendMail = async (data) => {
  const email = { ...data, from: "glasgalas@meta.ua" };

  await sgMail.send(email);
  return true;
};
